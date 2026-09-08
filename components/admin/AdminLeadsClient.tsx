"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import type { EnquiryItem, EnquiryStatus } from "@/types/enquiries";

type Props = {
  kind: "enquiry" | "booking";
  title: string;
  description: string;
};

export function AdminLeadsClient({ kind, title, description }: Props) {
  const [items, setItems] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/enquiries?kind=${kind}`);
      const data = (await res.json()) as { ok?: boolean; items?: EnquiryItem[]; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error || "Failed to load.");
        setLoading(false);
        return;
      }
      setItems(data.items || []);
    } catch {
      setError("Network error.");
    }
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, [kind]);

  const setStatus = async (id: string, status: EnquiryStatus) => {
    await fetch("/api/enquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F58220]">
          Customer Leads
        </p>
        <h1 className="mt-1 text-2xl font-bold text-white">{title}</h1>
        <p className="mt-2 max-w-2xl text-[14px] text-white/55">{description}</p>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-white/60">
          <Loader2 className="size-4 animate-spin" /> Loading…
        </div>
      ) : null}
      {error ? (
        <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-[13px] text-red-200">
          {error}
        </p>
      ) : null}

      {!loading && items.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-10 text-center text-[14px] text-white/50">
          No {kind === "booking" ? "booking requests" : "enquiries"} yet.
        </div>
      ) : null}

      <div className="space-y-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[15px] font-bold text-white">{item.name}</p>
                <p className="mt-1 text-[13px] text-white/55">
                  {item.email}
                  {item.phone ? ` · ${item.phone}` : ""}
                </p>
                <p className="mt-2 text-[12px] text-white/40">
                  {new Date(item.createdAt).toLocaleString()}
                  {item.packageTitle ? ` · ${item.packageTitle}` : ""}
                  {item.packageHref ? ` (${item.packageHref})` : ""}
                </p>
              </div>
              <select
                value={item.status}
                onChange={(e) => void setStatus(item.id, e.target.value as EnquiryStatus)}
                className="h-9 rounded-lg border border-white/15 bg-black/30 px-2 text-[12px] text-white"
              >
                <option value="new">New</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <p className="mt-3 text-[13px] font-semibold text-[#F58220]">{item.subject}</p>
            <p className="mt-2 whitespace-pre-wrap text-[14px] leading-relaxed text-white/75">
              {item.message}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
