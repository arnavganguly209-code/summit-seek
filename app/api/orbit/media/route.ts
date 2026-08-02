import { NextResponse } from "next/server";
import { createWriteStream, promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { Readable } from "stream";
import { pipeline } from "stream/promises";
import { isOrbitAuthenticated } from "@/lib/orbit/auth";
import {
  cleanMediaUrl,
  ensureMediaDirs,
  getHeroContent,
  getMediaLibrary,
  MEDIA_LIBRARY_DIR,
  permanentlyDeleteMedia,
  saveHeroContent,
  saveMediaLibrary,
} from "@/lib/orbit/store";
import type { MediaItem } from "@/types/hero";
import { ORBIT_MAX_UPLOAD_BYTES, ORBIT_MAX_UPLOAD_MB } from "@/lib/orbit/upload-limits";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const MAX_BYTES = ORBIT_MAX_UPLOAD_BYTES;

const EXT_MIME: Record<string, string> = {
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

function resolveMime(file: File): string {
  if (file.type && file.type !== "application/octet-stream") return file.type;
  const ext = path.extname(file.name).toLowerCase();
  return EXT_MIME[ext] || "";
}

function extFor(mime: string, name: string) {
  const fromName = path.extname(name).toLowerCase();
  if (fromName && EXT_MIME[fromName]) return fromName;
  if (mime === "video/mp4") return ".mp4";
  if (mime === "video/webm") return ".webm";
  if (mime === "video/quicktime") return ".mov";
  if (mime === "image/png") return ".png";
  if (mime === "image/jpeg") return ".jpg";
  if (mime === "image/webp") return ".webp";
  if (mime === "image/gif") return ".gif";
  return "";
}

function mapUploadError(err: unknown): { status: number; error: string } {
  const message = err instanceof Error ? err.message : String(err);
  const code = (err as NodeJS.ErrnoException)?.code;

  if (code === "ENOSPC") {
    return { status: 507, error: "Storage full. Free disk space and try again." };
  }
  if (code === "EACCES" || code === "EPERM") {
    return { status: 500, error: "Permission denied writing media files on the server." };
  }
  if (/Body exceeded|request entity too large|413|max.*body|body.*limit/i.test(message)) {
    return {
      status: 413,
      error: `File too large for server limit. Maximum upload size is ${ORBIT_MAX_UPLOAD_MB}MB.`,
    };
  }
  if (/Unexpected end of form|Failed to parse body|multipart/i.test(message)) {
    return {
      status: 400,
      error: "Upload was interrupted or incomplete. Please retry the upload.",
    };
  }
  return {
    status: 500,
    error: `Upload failed: ${message || "Unknown server error"}. Please retry.`,
  };
}

export async function GET(req: Request) {
  if (!(await isOrbitAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").toLowerCase();
  const sort = searchParams.get("sort") || "newest";
  let items = await getMediaLibrary();
  if (q) {
    items = items.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.filename.toLowerCase().includes(q) ||
        i.mimeType.toLowerCase().includes(q),
    );
  }
  items = [...items].sort((a, b) => {
    if (sort === "oldest") return a.uploadedAt.localeCompare(b.uploadedAt);
    if (sort === "name") return a.name.localeCompare(b.name);
    if (sort === "size") return b.size - a.size;
    return b.uploadedAt.localeCompare(a.uploadedAt);
  });
  return NextResponse.json({ ok: true, items });
}

export async function POST(req: Request) {
  if (!(await isOrbitAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Permission denied" }, { status: 401 });
  }

  try {
    await ensureMediaDirs();

    let form: FormData;
    try {
      form = await req.formData();
    } catch (err) {
      const mapped = mapUploadError(err);
      return NextResponse.json({ ok: false, error: mapped.error }, { status: mapped.status });
    }

    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json(
        { ok: false, error: "No file received. Please choose a file to upload." },
        { status: 400 },
      );
    }

    const mime = resolveMime(file);
    const allowed = new Set(Object.values(EXT_MIME));
    if (!mime || !allowed.has(mime)) {
      return NextResponse.json(
        {
          ok: false,
          error: `Unsupported format (${file.type || path.extname(file.name) || "unknown"}). Use mp4, mov, webm, png, jpg, or webp.`,
        },
        { status: 400 },
      );
    }

    if (file.size <= 0) {
      return NextResponse.json(
        { ok: false, error: "Empty file. Choose a valid video and retry." },
        { status: 400 },
      );
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        {
          ok: false,
          error: `File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Maximum is ${ORBIT_MAX_UPLOAD_MB}MB.`,
        },
        { status: 400 },
      );
    }

    // Optional: permanently remove previous hero video when replacing
    const replaceUrl = String(form.get("replaceUrl") || "").trim();
    if (replaceUrl) {
      await permanentlyDeleteMedia({ url: replaceUrl });
    }

    const id = randomUUID();
    const ext = extFor(mime, file.name) || ".mp4";
    const filename = `${id}${ext}`;
    const abs = path.join(MEDIA_LIBRARY_DIR, filename);

    try {
      // Stream to disk — avoids loading the full video into memory twice
      const webStream = file.stream();
      const nodeStream = Readable.fromWeb(
        webStream as import("stream/web").ReadableStream,
      );
      await pipeline(nodeStream, createWriteStream(abs));
    } catch (err) {
      try {
        await fs.unlink(abs);
      } catch {
        // ignore cleanup errors
      }
      const mapped = mapUploadError(err);
      return NextResponse.json({ ok: false, error: mapped.error }, { status: mapped.status });
    }

    const item: MediaItem = {
      id,
      name: file.name.replace(/\.[^.]+$/, "") || "Untitled",
      filename,
      url: `/media/library/${filename}`,
      mimeType: mime,
      size: file.size,
      uploadedAt: new Date().toISOString(),
      status: "ready",
    };

    const library = await getMediaLibrary();
    library.unshift(item);
    await saveMediaLibrary(library);

    // If this upload is marked as hero replacement, point hero at it immediately
    const setAsHero = String(form.get("setAsHero") || "") === "1";
    if (setAsHero) {
      const hero = await getHeroContent();
      await saveHeroContent({
        ...hero,
        videoUrl: `${item.url}?t=${Date.now()}`,
      });
    }

    return NextResponse.json({ ok: true, item });
  } catch (err) {
    const mapped = mapUploadError(err);
    return NextResponse.json({ ok: false, error: mapped.error }, { status: mapped.status });
  }
}

export async function PATCH(req: Request) {
  if (!(await isOrbitAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json()) as { id?: string; name?: string };
  if (!body.id || !body.name?.trim()) {
    return NextResponse.json({ ok: false, error: "id and name are required." }, { status: 400 });
  }
  const library = await getMediaLibrary();
  const idx = library.findIndex((i) => i.id === body.id);
  if (idx < 0) {
    return NextResponse.json({ ok: false, error: "Media item not found." }, { status: 404 });
  }
  library[idx] = { ...library[idx], name: body.name.trim() };
  await saveMediaLibrary(library);
  return NextResponse.json({ ok: true, item: library[idx] });
}

export async function DELETE(req: Request) {
  if (!(await isOrbitAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") || undefined;
  const url = searchParams.get("url") || undefined;
  if (!id && !url) {
    return NextResponse.json(
      { ok: false, error: "Missing media id or url." },
      { status: 400 },
    );
  }

  if (url && cleanMediaUrl(url) === "/media/hero/hero.mp4") {
    return NextResponse.json(
      { ok: false, error: "Default hero video cannot be permanently deleted." },
      { status: 400 },
    );
  }

  const result = await permanentlyDeleteMedia({ id, url: url || undefined });
  return NextResponse.json({
    ok: true,
    removed: result.removed,
    clearedHero: result.clearedHero,
  });
}
