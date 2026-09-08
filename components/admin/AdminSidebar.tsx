"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  CalendarCheck2,
  ExternalLink,
  FilePlus2,
  Home,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  MessageSquareText,
  Newspaper,
  Package,
  Phone,
  Settings2,
  Sparkles,
  X,
} from "lucide-react";
import { ADMIN_NAV } from "@/lib/admin/nav";
import { cn } from "@/lib/utils";

const iconFor = (href: string, label: string) => {
  const key = `${href} ${label}`.toLowerCase();
  if (key.includes("enquiry")) return MessageSquareText;
  if (key.includes("booking")) return CalendarCheck2;
  if (key.includes("password") || key.includes("login")) return KeyRound;
  if (key.includes("contact")) return Phone;
  if (key.includes("hero")) return Sparkles;
  if (key.includes("blog")) return Newspaper;
  if (key.includes("media")) return LayoutDashboard;
  if (key.includes("package") && key.includes("new")) return FilePlus2;
  if (key.includes("package")) return Package;
  if (key.includes("setting")) return Settings2;
  if (key.includes("mail") || key.includes("email")) return Mail;
  if (href === "/admin/dashboard") return Home;
  return LayoutDashboard;
};

function NavBody({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex-1 space-y-6 overflow-auto px-3 py-5">
      {ADMIN_NAV.map((section) => (
        <div key={section.id}>
          <p className="mb-2.5 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
            {section.label}
          </p>
          <ul className="space-y-1">
            {section.items.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));
              const Icon = iconFor(item.href, item.label);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      "group flex items-start gap-3 rounded-xl px-3 py-2.5 transition",
                      active
                        ? "bg-gradient-to-r from-[#F58220]/20 to-[#F58220]/05 text-white shadow-[inset_0_0_0_1px_rgba(245,130,32,0.28)]"
                        : "text-white/65 hover:bg-white/[0.05] hover:text-white",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border",
                        active
                          ? "border-[#F58220]/40 bg-[#F58220]/15 text-[#F58220]"
                          : "border-white/10 bg-white/[0.03] text-white/55 group-hover:text-white",
                      )}
                    >
                      <Icon className="size-3.5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[13px] font-semibold leading-snug">
                        {item.label}
                      </span>
                      {item.description ? (
                        <span className="mt-0.5 block text-[11px] leading-snug text-white/40">
                          {item.description}
                        </span>
                      ) : null}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const logout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.replace("/admin");
    router.refresh();
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="relative z-30 flex h-16 items-center justify-between border-b border-white/[0.08] bg-[#050910]/95 px-4 backdrop-blur-xl lg:hidden">
        <Link href="/admin/dashboard" className="flex items-center gap-2.5">
          <Image
            src="/logo-summit-seek-white.png"
            alt="Summit Seek"
            width={160}
            height={48}
            unoptimized
            className="h-9 w-auto object-contain"
          />
        </Link>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => void logout()}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/10 px-2.5 text-[12px] font-semibold text-white/70"
          >
            <LogOut className="size-3.5" />
            Sign out
          </button>
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-white/10 text-white"
          >
            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            aria-label="Close"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-[min(88vw,300px)] flex-col border-r border-white/[0.08] bg-[#050910] shadow-2xl">
            <div className="border-b border-white/[0.08] px-5 py-5">
              <Image
                src="/logo-summit-seek-white.png"
                alt="Summit Seek"
                width={180}
                height={54}
                unoptimized
                className="h-10 w-auto object-contain"
              />
              <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#F58220]">
                Premium Admin
              </p>
            </div>
            <NavBody pathname={pathname} onNavigate={() => setMobileOpen(false)} />
            <div className="border-t border-white/[0.08] p-3">
              <button
                type="button"
                onClick={() => void logout()}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#F58220] px-3 py-2.5 text-[13px] font-bold text-[#08121E]"
              >
                <LogOut className="size-4" />
                Sign out
              </button>
            </div>
          </aside>
        </div>
      ) : null}

      {/* Desktop sidebar */}
      <aside className="relative z-10 hidden w-[300px] shrink-0 flex-col border-r border-white/[0.08] bg-[#050910]/95 backdrop-blur-xl lg:flex">
        <div className="border-b border-white/[0.08] px-5 py-6">
          <Link href="/admin/dashboard" className="block">
            <Image
              src="/logo-summit-seek-white.png"
              alt="Summit Seek"
              width={200}
              height={60}
              unoptimized
              priority
              className="h-11 w-auto max-w-full object-contain object-left"
            />
          </Link>
          <div className="mt-4 flex items-center justify-between gap-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F58220]">
                Control Center
              </p>
              <p className="mt-0.5 text-[13px] font-semibold text-white/80">
                Summit Seek Admin
              </p>
            </div>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex size-9 items-center justify-center rounded-lg border border-white/10 text-white/55 transition hover:bg-white/5 hover:text-white"
              aria-label="Open live site"
            >
              <ExternalLink className="size-3.5" />
            </a>
          </div>
        </div>

        <NavBody pathname={pathname} />

        <div className="mt-auto space-y-2 border-t border-white/[0.08] p-3">
          <Link
            href="/admin/dashboard/settings"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-[13px] font-semibold text-white/70 transition hover:bg-white/5 hover:text-white"
          >
            <Settings2 className="size-4" />
            Settings
          </Link>
          <button
            type="button"
            onClick={() => void logout()}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#F58220] px-3 py-2.5 text-[13px] font-bold text-[#08121E] transition hover:brightness-110"
          >
            <LogOut className="size-4" />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}
