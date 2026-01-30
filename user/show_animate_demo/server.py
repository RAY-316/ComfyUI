#!/usr/bin/env python3
import asyncio
import importlib.util
import json
import os
import re
import time
import uuid
import subprocess
from pathlib import Path
from typing import Any

from aiohttp import web
import aiohttp

BASE_DIR = Path(__file__).resolve().parents[2]
WORKFLOW_PATH = BASE_DIR / "user" / "default" / "workflows" / "换人_api.json"
INPUT_DIR = BASE_DIR / "input"
OUTPUT_DIR = BASE_DIR / "output"
TEMP_DIR = BASE_DIR / "temp"
ANGLE_OUTPUT_DIR = BASE_DIR / "15_pictures" / "output"

COMFY_URL = os.environ.get("COMFY_URL", "http://127.0.0.1:8188")
SERVER_HOST = os.environ.get("SHOW_ANIMATE_HOST", "127.0.0.1")
SERVER_PORT = int(os.environ.get("SHOW_ANIMATE_PORT", "8090"))
PUBLIC_BASE_URL = os.environ.get("SHOW_ANIMATE_PUBLIC_URL")

SAFE_NAME_RE = re.compile(r"[^a-zA-Z0-9._-]+")


def load_multi_angle_module():
    module_path = BASE_DIR / "15_pictures" / "multi_angle_generator.py"
    spec = importlib.util.spec_from_file_location("multi_angle_generator", module_path)
    if spec is None or spec.loader is None:
        raise RuntimeError("Failed to load multi_angle_generator")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


async def read_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def load_prompt(workflow: dict) -> dict:
    # API export already returns prompt dict (node_id -> {class_type, inputs})
    if "nodes" not in workflow:
        return workflow
    return workflow_to_prompt(workflow)


def safe_name(value: str, fallback: str) -> str:
    if not value:
        return fallback
    cleaned = SAFE_NAME_RE.sub("_", value).strip("._-")
    return cleaned or fallback


def workflow_to_prompt(workflow: dict) -> dict:
    links = {}
    for link in workflow.get("links", []):
        link_id, from_node, from_slot, to_node, to_slot, _ = link
        links[link_id] = (from_node, from_slot)

    prompt: dict[str, Any] = {}
    for node in workflow.get("nodes", []):
        node_id = str(node["id"])
        inputs: dict[str, Any] = {}

        widget_values = list(node.get("widgets_values", []) or [])
        widget_iter = iter(widget_values)
        widget_dict = node.get("widgets", {}) if isinstance(node.get("widgets", {}), dict) else {}

        for inp in node.get("inputs", []):
            name = inp["name"]
            link_id = inp.get("link", None)
            if link_id is not None:
                from_node, from_slot = links[link_id]
                inputs[name] = [str(from_node), from_slot]
                # Consume widget value if present to keep iterator alignment
                if "widget" in inp:
                    try:
                        next(widget_iter)
                    except StopIteration:
                        pass
                continue

            if "widget" in inp:
                if name in widget_dict:
                    inputs[name] = widget_dict[name]
                else:
                    try:
                        inputs[name] = next(widget_iter)
                    except StopIteration:
                        pass

        prompt[node_id] = {
            "class_type": node.get("type"),
            "inputs": inputs,
        }

    return prompt


async def queue_prompt(session: aiohttp.ClientSession, prompt: dict, targets: list[int] | None = None) -> str:
    payload: dict[str, Any] = {"prompt": prompt}
    if targets is not None:
        payload["partial_execution_targets"] = [str(t) for t in targets]
    payload["prompt_id"] = str(uuid.uuid4())
    async with session.post(f"{COMFY_URL}/prompt", json=payload) as resp:
        data = await resp.json()
    if "error" in data:
        raise RuntimeError(data["error"])
    return data["prompt_id"]


async def wait_for_history(session: aiohttp.ClientSession, prompt_id: str, timeout: int = 60 * 30) -> dict:
    deadline = time.time() + timeout
    while time.time() < deadline:
        async with session.get(f"{COMFY_URL}/history/{prompt_id}") as resp:
            data = await resp.json()
        item = data.get(prompt_id)
        if item and item.get("outputs"):
            return item
        await asyncio.sleep(1)
    raise TimeoutError("ComfyUI execution timed out")


