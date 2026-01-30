# Multi-Angle Image Generator

使用 WaveSpeed AI API 从一张图片生成 15 个不同角度的视图。

## 安装依赖

```bash
pip install aiohttp Pillow
```

## 配置 API Key

编辑 `multi_angle_generator.py`，在文件顶部找到：

```python
WAVESPEED_API_KEY = "your_api_key_here"
```

替换为你的 WaveSpeed API Key。

图片url 善伟 https://kaito-1328216764.cos.ap-tokyo.myqcloud.com/uploads/image/15032ef6-def4-4b1f-9f37-6322326d9afc/2026-01-29/565f450cc468.jpg

yy_url: https://kaito-1328216764.cos.ap-tokyo.myqcloud.com/uploads/image/15032ef6-def4-4b1f-9f37-6322326d9afc/2026-01-29/7474f6b52443.jpg

杨幂: https://kaito-1328216764.cos.ap-tokyo.myqcloud.com/uploads/image/15032ef6-def4-4b1f-9f37-6322326d9afc/2026-01-14/ef09c682413a.jpg

## 使用方法

```bash
# 基本用法
python multi_angle_generator.py "https://kaito-1328216764.cos.ap-tokyo.myqcloud.com/uploads/image/15032ef6-def4-4b1f-9f37-6322326d9afc/2026-01-14/ef09c682413a.jpg"

# 生成拼图
python multi_angle_generator.py "https://your-image-url.jpg" --grid

# 自定义尺寸
python multi_angle_generator.py "https://your-image-url.jpg" -s "720*1280"

# 固定种子（可复现）
python multi_angle_generator.py "https://your-image-url.jpg" --seed 42
```

## 输出目录

每次运行会在 `output/` 下创建以时间命名的文件夹：

```
15_pictures/
├── multi_angle_generator.py
├── README.md
└── output/
    ├── 20260128_143052/
    │   ├── 01-全身正视图.png
    │   ├── 02-全身左侧面.png
    │   ├── ...
    │   └── grid_all_angles.png
    └── 20260128_151230/
        └── ...
```

## 15 个角度说明

| 编号 | 名称 | 水平角度 | 距离 |
|------|------|----------|------|
| 01 | 全身正视图 | 0° (正面) | 远景 |
| 02 | 全身左侧面 | 270° (左) | 远景 |
| 03 | 全身右侧面 | 90° (右) | 远景 |
| 04 | 全身背面 | 180° (背) | 远景 |
| 05 | 面部特写左侧 | 270° | 特写 |
| 06 | 半身近景 | 0° | 中景 |
| 07 | 面部特写正面 | 0° | 特写 |
| 08 | 面部特写右侧 | 90° | 特写 |
| 09 | 半身左侧45度 | 315° | 中景 |
| 10 | 半身左侧面 | 270° | 中景 |
| 11 | 半身右侧面 | 90° | 中景 |
| 12 | 半身右侧45度 | 45° | 中景 |
| 13 | 左侧过肩背面 | 225° | 中景 |
| 14 | 半身背面 | 180° | 中景 |
| 15 | 右侧过肩背面 | 135° | 中景 |

## 价格

$0.025/张 × 15 = **$0.375/次**
