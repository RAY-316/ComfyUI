#!/usr/bin/env python3
"""
Multi-Angle Image Generator using WaveSpeed AI API
Based on the 15-angle ComfyUI workflow

API Doc: https://wavespeed.ai/docs/docs-api/wavespeed-ai/qwen-image-edit-multiple-angles
"""

import asyncio
import aiohttp
import argparse
from pathlib import Path
from datetime import datetime
from dataclasses import dataclass

# ============================================================
# API KEY - 在这里填写你的 WaveSpeed API Key
# ============================================================
WAVESPEED_API_KEY = "b550af6611c1d6819bfad69d698ba8040872c760c87067b25a965445ddebdb4d"
# ============================================================


@dataclass
class AngleConfig:
    """Configuration for a single angle view"""
    name: str
    horizontal_angle: int  # 0-359, rounds to: 0, 45, 90, 135, 180, 225, 270, 315
    vertical_angle: int    # -30 to 60, rounds to: -30, 0, 30, 60
    distance: int          # 0=close-up, 1=medium, 2=wide
    prompt: str = ""


# 15 angle configurations based on the original ComfyUI workflow
ANGLE_CONFIGS = [
    # Row 1: Full body poses
    AngleConfig("01-全身正视图", horizontal_angle=0, vertical_angle=0, distance=2,
                prompt="full body front view, white background, consistent lighting"),
    AngleConfig("02-全身左侧面", horizontal_angle=270, vertical_angle=0, distance=2,
                prompt="full body left side view, white background, consistent lighting"),
    AngleConfig("03-全身右侧面", horizontal_angle=90, vertical_angle=0, distance=2,
                prompt="full body right side view, white background, consistent lighting"),
    AngleConfig("04-全身背面", horizontal_angle=180, vertical_angle=0, distance=2,
                prompt="full body back view, white background, consistent lighting"),
    
    # Row 2: Face close-ups and half body
    AngleConfig("05-面部特写左侧", horizontal_angle=270, vertical_angle=0, distance=0,
                prompt="face close-up left side, white background, consistent lighting"),
    AngleConfig("06-半身近景", horizontal_angle=0, vertical_angle=0, distance=1,
                prompt="half body medium shot, white background, consistent lighting"),
    AngleConfig("07-面部特写正面", horizontal_angle=0, vertical_angle=0, distance=0,
                prompt="face close-up front view, white background, consistent lighting"),
    AngleConfig("08-面部特写右侧", horizontal_angle=90, vertical_angle=0, distance=0,
                prompt="face close-up right side, white background, consistent lighting"),
    
    # Row 3: Half body 45-degree and side views
    AngleConfig("09-半身左侧45度", horizontal_angle=315, vertical_angle=0, distance=1,
                prompt="half body front-left quarter view, white background, consistent lighting"),
    AngleConfig("10-半身左侧面", horizontal_angle=270, vertical_angle=0, distance=1,
                prompt="half body left side view, white background, consistent lighting"),
    AngleConfig("11-半身右侧面", horizontal_angle=90, vertical_angle=0, distance=1,
                prompt="half body right side view, white background, consistent lighting"),
    AngleConfig("12-半身右侧45度", horizontal_angle=45, vertical_angle=0, distance=1,
                prompt="half body front-right quarter view, white background, consistent lighting"),
    
    # Row 4: Over-shoulder and back views
    AngleConfig("13-左侧过肩背面", horizontal_angle=225, vertical_angle=0, distance=1,
                prompt="over-shoulder back-left view, white background, consistent lighting"),
    AngleConfig("14-半身背面", horizontal_angle=180, vertical_angle=0, distance=1,
                prompt="half body back view, white background, consistent lighting"),
    AngleConfig("15-右侧过肩背面", horizontal_angle=135, vertical_angle=0, distance=1,
                prompt="over-shoulder back-right view, white background, consistent lighting"),
]

# Script directory for output path
SCRIPT_DIR = Path(__file__).parent
OUTPUT_BASE_DIR = SCRIPT_DIR / "output"


