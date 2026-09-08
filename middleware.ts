import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Keep in sync with lib/admin/auth.ts — do not import that file (Prisma breaks Edge). */
const ADMIN_SESSION_COOKIE = "summit_admin_session";
const ADMIN_SESSION_VALUE = "summit_admin_v1";

function mapOrbitPathToAdmin(pathname: string): string | null {
  if (pathname === "/orbit" || pathname === "/orbit/") {
    return "/admin/dashboard";
  }
  if (pathname === "/orbit/dashboard" || pathname === "/orbit/dashboard/") {
    return "/admin/dashboard";
  }
  if (pathname === "/orbit/dashboard/media" || pathname.startsWith("/orbit/dashboard/media/")) {
    return "/admin/dashboard/edit/media";
  }
  if (
    pathname === "/orbit/dashboard/settings" ||
    pathname.startsWith("/orbit/dashboard/settings/")
  ) {
    return "/admin/dashboard/settings";
  }
  if (pathname.startsWith("/orbit/dashboard/website/")) {
    const rest = pathname
      .slice("/orbit/dashboard/website/".length)
      .replace(/\/+$/, "");
    if (!rest) return "/admin/dashboard";
    return `/admin/dashboard/edit/${rest}`;
  }
  if (pathname.startsWith("/orbit/dashboard/")) {
    return "/admin/dashboard";
  }
  return null;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/orbit")) {
    return NextResponse.next();
  }

  const adminOk =
    req.cookies.get(ADMIN_SESSION_COOKIE)?.value === ADMIN_SESSION_VALUE;
  if (!adminOk) {
    return NextResponse.next();
  }

  const target = mapOrbitPathToAdmin(pathname);
  if (!target) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = target;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/orbit", "/orbit/:path*"],
};
