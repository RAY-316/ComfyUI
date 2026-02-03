const state = {
  currentVideo: null,
  videos: [],
  angleFolders: [],
};

const qs = (id) => document.getElementById(id);

async function fetchJSON(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json();
}

function setStatus(el, text, tone = "") {
  el.textContent = text;
  el.dataset.tone = tone;
}

function setLoading(el, loading) {
  el.dataset.loading = loading ? "true" : "false";
}

function renderGallery(container, folder, images) {
  container.innerHTML = "";
  if (!images || images.length === 0) {
    container.innerHTML = "<p>暂无图片</p>";
    return;
  }
  images.forEach((img) => {
    const node = document.createElement("img");
    node.src = `/api/angles/files/${encodeURIComponent(folder)}/${encodeURIComponent(img)}`;
    node.alt = img;
    container.appendChild(node);
  });
}

function renderMedia(container, media) {
  container.innerHTML = "";
  if (!media || media.length === 0) {
    container.innerHTML = "<p>暂无输出</p>";
    return;
  }
  media.forEach((item) => {
    const ext = (item.filename || "").split(".").pop().toLowerCase();
    if (["mp4", "webm", "mov"].includes(ext)) {
      const video = document.createElement("video");
      video.src = item.url;
      video.controls = true;
      container.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.src = item.url;
      img.alt = item.filename;
      container.appendChild(img);
    }
  });
}

async function loadAngleFolders() {
  const data = await fetchJSON("/api/angles/list");
  state.angleFolders = data.folders || [];
  const inferSelect = qs("infer-character");
  inferSelect.innerHTML = "";
  state.angleFolders.forEach((folder) => {
    const option = document.createElement("option");
    option.value = folder.name;
    option.textContent = folder.name;
    inferSelect.appendChild(option);
  });

  const gallerySelect = qs("angle-folder");
  gallerySelect.innerHTML = "";
  state.angleFolders.forEach((folder) => {
    const option = document.createElement("option");
    option.value = folder.name;
    option.textContent = folder.name;
    gallerySelect.appendChild(option);
  });
}

async function handleAngleGenerate() {
  const url = qs("angle-url").value.trim();
  const folder = qs("angle-name").value.trim();
  const status = qs("angle-status");
  if (!url) {
    setStatus(status, "请提供图片 URL", "warn");
    return;
  }
  setStatus(status, "生成中，请稍候…");
  setLoading(status, true);
  try {
    const data = await fetchJSON("/api/angles/generate", {
      method: "POST",
      body: JSON.stringify({ image_url: url, folder_name: folder }),
    });
    setStatus(status, `已生成 ${data.images.length} 张图片 (${data.folder})`);
    setLoading(status, false);
    await loadAngleFolders();
  } catch (err) {
    setLoading(status, false);
    setStatus(status, `生成失败：${err.message}`, "error");
  }
}

async function handleAngleUpload(file) {
  const status = qs("angle-status");
  if (!file) return;
  setStatus(status, "图片上传中…");
  setLoading(status, true);
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/api/image/upload", { method: "POST", body: formData });
  if (!res.ok) {
    const text = await res.text();
    setLoading(status, false);
    throw new Error(text || "上传失败");
  }
  const data = await res.json();
  qs("angle-url").value = data.url;
  setLoading(status, false);
  setStatus(status, "上传完成，已填入图片 URL");
}

async function uploadVideo(file) {
  const status = qs("sam3-status");
  if (!file) return;
  setStatus(status, "视频上传中…");
  setLoading(status, true);
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/api/video/upload", { method: "POST", body: formData });
  if (!res.ok) {
    const text = await res.text();
    setLoading(status, false);
    throw new Error(text || "上传失败");
  }
  const data = await res.json();
  state.currentVideo = data.filename;
  if (!state.videos.includes(data.filename)) {
    state.videos.push(data.filename);
  }
  const select = qs("infer-video");
  select.innerHTML = "";
  state.videos.forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    select.appendChild(option);
  });
  setLoading(status, false);
  setStatus(status, `上传完成：${data.filename}`);
  updateVideoPreview(state.currentVideo);
}

