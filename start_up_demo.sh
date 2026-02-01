#!/usr/bin/env bash
set -euo pipefail

APP_NAME="show_animate_demo"
PORT="${SHOW_ANIMATE_PORT:-8058}"
VENV_PATH="/home/ubuntu/sidbao-vfhq-us-east-3/rayy/Comfy_test/ComfyUI/venv"
COMFYUI_DIR="/home/ubuntu/sidbao-vfhq-us-east-3/rayy/Comfy_test/ComfyUI"

if ! command -v pm2 >/dev/null 2>&1; then
  echo "pm2 not found. Please install pm2 first: npm i -g pm2"
  exit 1
fi

if [ ! -x "${VENV_PATH}/bin/python" ]; then
  echo "Python not found in venv: ${VENV_PATH}"
  exit 1
fi

# Activate venv
source "$VENV_PATH/bin/activate"

# Change to ComfyUI directory
cd "$COMFYUI_DIR" || { echo "Cannot enter directory $COMFYUI_DIR"; exit 1; }

# Check if already running
if pm2 list | grep -q "$APP_NAME"; then
    echo "$APP_NAME is already running, restarting..."
    pm2 restart "$APP_NAME"
else
    echo "Starting $APP_NAME..."
    export SHOW_ANIMATE_PORT="$PORT"
    pm2 start user/show_animate_demo/server.py \
      --name "$APP_NAME" \
      --interpreter python
fi

pm2 save
pm2 status "$APP_NAME"
