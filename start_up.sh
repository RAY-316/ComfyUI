#!/usr/bin/env bash

# ========================
# ComfyUI 一键启动脚本
# ========================

# 你的虚拟环境路径
VENV_PATH="/home/ubuntu/sidbao-vfhq-us-east-3/rayy/Comfy_test/ComfyUI/venv"

# 工作目录（ComfyUI 主文件夹）
COMFYUI_DIR="/home/ubuntu/sidbao-vfhq-us-east-3/rayy/Comfy_test/ComfyUI"

# 端口
PORT=8055

# 可选：你想加的启动参数（根据需要修改或删除）
# --listen 0.0.0.0          允许外网访问（内网的话可以不加）
# --enable-cors-header '*'  允许跨域（某些前端需要）
# --preview-method auto     自动预览方式
# --cpu                     只用 CPU（调试用）
# --lowvram / --normalvram  显存优化模式
EXTRA_ARGS="--listen 0.0.0.0 --enable-cors-header '*' --preview-method auto"

echo "======================================"
echo "正在启动 ComfyUI..."
echo "虚拟环境: $VENV_PATH"
echo "工作目录: $COMFYUI_DIR"
echo "端口: $PORT"
echo "额外参数: $EXTRA_ARGS"
echo "======================================"

# 激活虚拟环境
source "$VENV_PATH/bin/activate"

# 切换到 ComfyUI 目录（很重要，避免相对路径出问题）
cd "$COMFYUI_DIR" || { echo "无法进入目录 $COMFYUI_DIR"; exit 1; }

# 启动 ComfyUI (使用 PM2)
APP_NAME="ComfyUI"

# 检查 PM2 是否已安装
if ! command -v pm2 &> /dev/null; then
    echo "错误: PM2 未安装，请先安装 PM2"
    echo "安装命令: npm install -g pm2"
    exit 1
fi

# 检查是否已经运行
if pm2 list | grep -q "$APP_NAME"; then
    echo "检测到 $APP_NAME 已在运行，正在重启..."
    pm2 restart "$APP_NAME"
else
    echo "正在启动 $APP_NAME..."
    pm2 start main.py \
        --name "$APP_NAME" \
        --interpreter python \
        -- \
        --port $PORT \
        $EXTRA_ARGS
fi

echo "======================================"
echo "ComfyUI 已通过 PM2 启动"
echo "查看状态: pm2 status"
echo "查看日志: pm2 logs $APP_NAME"
echo "停止服务: pm2 stop $APP_NAME"
echo "重启服务: pm2 restart $APP_NAME"
echo "======================================"