function updateVideoPreview(filename) {
  const preview = qs("quick-video-preview");
  if (!preview || !filename) return;
  preview.src = `/api/media?type=input&filename=${encodeURIComponent(filename)}`;
}

async function loadInputVideos() {
  const data = await fetchJSON("/api/video/list");
  state.videos = data.videos || [];

  const sam3Select = qs("sam3-video-list");
  sam3Select.innerHTML = "";
  state.videos.forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    sam3Select.appendChild(option);
  });

  const inferSelect = qs("infer-video");
  inferSelect.innerHTML = "";
  state.videos.forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    inferSelect.appendChild(option);
  });

  if (!state.currentVideo && state.videos[0]) {
    state.currentVideo = state.videos[0];
  }
  // Sync video selection to both pages
  if (state.currentVideo) {
    sam3Select.value = state.currentVideo;
    inferSelect.value = state.currentVideo;
    updateVideoPreview(state.currentVideo);
  }
}

async function handleSam3Run() {
  const status = qs("sam3-status");
  if (!state.currentVideo) {
    setStatus(status, "请先上传视频", "warn");
    return;
  }
  const direction = qs("sam3-direction").value;
  const prompt = qs("sam3-prompt").value.trim() || "person";
  const scoreThresh = parseFloat(qs("sam3-score-thresh-view").value) || 0.64;
  const newDetThresh = parseFloat(qs("sam3-new-det-thresh-view").value) || 0.9;
  setStatus(status, "SAM3 推理中…");
  setLoading(status, true);
  try {
    const data = await fetchJSON("/api/sam3/run", {
      method: "POST",
      body: JSON.stringify({
        video_filename: state.currentVideo,
        direction,
        prompt,
        score_threshold_detection: scoreThresh,
        new_det_thresh: newDetThresh,
      }),
    });
    setLoading(status, false);
    setStatus(status, "SAM3 可视化完成，可在结果上读取 object_id");
    renderMedia(qs("sam3-media"), data.media);
  } catch (err) {
    setLoading(status, false);
    setStatus(status, `SAM3 推理失败：${err.message}`, "error");
  }
}

function getSam3Params() {
  // Get SAM3 params from detail page (primary source for SAM3 settings)
  // These are also synced to main page, but read from detail page to ensure latest values
  const prompt = qs("sam3-prompt").value.trim() || "person";
  const direction = qs("sam3-direction").value || "forward";
  const scoreThresh = parseFloat(qs("sam3-score-thresh-view").value) || 0.64;
  const newDetThresh = parseFloat(qs("sam3-new-det-thresh-view").value) || 0.9;
  return { prompt, direction, scoreThresh, newDetThresh };
}

async function runSam3ForQuick(videoFilename) {
  const status = qs("sam3-status");
  const sam3Params = getSam3Params();
  setStatus(status, "SAM3 遮罩生成中…");
  setLoading(status, true);
  const data = await fetchJSON("/api/sam3/run", {
    method: "POST",
    body: JSON.stringify({
      video_filename: videoFilename,
      direction: sam3Params.direction,
      prompt: sam3Params.prompt,
      score_threshold_detection: sam3Params.scoreThresh,
      new_det_thresh: sam3Params.newDetThresh,
    }),
  });
  setLoading(status, false);
  setStatus(status, "SAM3 可视化完成，可在遮罩页查看");
  renderMedia(qs("sam3-media"), data.media);
}

