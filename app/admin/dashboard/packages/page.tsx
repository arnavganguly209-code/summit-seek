import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LINKABLE_PACKAGES } from "@/lib/orbit/package-content-by-href";
import { orbitEditorHref } from "@/lib/admin/nav";

export default function AdminPackagesPage() {
  const groups = ["Packages", "Treks", "Tours"] as const;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F58220]">
          Packages & Trips
        </p>
        <h1 className="mt-1 text-2xl font-bold text-white">All Packages</h1>
        <p className="mt-2 max-w-2xl text-[14px] text-white/55">
          Open any trip to edit title, price, images, itinerary, gallery, FAQs, and more —
          same full editor used across the site (Poon Hill style).
        </p>
      </div>

      {groups.map((group) => {
        const items = LINKABLE_PACKAGES.filter((p) => p.group === group);
        return (
          <section key={group} className="space-y-3">
            <h2 className="text-[14px] font-bold uppercase tracking-[0.14em] text-white/45">
              {group}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((pkg) => (
                <Link
                  key={pkg.href}
                  href={orbitEditorHref(pkg.href)}
                  className="group flex items-start justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-[#F58220]/40 hover:bg-white/[0.05]"
                >
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold text-white">{pkg.label}</p>
                    <p className="mt-1 font-mono text-[11px] text-white/40">{pkg.href}</p>
                  </div>
                  <ArrowUpRight className="size-4 shrink-0 text-white/30 group-hover:text-[#F58220]" />
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
