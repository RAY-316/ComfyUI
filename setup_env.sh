#!/bin/bash

# 设置错误处理
set -e

# 设置 TORCH_CUDA_ARCH_LIST 环境变量（用于 GH200 ARM64）
BASHRC_FILE="$HOME/.bashrc"
ENV_VAR_LINE='export TORCH_CUDA_ARCH_LIST=9.0'

echo "配置 TORCH_CUDA_ARCH_LIST 环境变量..."
if grep -q "TORCH_CUDA_ARCH_LIST" "$BASHRC_FILE" 2>/dev/null; then
    echo "TORCH_CUDA_ARCH_LIST 已在 .bashrc 中配置"
else
    echo "添加 TORCH_CUDA_ARCH_LIST 到 .bashrc"
    echo "" >> "$BASHRC_FILE"
    echo "# CUDA architecture for GH200" >> "$BASHRC_FILE"
    echo "$ENV_VAR_LINE" >> "$BASHRC_FILE"
fi

source $BASHRC_FILE

source /home/ubuntu/sidbao-vfhq-us-east-3/rayy/Comfy_test/ComfyUI/venv/bin/activate

# install 
pip install nvitop ninja

pip install torch==2.7.1 torchvision==0.22.1 torchaudio==2.7.1 --index-url https://download.pytorch.org/whl/cu128
# 安装 onnxruntime-gpu
pip install /home/ubuntu/sidbao-vfhq-us-east-3/stream_avatar_data/onnxruntime_gpu-1.20.1-cp310-cp310-linux_aarch64.whl

