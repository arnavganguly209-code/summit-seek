import Link from "next/link";
import { ArrowUpRight, PlusCircle } from "lucide-react";
import { LINKABLE_PACKAGES } from "@/lib/orbit/package-content-by-href";
import { adminEditorHref } from "@/lib/admin/nav";

export default function AdminNewPackagePage() {
  const samples = LINKABLE_PACKAGES.slice(0, 12);

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F58220]">
          Packages & Trips
        </p>
        <h1 className="mt-1 text-2xl font-bold text-white">Add New Package</h1>
        <p className="mt-2 text-[14px] leading-relaxed text-white/55">
          Open a similar trip template, update every field (images, itinerary, price,
          gallery), and save — all inside Admin. Live page updates immediately.
        </p>
      </div>

      <div className="rounded-2xl border border-[#F58220]/25 bg-[#F58220]/10 p-5">
        <div className="flex items-start gap-3">
          <PlusCircle className="mt-0.5 size-5 shrink-0 text-[#F58220]" />
          <div>
            <p className="text-[15px] font-bold text-white">Professional workflow</p>
            <ol className="mt-3 list-decimal space-y-2 pl-4 text-[13px] leading-relaxed text-white/70">
              <li>Pick a similar package template below.</li>
              <li>Edit title, price, duration, hero images, and itinerary.</li>
              <li>Upload or replace gallery images from Media Library.</li>
              <li>Save & Publish — the live package page updates immediately.</li>
              <li>
                Add it to Featured, Best Selling, Day Tours, or Upcoming Trips listings.
              </li>
            </ol>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-[14px] font-bold text-white">Start from a template</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {samples.map((pkg) => (
            <Link
              key={pkg.href}
              href={adminEditorHref(pkg.href)}
              className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:border-[#F58220]/40"
            >
              <span className="text-[13px] font-semibold text-white">{pkg.label}</span>
              <ArrowUpRight className="size-4 text-white/30 group-hover:text-[#F58220]" />
            </Link>
          ))}
        </div>
        <Link
          href="/admin/dashboard/packages"
          className="inline-flex text-[13px] font-semibold text-[#F58220] hover:underline"
        >
          Browse all packages →
        </Link>
      </div>
    </div>
  );
}