async function handleInferRun() {
  const status = qs("infer-status");
  const video = state.currentVideo || qs("infer-video").value;
  const character = qs("infer-character").value;
  if (!video || !character) {
    setStatus(status, "请选择视频和角色图文件夹", "warn");
    return;
  }
  const sam3Params = getSam3Params();
  const payload = {
    video_filename: video,
    character_folder: character,
    object_id: qs("infer-object").value,
    image_index: qs("infer-index").value,
    mask_expand: qs("infer-expand").value,
    block_size: qs("infer-block").value,
    seed: qs("infer-seed").value,
    // SAM3 params for cache consistency
    sam3_prompt: sam3Params.prompt,
    sam3_direction: sam3Params.direction,
    score_threshold_detection: sam3Params.scoreThresh,
    new_det_thresh: sam3Params.newDetThresh,
  };
  setStatus(status, "快速生成：先生成 SAM3 遮罩…");
  setLoading(status, true);
  try {
    await runSam3ForQuick(video);
    setStatus(status, "遮罩完成，开始换人推理…");
    const data = await fetchJSON("/api/infer/run", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    setLoading(status, false);
    setStatus(status, "推理完成");
    renderMedia(qs("infer-media"), data.media);
  } catch (err) {
    setLoading(status, false);
    setStatus(status, `推理失败：${err.message}`, "error");
  }
}

async function init() {
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      const target = btn.dataset.tab === "main" ? "tab-main" : "tab-details";
      qs(target).classList.add("active");
    });
  });

  qs("angle-generate").addEventListener("click", handleAngleGenerate);
  qs("angle-show").addEventListener("click", () => {
    const folder = qs("angle-folder").value;
    const target = state.angleFolders.find((f) => f.name === folder);
    if (target) {
      renderGallery(qs("angle-gallery"), target.name, target.images);
    }
  });
  qs("sam3-run").addEventListener("click", handleSam3Run);
  qs("infer-run").addEventListener("click", handleInferRun);
  qs("angle-file").addEventListener("change", (event) => {
    handleAngleUpload(event.target.files[0]).catch((err) => {
      setStatus(qs("angle-status"), `上传失败：${err.message}`, "error");
    });
  });
  qs("sam3-video").addEventListener("change", (event) => {
    uploadVideo(event.target.files[0]).catch((err) => {
      setStatus(qs("sam3-status"), `上传失败：${err.message}`, "error");
    });
  });
  qs("sam3-video-list").addEventListener("change", (event) => {
    state.currentVideo = event.target.value;
    setStatus(qs("sam3-status"), `已选择视频：${state.currentVideo}`);
    updateVideoPreview(state.currentVideo);
    // Sync to detail page video select
    const inferVideo = qs("infer-video");
    if (inferVideo) inferVideo.value = state.currentVideo;
  });

  // Detail page video select also updates state.currentVideo
  qs("infer-video").addEventListener("change", (event) => {
    state.currentVideo = event.target.value;
    setStatus(qs("sam3-status"), `已选择视频：${state.currentVideo}`);
    updateVideoPreview(state.currentVideo);
    // Sync to main page video select
    const sam3VideoList = qs("sam3-video-list");
    if (sam3VideoList) sam3VideoList.value = state.currentVideo;
  });

  await loadAngleFolders();
  await loadInputVideos();

  // Two-way sync between quick-tab advanced inputs and detail-tab advanced inputs
  const pairs = [
    ["infer-index", "infer-index-view"],
    ["infer-expand", "infer-expand-view"],
    ["infer-block", "infer-block-view"],
    ["infer-seed", "infer-seed-view"],
    ["infer-object", "infer-object-view"],
    // SAM3 params sync between main page and detail page
    ["sam3-prompt-main", "sam3-prompt"],
    ["sam3-direction-main", "sam3-direction"],
    ["sam3-score-thresh", "sam3-score-thresh-view"],
    ["sam3-new-det-thresh", "sam3-new-det-thresh-view"],
  ];

  const syncPair = (fromId, toId) => {
    const src = qs(fromId);
    const dst = qs(toId);
    if (src && dst) dst.value = src.value;
  };

  pairs.forEach(([a, b]) => {
    const elA = qs(a);
    const elB = qs(b);
    if (elA && elB) {
      elA.addEventListener("input", () => syncPair(a, b));
      elB.addEventListener("input", () => syncPair(b, a));
      // Also sync on change event for select elements
      elA.addEventListener("change", () => syncPair(a, b));
      elB.addEventListener("change", () => syncPair(b, a));
      syncPair(a, b);
    }
  });
}

init();
