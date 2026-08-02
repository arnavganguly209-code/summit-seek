import Link from "next/link";
import {
  PanelsTopLeft,
  Images,
  Package,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const cards = [
  {
    href: "/orbit/dashboard/website/home/hero",
    title: "Hero Section",
    desc: "Upload hero video, edit copy, overlay, and feature cards.",
    icon: PanelsTopLeft,
  },
  {
    href: "/orbit/dashboard/website/packages",
    title: "Featured Packages",
    desc: "Manage 4 tabs × 4 packages — images, prices, and details.",
    icon: Package,
  },
  {
    href: "/orbit/dashboard/media",
    title: "Media Library",
    desc: "Upload, rename, replace, and delete images or videos.",
    icon: Images,
  },
];

export default function OrbitDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-transparent p-6 sm:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#F58220]/30 bg-[#F58220]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#F58220]">
          <Sparkles className="size-3.5" />
          Content OS
        </div>
        <h1 className="mt-4 text-[28px] font-bold tracking-tight sm:text-[32px]">
          Dashboard
        </h1>
        <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-white/60">
          Control Summit Seek from one place. Uploads, saves, and media changes publish
          to the live site after deploy sync.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-[#F58220]/40 hover:bg-white/[0.05] hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-[#F58220]/15 text-[#F58220]">
                <card.icon className="size-5" />
              </div>
              <ArrowUpRight className="size-4 text-white/30 transition group-hover:text-[#F58220]" />
            </div>
            <h2 className="mt-5 text-[16px] font-semibold tracking-tight">{card.title}</h2>
            <p className="mt-1.5 text-[13px] leading-relaxed text-white/55">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
