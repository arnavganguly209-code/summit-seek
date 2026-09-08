import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { getContactContent, saveContactContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const contact = await getContactContent();
  return NextResponse.json({
    ok: true,
    email: contact.email,
    phone: contact.phone,
    phoneDisplay: contact.phoneDisplay,
    whatsapp: contact.whatsapp,
    whatsappDisplay: contact.whatsappDisplay,
  });
}

export async function PUT(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as {
      email?: string;
      phone?: string;
      phoneDisplay?: string;
      whatsapp?: string;
      whatsappDisplay?: string;
    };

    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const phoneDisplay = String(body.phoneDisplay || phone).trim();
    const whatsapp = String(body.whatsapp || phone.replace(/\D/g, "")).trim();
    const whatsappDisplay = String(body.whatsappDisplay || phoneDisplay).trim();

    if (!email || !phone || !phoneDisplay) {
      return NextResponse.json(
        { ok: false, error: "Email and phone are required." },
        { status: 400 },
      );
    }

    const contact = await getContactContent();
    await saveContactContent({
      ...contact,
      email,
      phone,
      phoneDisplay,
      whatsapp: whatsapp.startsWith("+") ? whatsapp : `+${whatsapp.replace(/\D/g, "")}`,
      whatsappDisplay,
    });

    return NextResponse.json({
      ok: true,
      message: "Contact details updated. Header and contact page will use the new values.",
      email,
      phone,
      phoneDisplay,
      whatsapp,
      whatsappDisplay,
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Update failed." }, { status: 500 });
  }
}
