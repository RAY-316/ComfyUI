import folder_paths
import os

if "unet_all" not in folder_paths.folder_names_and_paths:
    orig = folder_paths.folder_names_and_paths.get("diffusion_models", folder_paths.folder_names_and_paths.get("unet", [[], set()]))
    folder_paths.folder_names_and_paths["unet_all"] = (orig[0], {'.ckpt', '.pt', '.bin', '.pth', '.safetensors', '.pkl', '.sft', '.gguf'})
if "clip_all" not in folder_paths.folder_names_and_paths:
    orig = folder_paths.folder_names_and_paths.get("text_encoders", [[], set()])
    folder_paths.folder_names_and_paths["clip_all"] = (orig[0], {'.ckpt', '.pt', '.bin', '.pth', '.safetensors', '.pkl', '.sft', '.gguf'})
if "pulid" not in folder_paths.folder_names_and_paths:
    folder_paths.folder_names_and_paths["pulid"] =  ([os.path.join(folder_paths.models_dir, "pulid")], folder_paths.supported_pt_extensions)
if "audio_encoders" not in folder_paths.folder_names_and_paths:
    folder_paths.folder_names_and_paths["audio_encoders"] =  ([os.path.join(folder_paths.models_dir, "audio_encoders")], folder_paths.supported_pt_extensions)

# 创建自定义预置文件夹
cwd_path = os.path.dirname(os.path.realpath(__file__))
comfy_path = folder_paths.base_path

custom_preset_path = os.path.join(cwd_path, "custom_presets")
if not os.path.exists(custom_preset_path):
    os.mkdir(custom_preset_path)


