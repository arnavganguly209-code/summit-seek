"use client";

import { useRouter } from "next/navigation";
import { ExternalLink, LogOut } from "lucide-react";

export function AdminTopBar() {
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.replace("/admin");
    router.refresh();
  };

  return (
    <header className="hidden h-16 items-center justify-between border-b border-white/[0.08] bg-black/25 px-5 backdrop-blur-xl sm:px-7 lg:flex">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F58220]">
          Premium Admin
        </p>
        <p className="text-[15px] font-semibold tracking-tight text-white">
          Summit Seek Dashboard
        </p>
      </div>
      <div className="flex items-center gap-2">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-[12px] font-semibold text-white/70 transition hover:bg-white/5 hover:text-white"
        >
          <ExternalLink className="size-3.5" />
          View live site
        </a>
        <button
          type="button"
          onClick={() => void logout()}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#F58220]/35 bg-[#F58220]/10 px-3 py-1.5 text-[12px] font-bold text-[#F58220] transition hover:bg-[#F58220]/18"
        >
          <LogOut className="size-3.5" />
          Sign out
        </button>
      </div>
    </header>
  );
}