class MultiAngleGenerator:
    """Generate multiple angle views using WaveSpeed AI API (Async)"""
    
    BASE_URL = "https://api.wavespeed.ai/api/v3"
    SUBMIT_ENDPOINT = "/wavespeed-ai/qwen-image/edit-multiple-angles"
    
    def __init__(self, api_key: str):
        if not api_key or api_key == "your_api_key_here":
            raise ValueError("Please set your WAVESPEED_API_KEY in the script!")
        self.api_key = api_key
        self.headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}"
        }
    
    async def submit_task(
        self,
        session: aiohttp.ClientSession,
        image_url: str,
        config: AngleConfig,
        size: str = "720*1280",
        seed: int = -1,
        output_format: str = "png"
    ) -> tuple[AngleConfig, str | None]:
        """Submit a single task asynchronously"""
        
        payload = {
            "images": [image_url],
            "horizontal_angle": config.horizontal_angle,
            "vertical_angle": config.vertical_angle,
            "distance": config.distance,
            "size": size,
            "seed": seed,
            "output_format": output_format,
            "enable_sync_mode": False
        }
        
        if config.prompt:
            payload["prompt"] = config.prompt
        
        try:
            async with session.post(
                f"{self.BASE_URL}{self.SUBMIT_ENDPOINT}",
                json=payload
            ) as response:
                response.raise_for_status()
                result = await response.json()
                task_id = result.get("data", {}).get("id")
                return (config, task_id)
        except Exception as e:
            print(f"  Submit failed for {config.name}: {e}")
            return (config, None)
    
    async def poll_result(
        self,
        session: aiohttp.ClientSession,
        config: AngleConfig,
        task_id: str,
        max_retries: int = 120,
        interval: float = 1.0
    ) -> tuple[AngleConfig, str | None]:
        """Poll for task result asynchronously"""
        
        url = f"{self.BASE_URL}/predictions/{task_id}/result"
        
        for _ in range(max_retries):
            try:
                async with session.get(url) as response:
                    response.raise_for_status()
                    result = await response.json()
                    
                    status = result.get("data", {}).get("status", "")
                    
                    if status == "completed":
                        outputs = result.get("data", {}).get("outputs", [])
                        if outputs:
                            return (config, outputs[0])
                        return (config, None)
                    elif status == "failed":
                        error = result.get("data", {}).get("error", "Unknown error")
                        print(f"  Task failed for {config.name}: {error}")
                        return (config, None)
            except Exception as e:
                print(f"  Poll error for {config.name}: {e}")
            
            await asyncio.sleep(interval)
        
        print(f"  Timeout for {config.name}")
        return (config, None)
    
    async def download_image(
        self,
        session: aiohttp.ClientSession,
        config: AngleConfig,
        url: str,
        output_dir: Path
    ) -> Path | None:
        """Download image asynchronously"""
        
        try:
            async with session.get(url) as response:
                response.raise_for_status()
                data = await response.read()
                
                output_path = output_dir / f"{config.name}.png"
                output_path.write_bytes(data)
                return output_path
        except Exception as e:
            print(f"  Download failed for {config.name}: {e}")
            return None
    
    async def generate_all_angles(
        self,
        image_url: str,
        output_dir: Path,
        size: str = "720*1280",
        seed: int = -1
    ) -> list[Path]:
        """Generate all 15 angle views in parallel"""
        
        output_dir.mkdir(parents=True, exist_ok=True)
        
        print(f"\n{'='*60}")
        print(f"Multi-Angle Generator (Async)")
        print(f"{'='*60}")
        print(f"Image: {image_url[:60]}...")
        print(f"Output: {output_dir}")
        print(f"Size: {size}")
        print(f"Angles: {len(ANGLE_CONFIGS)}")
        print(f"{'='*60}\n")
        
        async with aiohttp.ClientSession(headers=self.headers) as session:
            
            # Step 1: Submit all tasks in parallel
            print("[1/3] Submitting all tasks...")
            submit_tasks = [
                self.submit_task(session, image_url, config, size, seed)
                for config in ANGLE_CONFIGS
            ]
            submit_results = await asyncio.gather(*submit_tasks)
            
            # Filter successful submissions
            pending_tasks = [(config, task_id) for config, task_id in submit_results if task_id]
            print(f"      Submitted: {len(pending_tasks)}/{len(ANGLE_CONFIGS)} tasks\n")
            
            if not pending_tasks:
                print("No tasks submitted successfully!")
                return []
            
            # Step 2: Poll all results in parallel
            print("[2/3] Waiting for results...")
            poll_tasks = [
                self.poll_result(session, config, task_id)
                for config, task_id in pending_tasks
            ]
            poll_results = await asyncio.gather(*poll_tasks)
            
            # Filter successful results
            completed = [(config, url) for config, url in poll_results if url]
            print(f"      Completed: {len(completed)}/{len(pending_tasks)} tasks\n")
            
            if not completed:
                print("No tasks completed successfully!")
                return []
            
            # Step 3: Download all images in parallel
            print("[3/3] Downloading images...")
            download_tasks = [
                self.download_image(session, config, url, output_dir)
                for config, url in completed
            ]
            download_results = await asyncio.gather(*download_tasks)
            
            # Filter successful downloads
            saved_paths = [p for p in download_results if p]
            print(f"      Downloaded: {len(saved_paths)}/{len(completed)} images\n")
        
        print(f"{'='*60}")
        print(f"Done! {len(saved_paths)}/{len(ANGLE_CONFIGS)} images saved")
        print(f"{'='*60}\n")
        
        # Print file list
        for path in sorted(saved_paths, key=lambda p: p.name):
            print(f"  - {path.name}")
        
        return saved_paths


