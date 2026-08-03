import Link from "next/link";

const sections = [
  { href: "/orbit/dashboard/website/home/hero", label: "Hero Section", status: "Live" },
  { href: "/orbit/dashboard/website/packages", label: "Featured Packages", status: "Live" },
  { href: "/orbit/dashboard/website/best-selling", label: "Best Selling", status: "Live" },
  { href: "/orbit/dashboard/website/services", label: "What We Offer", status: "Live" },
  { href: "/orbit/dashboard/website/upcoming-trips", label: "Upcoming Trips", status: "Live" },
  { href: "/orbit/dashboard/website/reviews", label: "Reviews", status: "Live" },
  { href: "/orbit/dashboard/website/articles", label: "Travel Articles", status: "Live" },
  { href: "/orbit/dashboard/website/about", label: "About", status: "Live" },
  { href: "/orbit/dashboard/website/footer", label: "Footer", status: "Ready" },
];

export default function OrbitHomePage() {
  return (
    <div>
      <h1 className="text-[26px] font-bold">Home Page</h1>
      <p className="mt-2 text-[13px] text-white/55">
        Manage homepage sections. Open Hero for full video and content controls.
      </p>
      <div className="mt-6 space-y-2">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:border-[#F58220]/40"
          >
            <span className="text-[14px] font-semibold">{s.label}</span>
            <span className="text-[11px] font-semibold uppercase tracking-wide text-[#F58220]">
              {s.status}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
