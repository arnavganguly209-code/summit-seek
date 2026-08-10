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
  MEDIA_UPLOADS_DIR,
  permanentlyDeleteMedia,
  saveHeroContent,
  saveMediaLibrary,
} from "@/lib/orbit/store";
import type { MediaItem } from "@/types/hero";
import {
  ORBIT_MAX_UPLOAD_BYTES,
  ORBIT_MAX_UPLOAD_MB,
  ORBIT_UPLOAD_CHUNK_BYTES,
} from "@/lib/orbit/upload-limits";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const MAX_BYTES = ORBIT_MAX_UPLOAD_BYTES;
const UPLOADS_DIR = MEDIA_UPLOADS_DIR;

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

const MIME_ALIASES: Record<string, string> = {
  "image/jpg": "image/jpeg",
  "image/pjpeg": "image/jpeg",
  "image/x-png": "image/png",
  "audio/mp4": "video/mp4",
};

const ALLOWED_MIME = new Set(Object.values(EXT_MIME));

function normalizeMime(raw: string, filename = ""): string {
  const lower = (raw || "").trim().toLowerCase();
  if (lower && lower !== "application/octet-stream") {
    const aliased = MIME_ALIASES[lower] || lower;
    if (ALLOWED_MIME.has(aliased)) return aliased;
  }
  const ext = path.extname(filename).toLowerCase();
  return EXT_MIME[ext] || "";
}

function isFileLike(value: FormDataEntryValue | null): boolean {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as Blob).arrayBuffer === "function" &&
    typeof (value as Blob).size === "number"
  );
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