def create_grid_image(image_paths: list[Path], output_path: Path, cols: int = 4):
    """Create a grid image from all generated views (requires PIL)"""
    try:
        from PIL import Image
    except ImportError:
        print("PIL not installed, skipping grid creation. Install with: pip install Pillow")
        return
    
    # Sort by filename to maintain order
    image_paths = sorted(image_paths, key=lambda p: p.name)
    
    if not image_paths:
        print("No images to create grid")
        return
    
    # Load first image to get dimensions
    first_img = Image.open(image_paths[0])
    img_width, img_height = first_img.size
    
    # Calculate grid dimensions
    rows = (len(image_paths) + cols - 1) // cols
    
    # Create grid canvas
    grid_width = cols * img_width
    grid_height = rows * img_height
    grid = Image.new('RGB', (grid_width, grid_height), color='white')
    
    # Paste images
    for i, img_path in enumerate(image_paths):
        img = Image.open(img_path)
        row = i // cols
        col = i % cols
        grid.paste(img, (col * img_width, row * img_height))
    
    grid.save(output_path)
    print(f"\nGrid image saved: {output_path}")


def generate_output_dir() -> Path:
    """Generate output directory with timestamp"""
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_dir = OUTPUT_BASE_DIR / timestamp
    return output_dir


async def async_main(args):
    """Async main function"""
    
    # Handle local file (need to upload first or use URL)
    image_input = args.image
    if not image_input.startswith(("http://", "https://")):
        print("Note: Local file paths need to be uploaded first.")
        print("Please provide a publicly accessible image URL.")
        print("You can upload images at: https://wavespeed.ai")
        return
    
    # Initialize generator
    generator = MultiAngleGenerator(WAVESPEED_API_KEY)
    
    # Generate output directory with timestamp
    output_dir = generate_output_dir()
    
    # Generate all angles (fully parallel)
    results = await generator.generate_all_angles(
        image_url=image_input,
        output_dir=output_dir,
        size=args.size,
        seed=args.seed
    )
    
    # Create grid if requested
    if args.grid and results:
        grid_path = output_dir / "grid_all_angles.png"
        create_grid_image(results, grid_path, cols=4)
    
    return results


def main():
    parser = argparse.ArgumentParser(
        description="Generate multi-angle views using WaveSpeed AI API (Async)"
    )
    parser.add_argument(
        "image",
        help="Input image URL"
    )
    parser.add_argument(
        "-s", "--size",
        default="720*1280",
        help="Output image size (default: 720*1280, portrait)"
    )
    parser.add_argument(
        "--seed",
        type=int,
        default=-1,
        help="Random seed (-1 for random)"
    )
    parser.add_argument(
        "--grid",
        action="store_true",
        help="Create a grid image of all views"
    )
    
    args = parser.parse_args()
    
    # Run async main
    asyncio.run(async_main(args))


if __name__ == "__main__":
    main()
