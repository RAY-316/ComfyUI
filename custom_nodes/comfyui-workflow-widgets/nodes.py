"""
Custom Widget Nodes for Workflow
替代 fast customWidget 私有节点

提供节点：
1. CharacterConfigWidget - 角色配置面板
2. ParameterWidget - 参数设置面板
3. GetLargestMaskIndex - 获取最大遮罩的索引
"""

import os
import torch
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
                "preview_scale": (
                    "FLOAT",
                    {
                        "default": 0.08,
                        "min": 0.01,
                        "max": 1.0,
                        "step": 0.01,
                        "display": "number",
                    },
                ),
                "root_path": (
                    "STRING",
                    {
                        "default": DEFAULT_OUTPUT_PATH,
                        "multiline": False,
                    },
                ),
                "character_1": (
                    "STRING",
                    {
                        "default": "角色1",
                        "multiline": False,
                    },
                ),
                "character_2": (
                    "STRING",
                    {
                        "default": "角色2",
                        "multiline": False,
                    },
                ),
                "character_3": (
                    "STRING",
                    {
                        "default": "角色3",
                        "multiline": False,
                    },
                ),
                "character_4": (
                    "STRING",
                    {
                        "default": "角色4",
                        "multiline": False,
                    },
                ),
                "character_5": (
                    "STRING",
                    {
                        "default": "角色5",
                        "multiline": False,
                    },
                ),
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
                "image_index": (
                    "STRING",
                    {
                        "default": "0",
                        "multiline": False,
                        "tooltip": "角色图索引，支持多个索引用逗号分隔，如: 8, 0, 6",
                    },
                ),
                "mask_expand": (
                    "INT",
                    {
                        "default": 30,
                        "min": 0,
                        "max": 2048,
                        "step": 1,
                        "display": "number",
                    },
                ),
                "block_size": (
                    "INT",
                    {
                        "default": 24,
                        "min": 1,
                        "max": 2048,
                        "step": 1,
                        "display": "number",
                    },
                ),
                "object_id": (
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 100,
                        "step": 1,
                        "display": "number",
                    },
                ),
                "seed": (
                    "INT",
                    {
                        "default": 42,
                        "min": 0,
                        "max": 0xFFFFFFFFFFFFFFFF,
                        "step": 1,
                        "display": "number",
                    },
                ),
            },
        }

    RETURN_TYPES = ("STRING", "INT", "INT", "INT", "INT")
    RETURN_NAMES = ("角色图索引", "扩展遮罩", "块状大小", "对象索引ID", "随机种")
    FUNCTION = "execute"
    CATEGORY = "utils/widgets"

    def execute(self, image_index, mask_expand, block_size, object_id, seed):
        return (image_index, mask_expand, block_size, object_id, seed)