def parse_outputs(item: dict, node_id: int | str | None = None) -> list[dict]:
    outputs = item.get("outputs", {})
    if node_id is not None:
        outputs = {str(node_id): outputs.get(str(node_id), {})}

    media_items: list[dict] = []
    for _, node_outputs in outputs.items():
        if not isinstance(node_outputs, dict):
            continue
        for media_type, items in node_outputs.items():
            if media_type == "animated" or not isinstance(items, list):
                continue
            for item in items:
                if not isinstance(item, dict):
                    continue
                filename = item.get("filename")
                if not filename:
                    continue
                media_items.append({
                    "filename": filename,
                    "subfolder": item.get("subfolder", ""),
                    "type": item.get("type", "output"),
                    "media_type": media_type,
                })
    return media_items


def resolve_media_path(media_type: str, subfolder: str, filename: str) -> Path:
    if media_type == "output":
        base = OUTPUT_DIR
    elif media_type == "temp":
        base = TEMP_DIR
    elif media_type == "input":
        base = INPUT_DIR
    else:
        base = OUTPUT_DIR

    safe_subfolder = subfolder.strip("/\\")
    path = base / safe_subfolder / filename
    path = path.resolve()
    if not str(path).startswith(str(base.resolve())):
        raise web.HTTPForbidden(text="Invalid path")
    return path


def probe_video(path: Path) -> dict:
    cmd = [
        "ffprobe", "-v", "error",
        "-select_streams", "v:0",
        "-show_entries", "stream=width,height,avg_frame_rate,r_frame_rate,nb_frames,duration",
        "-of", "json",
        str(path),
    ]
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
    except FileNotFoundError:
        return {"error": "ffprobe_not_found"}
    except subprocess.CalledProcessError as exc:
        return {"error": exc.stderr.strip() or "ffprobe_failed"}

    data = json.loads(result.stdout)
    streams = data.get("streams", [])
    if not streams:
        return {"error": "no_video_stream"}

    stream = streams[0]
    width = int(stream.get("width") or 0)
    height = int(stream.get("height") or 0)
    avg_rate = stream.get("avg_frame_rate") or stream.get("r_frame_rate") or "0/1"
    num, den = avg_rate.split("/")
    fps = float(num) / float(den) if float(den) != 0 else 0.0

    nb_frames = stream.get("nb_frames")
    duration = float(stream.get("duration") or 0)
    if nb_frames is not None:
        frame_count = int(nb_frames)
    elif fps and duration:
        frame_count = int(duration * fps)
    else:
        frame_count = 0

    return {
        "width": width,
        "height": height,
        "fps": fps,
        "frame_count": frame_count,
    }


def compute_resize(width: int, height: int, max_short: int = 640) -> tuple[int, int]:
    if width <= 0 or height <= 0:
        return (width, height)
    short = min(width, height)
    if short <= max_short:
        return (width, height)
    scale = max_short / short
    return (int(round(width * scale)), int(round(height * scale)))


async def handle_index(request: web.Request) -> web.Response:
    index_path = Path(__file__).parent / "static" / "index.html"
    return web.FileResponse(index_path)


async def handle_static(request: web.Request) -> web.Response:
    filename = request.match_info["filename"]
    path = Path(__file__).parent / "static" / filename
    if not path.exists():
        raise web.HTTPNotFound()
    return web.FileResponse(path)


async def handle_media(request: web.Request) -> web.Response:
    media_type = request.query.get("type", "output")
    subfolder = request.query.get("subfolder", "")
    filename = request.query.get("filename", "")
    if not filename:
        raise web.HTTPBadRequest(text="Missing filename")
    path = resolve_media_path(media_type, subfolder, filename)
    if not path.exists():
        raise web.HTTPNotFound(text="File not found")
    return web.FileResponse(path)


async def handle_local_image(request: web.Request) -> web.Response:
    filename = request.match_info["filename"]
    path = (INPUT_DIR / filename).resolve()
    if not str(path).startswith(str(INPUT_DIR.resolve())):
        raise web.HTTPForbidden(text="Invalid path")
    if not path.exists():
        raise web.HTTPNotFound(text="File not found")
    return web.FileResponse(path)


