"""
Custom Widget Nodes for Workflow
替代 fast customWidget 私有节点

提供两个节点：
1. CharacterConfigWidget - 角色配置面板
2. ParameterWidget - 参数设置面板
"""

import os
import folder_paths


# Get ComfyUI base path and construct default output path
COMFYUI_BASE_PATH = folder_paths.base_path
DEFAULT_OUTPUT_PATH = os.path.join(COMFYUI_BASE_PATH, "15_pictures", "output") + os.sep


class CharacterConfigWidget:
    """
    角色配置面板
    输出: 预览缩放、角色图根路径、角色1-5名称
    """

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "preview_scale": ("FLOAT", {
                    "default": 0.08,
                    "min": 0.01,
                    "max": 1.0,
                    "step": 0.01,
                    "display": "number",
                }),
                "root_path": ("STRING", {
                    "default": DEFAULT_OUTPUT_PATH,
                    "multiline": False,
                }),
                "character_1": ("STRING", {
                    "default": "角色1",
                    "multiline": False,
                }),
                "character_2": ("STRING", {
                    "default": "角色2",
                    "multiline": False,
                }),
                "character_3": ("STRING", {
                    "default": "角色3",
                    "multiline": False,
                }),
                "character_4": ("STRING", {
                    "default": "角色4",
                    "multiline": False,
                }),
                "character_5": ("STRING", {
                    "default": "角色5",
                    "multiline": False,
                }),
            },
        }

    RETURN_TYPES = ("FLOAT", "STRING", "STRING", "STRING", "STRING", "STRING", "STRING")
    RETURN_NAMES = ("预览缩放", "角色图根路径", "角色1名称", "角色2名称", "角色3名称", "角色4名称", "角色5名称")
    FUNCTION = "execute"
    CATEGORY = "utils/widgets"

    def execute(self, preview_scale, root_path, character_1, character_2, character_3, character_4, character_5):
        return (preview_scale, root_path, character_1, character_2, character_3, character_4, character_5)


class ParameterWidget:
    """
    参数设置面板
    输出: 角色图索引、扩展遮罩、块状大小、对象索引ID、随机种
    """

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image_index": ("STRING", {
                    "default": "0",
                    "multiline": False,
                    "tooltip": "角色图索引，支持多个索引用逗号分隔，如: 8, 0, 6",
                }),
                "mask_expand": ("INT", {
                    "default": 30,
                    "min": 0,
                    "max": 2048,
                    "step": 1,
                    "display": "number",
                }),
                "block_size": ("INT", {
                    "default": 24,
                    "min": 1,
                    "max": 2048,
                    "step": 1,
                    "display": "number",
                }),
                "object_id": ("INT", {
                    "default": 0,
                    "min": 0,
                    "max": 100,
                    "step": 1,
                    "display": "number",
                }),
                "seed": ("INT", {
                    "default": 42,
                    "min": 0,
                    "max": 0xffffffffffffffff,
                    "step": 1,
                    "display": "number",
                }),
            },
        }

    RETURN_TYPES = ("STRING", "INT", "INT", "INT", "INT")
    RETURN_NAMES = ("角色图索引", "扩展遮罩", "块状大小", "对象索引ID", "随机种")
    FUNCTION = "execute"
    CATEGORY = "utils/widgets"

    def execute(self, image_index, mask_expand, block_size, object_id, seed):
        return (image_index, mask_expand, block_size, object_id, seed)


# Node registration
NODE_CLASS_MAPPINGS = {
    "CharacterConfigWidget": CharacterConfigWidget,
    "ParameterWidget": ParameterWidget,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "CharacterConfigWidget": "🎭 角色配置面板",
    "ParameterWidget": "⚙️ 参数设置面板",
}
