import type { MediaItem } from "@/types/hero";
import {
  ORBIT_MAX_UPLOAD_BYTES,
  ORBIT_MAX_UPLOAD_MB,
  ORBIT_UPLOAD_CHUNK_BYTES,
} from "@/lib/orbit/upload-limits";

type UploadOptions = {
  file: File;
  setAsHero?: boolean;
  replaceUrl?: string;
  onProgress?: (pct: number) => void;
};

type ApiResult = {
  ok?: boolean;
  error?: string;
  item?: MediaItem;
  uploadId?: string;
  chunkSize?: number;
};

async function postForm(form: FormData): Promise<{ status: number; data: ApiResult; raw: string }> {
  const res = await fetch("/api/orbit/media", { method: "POST", body: form });
  const raw = await res.text();
  let data: ApiResult = {};
  try {
    data = JSON.parse(raw) as ApiResult;
  } catch {
    data = {};
  }
  return { status: res.status, data, raw };
}

function httpError(status: number, fallback: string, data: ApiResult): string {
  if (data.error) return data.error;
  if (status === 413) {
    return `Server rejected upload (proxy size limit). Max ${ORBIT_MAX_UPLOAD_MB}MB.`;
  }
  if (status === 401) return "Orbit session expired. Sign in again, then retry upload.";
  if (!status) return "Network error during upload. Check connection and retry.";
  return `${fallback} (HTTP ${status}).`;
}

/** Cache-bust without creating `?t=…?v=1` double-query URLs. */
export function withCacheBust(url: string): string {
  const clean = url.split("?")[0].trim();
  return `${clean}?t=${Date.now()}`;
}

/**
 * Reliable Orbit upload — always chunked (same path as hero video).
 * Avoids nginx/proxy body limits and fragile single-shot multipart parsing.
 */
export async function orbitUploadFile(opts: UploadOptions): Promise<MediaItem> {
  const { file, setAsHero, replaceUrl, onProgress } = opts;

  if (file.size <= 0) {
    throw new Error("Empty file. Choose a valid file and retry.");
  }
  if (file.size > ORBIT_MAX_UPLOAD_BYTES) {
    throw new Error(
      `File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Maximum is ${ORBIT_MAX_UPLOAD_MB}MB.`,
    );
  }

  onProgress?.(2);
  const init = new FormData();
  init.append("phase", "init");
  init.append("filename", file.name || "upload.bin");
  init.append("mimeType", file.type || "application/octet-stream");
  init.append("size", String(file.size));
  if (setAsHero) init.append("setAsHero", "1");
  if (replaceUrl) init.append("replaceUrl", replaceUrl.split("?")[0]);

  const initRes = await postForm(init);
  if (!initRes.data.ok || !initRes.data.uploadId) {
    throw new Error(httpError(initRes.status, "Upload init failed", initRes.data));
  }

  const uploadId = initRes.data.uploadId;
  const chunkSize = initRes.data.chunkSize || ORBIT_UPLOAD_CHUNK_BYTES;
  const totalChunks = Math.ceil(file.size / chunkSize);

  for (let index = 0; index < totalChunks; index++) {
    const start = index * chunkSize;
    const end = Math.min(file.size, start + chunkSize);
    const blob = file.slice(start, end);
    const chunkForm = new FormData();
    chunkForm.append("phase", "chunk");
    chunkForm.append("uploadId", uploadId);
    chunkForm.append("index", String(index));
    chunkForm.append("chunk", blob, `part-${index}`);

    let attempt = 0;
    let ok = false;
    let lastError = "";
    while (attempt < 3 && !ok) {
      attempt += 1;
      const chunkRes = await postForm(chunkForm);
      if (chunkRes.status >= 200 && chunkRes.status < 300 && chunkRes.data.ok) {
        ok = true;
      } else {
        lastError = httpError(
          chunkRes.status,
          `Chunk ${index + 1}/${totalChunks} failed`,
          chunkRes.data,
        );
        await new Promise((r) => setTimeout(r, 400 * attempt));
      }
    }
    if (!ok) throw new Error(lastError || "Chunk upload failed.");

    const pct = Math.max(3, Math.min(92, Math.round(((index + 1) / totalChunks) * 90)));
    onProgress?.(pct);
  }

  const complete = new FormData();
  complete.append("phase", "complete");
  complete.append("uploadId", uploadId);
  onProgress?.(95);
  const done = await postForm(complete);
  if (!done.data.ok || !done.data.item) {
    throw new Error(httpError(done.status, "Finalize failed", done.data));
  }
  onProgress?.(100);
  return done.data.item;
}
