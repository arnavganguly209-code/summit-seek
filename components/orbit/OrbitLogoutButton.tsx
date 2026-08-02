"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function OrbitLogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <button
      type="button"
      disabled={loading}
      className="rounded-lg border border-white/15 px-3 py-1.5 text-[12px] font-semibold text-white/80 transition hover:bg-white/10 disabled:opacity-60"
      onClick={async () => {
        setLoading(true);
        await fetch("/api/orbit/auth", { method: "DELETE" });
        router.replace("/orbit");
        router.refresh();
      }}
    >
      {loading ? "Signing out…" : "Sign out"}
    </button>
  );
}
