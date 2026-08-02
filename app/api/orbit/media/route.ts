import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { isOrbitAuthenticated } from "@/lib/orbit/auth";
import { getMediaLibrary, saveMediaLibrary } from "@/lib/orbit/store";
import type { MediaItem } from "@/types/hero";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const MAX_BYTES = 500 * 1024 * 1024;
const ALLOWED = new Set([
  "video/mp4",
  "video/quicktime",
  "video/webm",
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
]);

function extFor(mime: string, name: string) {
  const fromName = path.extname(name).toLowerCase();
  if (fromName) return fromName;
  if (mime === "video/mp4") return ".mp4";
  if (mime === "video/webm") return ".webm";
  if (mime === "video/quicktime") return ".mov";
  if (mime === "image/png") return ".png";
  if (mime === "image/jpeg") return ".jpg";
  if (mime === "image/webp") return ".webp";
  return "";
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
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json(
        { ok: false, error: "No file received. Please choose a file to upload." },
        { status: 400 },
      );
    }

    if (!ALLOWED.has(file.type)) {
      return NextResponse.json(
        {
          ok: false,
          error: `Unsupported format (${file.type || "unknown"}). Use mp4, mov, webm, png, jpg, or webp.`,
        },
        { status: 400 },
      );
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        {
          ok: false,
          error: `File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Maximum is 500MB.`,
        },
        { status: 400 },
      );
    }

    const buf = Buffer.from(await file.arrayBuffer());
    const id = randomUUID();
    const ext = extFor(file.type, file.name);
    const filename = `${id}${ext}`;
    const dir = path.join(process.cwd(), "public", "media", "library");
    await fs.mkdir(dir, { recursive: true });

    try {
      await fs.writeFile(path.join(dir, filename), buf);
    } catch (err) {
      const code = (err as NodeJS.ErrnoException).code;
      if (code === "ENOSPC") {
        return NextResponse.json(
          { ok: false, error: "Storage full. Free disk space and try again." },
          { status: 507 },
        );
      }
      return NextResponse.json(
        { ok: false, error: "Network error while writing file. Please retry." },
        { status: 500 },
      );
    }

    const item: MediaItem = {
      id,
      name: file.name.replace(/\.[^.]+$/, "") || "Untitled",
      filename,
      url: `/media/library/${filename}`,
      mimeType: file.type,
      size: file.size,
      uploadedAt: new Date().toISOString(),
      status: "ready",
    };

    const library = await getMediaLibrary();
    library.unshift(item);
    await saveMediaLibrary(library);

    return NextResponse.json({ ok: true, item });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Network error during upload. Check connection and retry." },
      { status: 500 },
    );
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
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ ok: false, error: "Missing media id." }, { status: 400 });
  }
  const library = await getMediaLibrary();
  const item = library.find((i) => i.id === id);
  if (!item) {
    return NextResponse.json({ ok: false, error: "Media item not found." }, { status: 404 });
  }
  try {
    await fs.unlink(path.join(process.cwd(), "public", "media", "library", item.filename));
  } catch {
    // file may already be gone
  }
  await saveMediaLibrary(library.filter((i) => i.id !== id));
  return NextResponse.json({ ok: true });
}
