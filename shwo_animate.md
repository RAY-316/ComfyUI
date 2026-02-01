# Wan Animate 2.2 换人展示项目说明

API 工作流位置：
`user/default/workflows/换人_api.json`

本项目已实现一个可展示的前端页面 + Python 后端，覆盖：
1) 快速生成（上传/选择视频 + 选择角色图文件夹 → 一键生成）
2) SAM3 视频分割可视化（方便查看 object_id）
3) 15 角度角色图生成与素材浏览

---

## ✅ 新增展示项目位置
`user/show_animate_demo/`

- `server.py`：后端（aiohttp），负责调用 ComfyUI API
- `static/index.html`：展示页
- `static/styles.css`：UI 样式
- `static/app.js`：前端逻辑

---

## ✅ 启动方式
1. 启动 ComfyUI（默认 8188）：
   ```bash
   python3 main.py
   ```

2. 启动展示项目：
   ```bash
   python3 user/show_animate_demo/server.py
   ```

3. 打开浏览器：
   ```
   http://127.0.0.1:8058
   ```

---

## ✅ 当前功能说明

### ① 15角度角色图生成
- 输入 URL → 调用 `15_pictures/multi_angle_generator.py`
- 生成结果输出到：`15_pictures/output/<folder>`
- 前端自动展示该文件夹下 15 张图片
- 支持自定义文件夹名字（不填则用时间戳）

### ② SAM3 视频分割
- 上传视频 → 选择传播方式：
  - 从第一帧正向传播 (forward)
  - 从中间帧双向传播 (both)
  - 从尾帧反向传播 (backward)
- 推理结束后展示可视化视频（带 object_id）

### ③ 换人推理
- 选视频 + 角色图文件夹 + object_id
- 保留原工作流推理逻辑
- 暴露参数：
  - image_index（默认：`0, 6, 5`）
  - mask_expand
  - block_size
  - seed
  - object_id 必填（其余参数在“高级”里可改）

---

## ✅ 视频规格处理（自动）
- 如果短边 > 640 → 自动 resize 到 640
- 长边等比例缩放
- `VHS_LoadVideo.force_rate` 与 `SaveVideoRGBA.fps` 保持一致

> 注意：该逻辑依赖 `ffprobe`，若系统无 ffprobe 请补充安装

---

## ✅ 后端调用逻辑
- 通过 ComfyUI `/prompt` API 调用 workflow
- 使用 `partial_execution_targets`：
  - SAM3 可视化只执行 node 174
  - 换人推理只执行 node 173
- Workflow 参数更新节点：
  - Node 2: `VHS_LoadVideo`
  - Node 3: `easy sam3VideoSegmentation`
  - Node 179: `ParameterWidget`
  - Node 182: `CharacterConfigWidget`
  - Node 173/174: `SaveVideoRGBA`

---

## ✅ 环境变量（可选）
- `COMFY_URL`：ComfyUI API 地址（默认 `http://127.0.0.1:8188`）
- `SHOW_ANIMATE_PORT`：展示页端口（默认 `8058`）
- `WAVESPEED_API_KEY`：15 角度生图 API key（可覆盖脚本内的默认值）

---

## ✅ 待确认 / 可扩展
如果你希望进一步完善，我可以继续扩展：
1. 支持视频列表记忆（页面刷新不丢）
2. SAM3 分割后自动提取 object_id 列表并展示
3. 支持从前端上传角色图（不依赖 URL）
4. 支持进度显示 / 队列状态

---

如需调整样式、参数范围、或者工作流拆分方式，告诉我具体想法即可。

# 功能调整
1. 能够直接上传本地图片吗？ 这是对应的wavespeed的 doc页面，他好像不支持base64，还是你有别的办法？
https://wavespeed.ai/docs/docs-api/wavespeed-ai/qwen-image-edit-multiple-angles
2. 图片展示的部分默认隐藏起来，加个list可以选择展示哪个文件夹下的内容
3. 进度可以显示一下

## ✅ 已实现的功能调整
1. **本地图片上传**：\n
   - 前端新增“本地图片上传”按钮\n
   - 服务端新增 `/api/image/upload`\n
   - 需要设置 `SHOW_ANIMATE_PUBLIC_URL`，用于生成 WaveSpeed 可访问的公网 URL\n
   - 若未设置，将提示错误\n

2. **图片展示默认隐藏 + 可选择文件夹**：\n
   - 图片展示收起在 `<details>` 中\n
   - 增加下拉列表选择文件夹，并点击“展示”加载\n

3. **进度显示**：\n
   - 前端增加 loading 状态与提示（⏳）\n
   - 请求执行期间显示“推理中/上传中/生成中”\n

4. **SAM3 使用已有视频**：\n
   - 新增 `/api/video/list` 接口读取 `input/` 内的视频（不限 mp4）\n
   - 前端可从下拉列表选择已有视频，无需每次上传\n

5. **页面改为 Tab**：\n
   - 主 Tab：默认只显示“视频 + 角色图 → 生成”，object_id 等参数在高级里\n
   - 次 Tab：查看图片、SAM3 遮罩、以及高级参数\n

6. **快速生成自动跑 SAM3**：\n
   - 快速生成会先跑 SAM3（默认 forward + prompt=person）\n
   - SAM3 可视化结果会同步到「图片 / 遮罩」页\n
   - 主 Tab 增加原始视频预览\n

## ✅ 需要你确认的点
1. `SHOW_ANIMATE_PUBLIC_URL` 暂时不用也可以\n
   - 只有“本地图片上传”需要公网可访问 URL\n

---

## ✅ SAM3 参数改进（新增）

### 问题背景
- `propagate_in_video` 是 SAM3 视频分割的核心过程，逐帧传播检测结果
- 如果 `direction=both`（双向传播），会出现两次进度条
- 之前快速生成页面硬编码 SAM3 参数，无法复用缓存

### 已改进
1. **新增检测阈值参数**：
   - `score_threshold_detection`（检测分数阈值，默认 0.64）：过滤低置信度检测
   - `new_det_thresh`（新检测阈值，默认 0.9）：决定何时添加新对象

2. **两个页面参数双向同步**：
   - 主页面高级参数 → SAM3 检测参数（prompt、direction、两个阈值）
   - 图片/遮罩页面 ↔ 主页面：所有参数双向同步
   - 改一处，另一处自动更新

3. **缓存一致性**：
   - 先在遮罩页面运行 SAM3 → 快速生成可复用缓存
   - 换视频 → 一定重新计算（符合预期）
   - 同一视频、相同参数 → 使用缓存
