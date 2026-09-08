"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Mountain } from "lucide-react";
import { ADMIN_NAV } from "@/lib/admin/nav";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.replace("/admin");
    router.refresh();
  };

  return (
    <aside className="relative z-10 hidden w-[280px] shrink-0 border-r border-white/[0.08] bg-[#050910]/92 backdrop-blur-xl lg:flex lg:flex-col">
      <div className="border-b border-white/[0.08] px-5 py-5">
        <div className="inline-flex items-center gap-2 text-[#F58220]">
          <Mountain className="size-5" />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
            Summit Admin
          </span>
        </div>
        <p className="mt-2 text-[15px] font-semibold text-white">Control Center</p>
      </div>

      <nav className="flex-1 space-y-5 overflow-auto px-3 py-4">
        {ADMIN_NAV.map((section) => (
          <div key={section.id}>
            <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">
              {section.label}
            </p>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block rounded-xl px-3 py-2.5 transition",
                        active
                          ? "bg-[#F58220]/15 text-[#F58220]"
                          : "text-white/70 hover:bg-white/5 hover:text-white",
                      )}
                    >
                      <span className="block text-[13px] font-semibold">{item.label}</span>
                      {item.description ? (
                        <span className="mt-0.5 block text-[11px] text-white/40">
                          {item.description}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/[0.08] p-3">
        <button
          type="button"
          onClick={() => void logout()}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-[13px] font-semibold text-white/70 transition hover:bg-white/5 hover:text-white"
        >
          <LogOut className="size-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
