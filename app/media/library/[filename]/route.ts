import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { ensureMediaDirs, MEDIA_LIBRARY_DIR } from "@/lib/orbit/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MIME: Record<string, string> = {
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

type Params = { params: Promise<{ filename: string }> };

/** Serve durable Orbit uploads from storage/media/library (survives git deploy). */
export async function GET(_req: Request, { params }: Params) {
  const { filename: raw } = await params;
  const filename = path.basename(raw || "");
  if (!filename || filename !== raw) {
    return NextResponse.json({ error: "Invalid filename." }, { status: 400 });
  }

  await ensureMediaDirs();
  const abs = path.join(MEDIA_LIBRARY_DIR, filename);
  if (!abs.startsWith(MEDIA_LIBRARY_DIR)) {
    return NextResponse.json({ error: "Invalid path." }, { status: 400 });
  }

  try {
    const data = await fs.readFile(abs);
    const ext = path.extname(filename).toLowerCase();
    const type = MIME[ext] || "application/octet-stream";
    return new NextResponse(new Uint8Array(data), {
      status: 200,
      headers: {
        "Content-Type": type,
        "Content-Length": String(data.byteLength),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "File not found." }, { status: 404 });
  }
}
