import Link from "next/link";
import { ArrowUpRight, Pencil, PlusCircle } from "lucide-react";
import { LINKABLE_PACKAGES } from "@/lib/orbit/package-content-by-href";
import { adminEditorHref } from "@/lib/admin/nav";

export default function AdminPackagesPage() {
  const groups = ["Packages", "Treks", "Tours"] as const;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F58220]">
            Packages & Trips
          </p>
          <h1 className="mt-1 text-2xl font-bold text-white">All Packages</h1>
          <p className="mt-2 max-w-2xl text-[14px] text-white/55">
            Edit title, price, images, itinerary, gallery, FAQs, and more — full control
            inside Admin (no Orbit redirect).
          </p>
        </div>
        <Link
          href="/admin/dashboard/new-package"
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#F58220] px-4 text-[13px] font-bold text-[#08121E]"
        >
          <PlusCircle className="size-4" />
          Add package
        </Link>
      </div>

      {groups.map((group) => {
        const items = LINKABLE_PACKAGES.filter((p) => p.group === group);
        return (
          <section key={group} className="space-y-3">
            <h2 className="text-[14px] font-bold uppercase tracking-[0.14em] text-white/45">
              {group} · {items.length}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((pkg) => (
                <Link
                  key={pkg.href}
                  href={adminEditorHref(pkg.href)}
                  className="group flex items-start justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-[#F58220]/40 hover:bg-white/[0.05]"
                >
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold text-white">{pkg.label}</p>
                    <p className="mt-1 font-mono text-[11px] text-white/40">{pkg.href}</p>
                  </div>
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-white/40 transition group-hover:border-[#F58220]/40 group-hover:text-[#F58220]">
                    <Pencil className="size-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <p className="text-[13px] font-semibold text-white">Also edit listings</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            { href: "/admin/dashboard/edit/packages", label: "Featured (Home)" },
            { href: "/admin/dashboard/edit/best-selling", label: "Best Selling" },
            { href: "/admin/dashboard/edit/upcoming-trips", label: "Upcoming Trips" },
            { href: "/admin/dashboard/edit/day-tours", label: "Day Tours" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-[12px] font-semibold text-white/70 transition hover:border-[#F58220]/40 hover:text-[#F58220]"
            >
              {item.label}
              <ArrowUpRight className="size-3.5" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