async function finalizeUploadedFile(opts: {
  absSource: string;
  originalName: string;
  mime: string;
  size: number;
  setAsHero: boolean;
}): Promise<MediaItem> {
  const id = randomUUID();
  const ext = extFor(opts.mime, opts.originalName) || ".bin";
  const filename = `${id}${ext}`;
  const abs = path.join(MEDIA_LIBRARY_DIR, filename);

  await fs.rename(opts.absSource, abs).catch(async () => {
    await fs.copyFile(opts.absSource, abs);
    await fs.unlink(opts.absSource).catch(() => undefined);
  });

  // Always ADD to the library. Never delete the previous field image on
  // "replace" — permanent delete is Media Library / explicit DELETE only.

  const item: MediaItem = {
    id,
    name: opts.originalName.replace(/\.[^.]+$/, "") || "Untitled",
    filename,
    url: `/media/library/${filename}`,
    mimeType: opts.mime,
    size: opts.size,
    uploadedAt: new Date().toISOString(),
    status: "ready",
  };

  const library = await getMediaLibrary();
  library.unshift(item);
  await saveMediaLibrary(library);

  if (opts.setAsHero) {
    const hero = await getHeroContent();
    await saveHeroContent({
      ...hero,
      videoUrl: `${item.url.split("?")[0]}?t=${Date.now()}`,
    });
  }

  return item;
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
    await fs.mkdir(UPLOADS_DIR, { recursive: true });

    let form: FormData;
    try {
      form = await req.formData();
    } catch (err) {
      const mapped = mapUploadError(err);
      return NextResponse.json({ ok: false, error: mapped.error }, { status: mapped.status });
    }

    const phase = String(form.get("phase") || "direct").trim();

    // ---- Chunked upload: init ----
    if (phase === "init") {
      const filename = String(form.get("filename") || "upload.bin");
      const mime = String(form.get("mimeType") || "");
      const size = Number(form.get("size") || 0);
      if (!size || size <= 0) {
        return NextResponse.json({ ok: false, error: "Invalid file size." }, { status: 400 });
      }
      if (size > MAX_BYTES) {
        return NextResponse.json(
          {
            ok: false,
            error: `File too large (${(size / 1024 / 1024).toFixed(1)}MB). Maximum is ${ORBIT_MAX_UPLOAD_MB}MB.`,
          },
          { status: 400 },
        );
      }
      const uploadId = randomUUID();
      const dir = path.join(UPLOADS_DIR, uploadId);
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(
        path.join(dir, "meta.json"),
        JSON.stringify({
          filename,
          mime,
          size,
          setAsHero: String(form.get("setAsHero") || "") === "1",
          createdAt: new Date().toISOString(),
        }),
        "utf8",
      );
      return NextResponse.json({
        ok: true,
        uploadId,
        chunkSize: ORBIT_UPLOAD_CHUNK_BYTES,
      });
    }

    // ---- Chunked upload: chunk ----
    if (phase === "chunk") {
      const uploadId = String(form.get("uploadId") || "").trim();
      const index = Number(form.get("index"));
      const chunk = form.get("chunk");
      const chunkOk =
        typeof chunk === "object" &&
        chunk !== null &&
        "arrayBuffer" in chunk &&
        typeof (chunk as Blob).arrayBuffer === "function";
      if (!uploadId || Number.isNaN(index) || !chunkOk) {
        return NextResponse.json({ ok: false, error: "Invalid chunk payload." }, { status: 400 });
      }
      const dir = path.join(UPLOADS_DIR, uploadId);
      try {
        await fs.access(dir);
      } catch {
        return NextResponse.json({ ok: false, error: "Upload session not found." }, { status: 404 });
      }
      const buf = Buffer.from(await (chunk as Blob).arrayBuffer());
      await fs.writeFile(path.join(dir, `part-${String(index).padStart(6, "0")}`), buf);
      return NextResponse.json({ ok: true, index });
    }

    // ---- Chunked upload: complete ----
    if (phase === "complete") {
      const uploadId = String(form.get("uploadId") || "").trim();
      if (!uploadId) {
        return NextResponse.json({ ok: false, error: "Missing uploadId." }, { status: 400 });
      }
      const dir = path.join(UPLOADS_DIR, uploadId);
      const metaRaw = await fs.readFile(path.join(dir, "meta.json"), "utf8").catch(() => null);
      if (!metaRaw) {
        return NextResponse.json({ ok: false, error: "Upload session not found." }, { status: 404 });
      }
      const meta = JSON.parse(metaRaw) as {
        filename: string;
        mime: string;
        size: number;
        setAsHero: boolean;
      };

      const entries = (await fs.readdir(dir))
        .filter((f) => f.startsWith("part-"))
        .sort();
      if (!entries.length) {
        return NextResponse.json({ ok: false, error: "No chunks received." }, { status: 400 });
      }

      const assembled = path.join(dir, "assembled.bin");
      const out = createWriteStream(assembled);
      for (const part of entries) {
        const data = await fs.readFile(path.join(dir, part));
        if (!out.write(data)) {
          await new Promise<void>((resolve) => out.once("drain", resolve));
        }
      }
      await new Promise<void>((resolve, reject) => {
        out.end(() => resolve());
        out.on("error", reject);
      });

      const stat = await fs.stat(assembled);
      const mime = normalizeMime(meta.mime, meta.filename);
      if (!mime || !ALLOWED_MIME.has(mime)) {
        await fs.rm(dir, { recursive: true, force: true }).catch(() => undefined);
        return NextResponse.json(
          {
            ok: false,
            error: `Unsupported image/video format (${meta.mime || path.extname(meta.filename) || "unknown"}). Use png, jpg, webp, gif, mp4, mov, or webm.`,
          },
          { status: 400 },
        );
      }
      const item = await finalizeUploadedFile({
        absSource: assembled,
        originalName: meta.filename,
        mime,
        size: stat.size,
        setAsHero: meta.setAsHero,
      });

      await fs.rm(dir, { recursive: true, force: true }).catch(() => undefined);
      return NextResponse.json({ ok: true, item });
    }

    // ---- Direct (small) upload fallback ----
    const fileEntry = form.get("file");
    if (!isFileLike(fileEntry)) {
      return NextResponse.json(
        { ok: false, error: "No file received. Please choose a file to upload." },
        { status: 400 },
      );
    }
    const file = fileEntry as Blob & { name?: string; type?: string; stream?: () => ReadableStream };

    const originalName =
      typeof file.name === "string" && file.name ? file.name : "upload.bin";
    const mime = normalizeMime(typeof file.type === "string" ? file.type : "", originalName);
    if (!mime || !ALLOWED_MIME.has(mime)) {
      return NextResponse.json(
        {
          ok: false,
          error: `Unsupported format (${file.type || path.extname(originalName) || "unknown"}). Use png, jpg, webp, gif, mp4, mov, or webm.`,
        },
        { status: 400 },
      );
    }

    if (file.size <= 0) {
      return NextResponse.json(
        { ok: false, error: "Empty file. Choose a valid file and retry." },
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

    const setAsHero = String(form.get("setAsHero") || "") === "1";
    const id = randomUUID();
    const tmp = path.join(UPLOADS_DIR, `${id}.tmp`);
    await fs.mkdir(UPLOADS_DIR, { recursive: true });

    try {
      if (typeof file.stream === "function") {
        const webStream = file.stream();
        const nodeStream = Readable.fromWeb(
          webStream as import("stream/web").ReadableStream,
        );
        await pipeline(nodeStream, createWriteStream(tmp));
      } else {
        const buf = Buffer.from(await file.arrayBuffer());
        await fs.writeFile(tmp, buf);
      }
    } catch (err) {
      await fs.unlink(tmp).catch(() => undefined);
      const mapped = mapUploadError(err);
      return NextResponse.json({ ok: false, error: mapped.error }, { status: mapped.status });
    }

    const item = await finalizeUploadedFile({
      absSource: tmp,
      originalName,
      mime,
      size: file.size,
      setAsHero,
    });

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