class GetLargestMaskIndex:
    """
    获取面积最大的遮罩索引

    接收一个批次的遮罩（多个对象），计算每个遮罩的像素面积，
    返回面积最大的那个遮罩的索引，以及该遮罩本身供预览。

    用途：当 SAM 检测到多个 person 时，自动选择画面中最大的那个人。
    """

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "masks": ("MASK", {"tooltip": "批次遮罩，格式 [N, H, W]，N为对象数量"}),
            },
            "optional": {
                "frame_index": (
                    "INT",
                    {
                        "default": 0,
                        "min": 0,
                        "max": 10000,
                        "step": 1,
                        "tooltip": "对于视频遮罩，指定要分析的帧索引（通常取第一帧）",
                    },
                ),
                "image": ("IMAGE", {"tooltip": "可选：原始图像，用于生成带遮罩的预览图"}),
            },
        }

    RETURN_TYPES = ("INT", "MASK", "IMAGE", "INT", "STRING")
    RETURN_NAMES = ("largest_index", "largest_mask", "preview", "mask_count", "areas_info")
    FUNCTION = "execute"
    CATEGORY = "utils/mask"

    def execute(self, masks, frame_index=0, image=None):
        import json

        # Handle different mask shapes
        if masks.dim() == 2:
            h, w = masks.shape
            largest_mask = masks.unsqueeze(0)
            preview = self._create_preview(masks.unsqueeze(0), image, 0, 1)
            return (0, largest_mask, preview, 1, json.dumps([{"index": 0, "area": int(masks.sum().item())}]))

        elif masks.dim() == 3:
            num_masks = masks.shape[0]
        elif masks.dim() == 4:
            num_masks = masks.shape[0]
            if frame_index < masks.shape[1]:
                masks = masks[:, frame_index, :, :]
            else:
                masks = masks[:, 0, :, :]
        else:
            h, w = 64, 64
            empty_mask = torch.zeros(1, h, w)
            empty_preview = torch.zeros(1, h, w, 3)
            return (0, empty_mask, empty_preview, 0, "[]")

        if num_masks == 0:
            h, w = masks.shape[-2:] if masks.dim() >= 2 else (64, 64)
            empty_mask = torch.zeros(1, h, w)
            empty_preview = torch.zeros(1, h, w, 3)
            return (0, empty_mask, empty_preview, 0, "[]")

        # Calculate area for each mask
        areas = []
        for i in range(num_masks):
            mask = masks[i]
            mask_normalized = mask / 255.0 if mask.max() > 1.0 else mask
            area = (mask_normalized > 0.5).sum().item()
            areas.append({"index": i, "area": int(area)})

        # Find index of largest mask
        largest_idx = max(range(len(areas)), key=lambda i: areas[i]["area"]) if areas else 0

        # Extract the largest mask
        largest_mask = masks[largest_idx : largest_idx + 1]
        if largest_mask.max() > 1.0:
            largest_mask = largest_mask / 255.0

        # Create preview image
        preview = self._create_preview(masks, image, largest_idx, num_masks)

        # Sort areas by size for info output
        areas_sorted = sorted(areas, key=lambda x: x["area"], reverse=True)
        areas_info = json.dumps(areas_sorted, indent=2)

        return (largest_idx, largest_mask, preview, num_masks, areas_info)

    def _create_preview(self, masks, image, largest_idx, num_masks):
        """Create a preview image: other masks in blue, selected mask in green."""
        h, w = masks.shape[-2:]

        # Create base image
        if image is not None:
            base_img = image[0].clone() if image.dim() == 4 else image.clone()
            if base_img.shape[0] != h or base_img.shape[1] != w:
                base_img = base_img.permute(2, 0, 1).unsqueeze(0)
                base_img = torch.nn.functional.interpolate(base_img, size=(h, w), mode="bilinear", align_corners=False)
                base_img = base_img.squeeze(0).permute(1, 2, 0)
        else:
            base_img = torch.ones(h, w, 3) * 0.3

        preview = base_img.clone()
        blue = torch.tensor([0.2, 0.4, 0.8])
        green = torch.tensor([0.2, 0.9, 0.3])

        # Draw all masks first (semi-transparent blue)
        for i in range(num_masks):
            if i == largest_idx:
                continue
            mask = masks[i] if masks.dim() == 3 else masks
            mask = mask / 255.0 if mask.max() > 1.0 else mask.float()
            mask_bool = (mask > 0.5).float().unsqueeze(-1)
            preview = preview * (1 - 0.3 * mask_bool) + blue.view(1, 1, 3) * 0.3 * mask_bool

        # Draw largest mask (higher opacity green)
        largest_mask = masks[largest_idx] if masks.dim() == 3 else masks
        largest_mask = largest_mask / 255.0 if largest_mask.max() > 1.0 else largest_mask.float()
        mask_bool = (largest_mask > 0.5).float().unsqueeze(-1)
        preview = preview * (1 - 0.5 * mask_bool) + green.view(1, 1, 3) * 0.5 * mask_bool

        # Add white border to largest mask
        if largest_mask.dim() == 2:
            padded = torch.nn.functional.pad(largest_mask.unsqueeze(0).unsqueeze(0), (1, 1, 1, 1), mode="replicate")
            edges = torch.zeros_like(largest_mask)
            for dy, dx in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                shifted = padded[:, :, 1 + dy : h + 1 + dy, 1 + dx : w + 1 + dx].squeeze()
                edges = torch.max(edges, torch.abs(largest_mask - shifted))
            edge_bool = (edges > 0.3).float().unsqueeze(-1)
            white = torch.tensor([1.0, 1.0, 1.0])
            preview = preview * (1 - edge_bool) + white.view(1, 1, 3) * edge_bool

        return torch.clamp(preview, 0, 1).unsqueeze(0)


# Node registration
NODE_CLASS_MAPPINGS = {
    "CharacterConfigWidget": CharacterConfigWidget,
    "ParameterWidget": ParameterWidget,
    "GetLargestMaskIndex": GetLargestMaskIndex,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "CharacterConfigWidget": "🎭 角色配置面板",
    "ParameterWidget": "⚙️ 参数设置面板",
    "GetLargestMaskIndex": "📐 获取最大遮罩索引",
}
