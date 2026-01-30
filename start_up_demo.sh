#!/usr/bin/env bash
set -euo pipefail

APP_NAME="show_animate_demo"
PORT="${SHOW_ANIMATE_PORT:-8058}"
VENV_PATH="/home/ubuntu/sidbao-vfhq-us-east-3/rayy/Comfy_test/ComfyUI/venv"

if ! command -v pm2 >/dev/null 2>&1; then
  echo "pm2 not found. Please install pm2 first: npm i -g pm2"
  exit 1
fi

if [ ! -x "${VENV_PATH}/bin/python" ]; then
  echo "Python not found in venv: ${VENV_PATH}"
  exit 1
fi

pm2 start user/show_animate_demo/server.py \
  --name "$APP_NAME" \
  --interpreter "${VENV_PATH}/bin/python" \
  --env SHOW_ANIMATE_PORT="$PORT"

pm2 save
pm2 status "$APP_NAME"