async def handle_image_upload(request: web.Request) -> web.Response:
    if not PUBLIC_BASE_URL:
        raise web.HTTPBadRequest(
            text="SHOW_ANIMATE_PUBLIC_URL is required to use local uploads with WaveSpeed."
        )

    reader = await request.multipart()
    field = await reader.next()
    if field is None or field.name != "file":
        raise web.HTTPBadRequest(text="Missing file")

    filename = safe_name(field.filename or "image.png", f"image_{int(time.time())}.png")
    INPUT_DIR.mkdir(parents=True, exist_ok=True)
    save_path = INPUT_DIR / filename

    with save_path.open("wb") as f:
        while True:
            chunk = await field.read_chunk()
            if not chunk:
                break
            f.write(chunk)

    public_url = f"{PUBLIC_BASE_URL.rstrip('/')}/api/local_image/{filename}"
    return web.json_response({"filename": filename, "url": public_url})


async def handle_angles_list(request: web.Request) -> web.Response:
    folders = []
    if ANGLE_OUTPUT_DIR.exists():
        for folder in sorted(ANGLE_OUTPUT_DIR.iterdir(), key=lambda p: p.name, reverse=True):
            if not folder.is_dir():
                continue
            images = sorted([p.name for p in folder.iterdir() if p.suffix.lower() in {".png", ".jpg", ".jpeg", ".webp"}])
            folders.append({"name": folder.name, "images": images})
    return web.json_response({"folders": folders})


async def handle_angle_file(request: web.Request) -> web.Response:
    folder = request.match_info["folder"]
    filename = request.match_info["filename"]
    path = (ANGLE_OUTPUT_DIR / folder / filename).resolve()
    if not str(path).startswith(str(ANGLE_OUTPUT_DIR.resolve())):
        raise web.HTTPForbidden(text="Invalid path")
    if not path.exists():
        raise web.HTTPNotFound(text="File not found")
    return web.FileResponse(path)


async def handle_angles_generate(request: web.Request) -> web.Response:
    data = await request.json()
    image_url = data.get("image_url", "").strip()
    folder_name = data.get("folder_name", "").strip()
    if not image_url:
        raise web.HTTPBadRequest(text="image_url is required")

    fallback = time.strftime("%Y%m%d_%H%M%S")
    folder_name = safe_name(folder_name, fallback)
    output_dir = ANGLE_OUTPUT_DIR / folder_name

    module = load_multi_angle_module()
    generator = module.MultiAngleGenerator(generator_api_key())
    results = await generator.generate_all_angles(image_url=image_url, output_dir=output_dir)

    images = [p.name for p in sorted(results, key=lambda p: p.name)]
    return web.json_response({"folder": folder_name, "images": images})


def generator_api_key() -> str:
    key = os.environ.get("WAVESPEED_API_KEY")
    if key:
        return key
    # fallback to the key inside the script (if set)
    module = load_multi_angle_module()
    return module.WAVESPEED_API_KEY


async def handle_video_upload(request: web.Request) -> web.Response:
    reader = await request.multipart()
    field = await reader.next()
    if field is None or field.name != "file":
        raise web.HTTPBadRequest(text="Missing file")

    filename = safe_name(field.filename or "video.mp4", f"video_{int(time.time())}.mp4")
    INPUT_DIR.mkdir(parents=True, exist_ok=True)
    save_path = INPUT_DIR / filename

    with save_path.open("wb") as f:
        while True:
            chunk = await field.read_chunk()
            if not chunk:
                break
            f.write(chunk)

    info = probe_video(save_path)
    return web.json_response({"filename": filename, "video_info": info})


