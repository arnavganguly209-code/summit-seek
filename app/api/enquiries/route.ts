import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { isOrbitAuthenticated } from "@/lib/orbit/auth";
import { newEnquiryId } from "@/lib/admin/enquiries";
import { getEnquiries, saveEnquiries } from "@/lib/orbit/store";
import type { EnquiryItem, EnquiryKind, EnquiryStatus } from "@/types/enquiries";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!(await isAdminAuthenticated()) && !(await isOrbitAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const kind = new URL(req.url).searchParams.get("kind");
  const data = await getEnquiries();
  const items =
    kind === "booking" || kind === "enquiry"
      ? data.items.filter((i) => i.kind === kind)
      : data.items;
  return NextResponse.json({
    ok: true,
    items: [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
  });
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<EnquiryItem> & { kind?: EnquiryKind };
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();
    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    const current = await getEnquiries();
    const item: EnquiryItem = {
      id: newEnquiryId(),
      kind: body.kind === "booking" ? "booking" : "enquiry",
      name,
      email,
      phone: String(body.phone || "").trim(),
      subject: String(body.subject || "").trim() || "Website enquiry",
      message,
      packageHref: String(body.packageHref || "").trim(),
      packageTitle: String(body.packageTitle || "").trim(),
      status: "new",
      createdAt: new Date().toISOString(),
    };

    await saveEnquiries({ items: [item, ...current.items].slice(0, 500) });
    return NextResponse.json({ ok: true, item });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to save enquiry." }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  if (!(await isAdminAuthenticated()) && !(await isOrbitAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await req.json()) as { id?: string; status?: EnquiryStatus };
    if (!body.id || !body.status) {
      return NextResponse.json({ ok: false, error: "id and status required." }, { status: 400 });
    }
    const current = await getEnquiries();
    const items = current.items.map((item) =>
      item.id === body.id ? { ...item, status: body.status! } : item,
    );
    await saveEnquiries({ items });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to update enquiry." }, { status: 500 });
  }
}
