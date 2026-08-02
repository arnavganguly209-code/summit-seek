import Link from "next/link";
import { PanelsTopLeft, Images, Globe2 } from "lucide-react";

const cards = [
  {
    href: "/orbit/dashboard/website/home/hero",
    title: "Hero Section",
    desc: "Edit video, copy, search, features, and overlay.",
    icon: PanelsTopLeft,
  },
  {
    href: "/orbit/dashboard/media",
    title: "Media Library",
    desc: "Upload, rename, replace, and reuse assets.",
    icon: Images,
  },
  {
    href: "/orbit/dashboard/website/home",
    title: "Home Page",
    desc: "Manage homepage section visibility and order.",
    icon: Globe2,
  },
];

export default function OrbitDashboardPage() {
  return (
    <div>
      <h1 className="text-[28px] font-bold tracking-tight">Dashboard</h1>
      <p className="mt-2 max-w-2xl text-[14px] text-white/60">
        Welcome to Orbit. Control Summit Seek website content from one place.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-[#F58220]/40 hover:bg-white/[0.05]"
          >
            <card.icon className="size-6 text-[#F58220]" />
            <h2 className="mt-4 text-[16px] font-semibold">{card.title}</h2>
            <p className="mt-1 text-[13px] text-white/55">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