async def handle_sam3_run(request: web.Request) -> web.Response:
    data = await request.json()
    filename = data.get("video_filename", "")
    direction = data.get("direction", "forward")
    prompt_text = data.get("prompt", "person")

    if not filename:
        raise web.HTTPBadRequest(text="video_filename is required")

    video_path = INPUT_DIR / filename
    if not video_path.exists():
        raise web.HTTPBadRequest(text="video file not found")

    info = probe_video(video_path)
    if info.get("error"):
        return web.json_response({"error": info["error"]}, status=400)

    width, height = compute_resize(info["width"], info["height"], 640)
    fps = info.get("fps", 24) or 24
    frame_count = info.get("frame_count", 0)

    if direction == "both":
        frame_index = max(frame_count // 2, 0)
        propagation = "both"
    elif direction == "backward":
        frame_index = max(frame_count - 1, 0)
        propagation = "backward"
    else:
        frame_index = 0
        propagation = "forward"

    workflow = await read_json(WORKFLOW_PATH)
    prompt = load_prompt(workflow)

    # Node 2: VHS_LoadVideo
    prompt["2"]["inputs"].update({
        "video": filename,
        "force_rate": fps,
        "custom_width": width,
        "custom_height": height,
    })

    # Node 3: easy sam3VideoSegmentation
    prompt["3"]["inputs"].update({
        "prompt": prompt_text,
        "frame_index": frame_index,
        "propagation_direction": propagation,
        "start_frame_index": frame_index,
    })

    # Node 174: SaveVideoRGBA fps
    prompt["174"]["inputs"].update({
        "fps": fps,
    })

    async with aiohttp.ClientSession() as session:
        prompt_id = await queue_prompt(session, prompt, targets=[174])
        history_item = await wait_for_history(session, prompt_id)

    media = parse_outputs(history_item, node_id=174)
    return web.json_response({
        "prompt_id": prompt_id,
        "media": [
            {
                **m,
                "url": f"/api/media?type={m['type']}&subfolder={m['subfolder']}&filename={m['filename']}"
            }
            for m in media
        ],
        "video_info": info,
    })


async def handle_infer_run(request: web.Request) -> web.Response:
    data = await request.json()
    filename = data.get("video_filename", "")
    character_folder = data.get("character_folder", "")
    object_id = int(data.get("object_id", 0))

    image_index = data.get("image_index", "0, 6, 5")
    mask_expand = int(data.get("mask_expand", 40))
    block_size = int(data.get("block_size", 16))
    seed = int(data.get("seed", 28588))

    if not filename:
        raise web.HTTPBadRequest(text="video_filename is required")
    if not character_folder:
        raise web.HTTPBadRequest(text="character_folder is required")

    video_path = INPUT_DIR / filename
    if not video_path.exists():
        raise web.HTTPBadRequest(text="video file not found")

    character_path = ANGLE_OUTPUT_DIR / character_folder
    if not character_path.exists():
        raise web.HTTPBadRequest(text="character folder not found")

    info = probe_video(video_path)
    if info.get("error"):
        return web.json_response({"error": info["error"]}, status=400)

    width, height = compute_resize(info["width"], info["height"], 640)
    fps = info.get("fps", 24) or 24

    workflow = await read_json(WORKFLOW_PATH)
    prompt = load_prompt(workflow)

    prompt["2"]["inputs"].update({
        "video": filename,
        "force_rate": fps,
        "custom_width": width,
        "custom_height": height,
    })

    # CharacterConfigWidget
    prompt["182"]["inputs"].update({
        "root_path": str(ANGLE_OUTPUT_DIR),
        "character_1": character_folder,
    })

    # ParameterWidget
    prompt["179"]["inputs"].update({
        "image_index": image_index,
        "mask_expand": mask_expand,
        "block_size": block_size,
        "object_id": object_id,
        "seed": seed,
    })

    # SaveVideoRGBA (final)
    prompt["173"]["inputs"].update({
        "fps": fps,
    })

    async with aiohttp.ClientSession() as session:
        prompt_id = await queue_prompt(session, prompt, targets=[173])
        history_item = await wait_for_history(session, prompt_id)

    media = parse_outputs(history_item, node_id=173)
    return web.json_response({
        "prompt_id": prompt_id,
        "media": [
            {
                **m,
                "url": f"/api/media?type={m['type']}&subfolder={m['subfolder']}&filename={m['filename']}"
            }
            for m in media
        ],
    })


def create_app() -> web.Application:
    app = web.Application()
    app.router.add_get("/", handle_index)
    app.router.add_get("/static/{filename}", handle_static)
    app.router.add_get("/api/media", handle_media)
    app.router.add_get("/api/local_image/{filename}", handle_local_image)
    app.router.add_post("/api/image/upload", handle_image_upload)
    app.router.add_get("/api/angles/list", handle_angles_list)
    app.router.add_get("/api/angles/files/{folder}/{filename}", handle_angle_file)
    app.router.add_post("/api/angles/generate", handle_angles_generate)
    app.router.add_post("/api/video/upload", handle_video_upload)
    app.router.add_post("/api/sam3/run", handle_sam3_run)
    app.router.add_post("/api/infer/run", handle_infer_run)
    return app


if __name__ == "__main__":
    web.run_app(create_app(), host=SERVER_HOST, port=SERVER_PORT)
