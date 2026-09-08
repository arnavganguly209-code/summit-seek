import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  CalendarCheck2,
  Images,
  KeyRound,
  MessageSquareText,
  Mountain,
  PanelsTopLeft,
  PhoneCall,
  PlusCircle,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  getBookings,
  getEnquiries,
} from "@/lib/orbit/store";
import { LINKABLE_PACKAGES } from "@/lib/orbit/package-content-by-href";

const cards = [
  {
    href: "/admin/dashboard/bookings",
    title: "Booking Requests",
    desc: "Review Book This Trip submissions instantly.",
    icon: CalendarCheck2,
  },
  {
    href: "/admin/dashboard/enquiries",
    title: "Enquiries",
    desc: "Customer messages from the contact form.",
    icon: MessageSquareText,
  },
  {
    href: "/admin/dashboard/packages",
    title: "All Packages & Trips",
    desc: "Full edit for itinerary, images, prices, and content.",
    icon: Mountain,
  },
  {
    href: "/admin/dashboard/new-package",
    title: "Add New Package",
    desc: "Duplicate a template trip and publish updates.",
    icon: PlusCircle,
  },
  {
    href: "/admin/dashboard/edit/home/hero",
    title: "Hero Section",
    desc: "Homepage video, headline, and search copy.",
    icon: PanelsTopLeft,
  },
  {
    href: "/admin/dashboard/edit/contact",
    title: "Contact Page",
    desc: "Phone, email, address, and form labels.",
    icon: PhoneCall,
  },
  {
    href: "/admin/dashboard/edit/blog",
    title: "Blog Posts",
    desc: "Write, edit, and publish travel stories.",
    icon: BookOpen,
  },
  {
    href: "/admin/dashboard/edit/media",
    title: "Media Library",
    desc: "Upload, rename, or delete images and videos.",
    icon: Images,
  },
  {
    href: "/admin/dashboard/settings",
    title: "Settings",
    desc: "Login, passwords, phone number, and email.",
    icon: KeyRound,
  },
];

export default async function AdminDashboardHomePage() {
  const [enquiries, bookings] = await Promise.all([
    getEnquiries(),
    getBookings(),
  ]);

  const enquiryItems = enquiries.items.filter((i) => i.kind === "enquiry");
  const newEnquiries = enquiryItems.filter((i) => i.status === "new").length;
  const newBookings = bookings.items.filter((i) => i.status === "new").length;
  const totalBookings = bookings.items.length;
  const totalEnquiries = enquiryItems.length;
  const packageCount = LINKABLE_PACKAGES.length;
  const recentBookings = [...bookings.items]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5);
  const recentEnquiries = [...enquiryItems]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5);

  const stats = [
    {
      label: "New bookings",
      value: newBookings,
      hint: `${totalBookings} total`,
      icon: CalendarCheck2,
      href: "/admin/dashboard/bookings",
    },
    {
      label: "New enquiries",
      value: newEnquiries,
      hint: `${totalEnquiries} total`,
      icon: MessageSquareText,
      href: "/admin/dashboard/enquiries",
    },
    {
      label: "Live packages",
      value: packageCount,
      hint: "Treks · tours · packages",
      icon: Mountain,
      href: "/admin/dashboard/packages",
    },
    {
      label: "Lead activity",
      value: newBookings + newEnquiries,
      hint: "Needs attention",
      icon: TrendingUp,
      href: "/admin/dashboard/bookings",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-[#F58220]/15 via-white/[0.04] to-transparent p-6 sm:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#F58220]/35 bg-[#F58220]/12 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#F58220]">
          <Sparkles className="size-3.5" />
          Summit Seek Control
        </div>
        <h1 className="mt-4 text-[28px] font-bold tracking-tight sm:text-[34px]">
          Dashboard
        </h1>
        <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-white/60">
          Manage bookings, enquiries, packages, images, and site content from one
          premium admin — without leaving this dashboard.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-[#F58220]/40 hover:bg-white/[0.05]"
          >
            <div className="flex items-center justify-between">
              <span className="flex size-10 items-center justify-center rounded-xl bg-[#F58220]/15 text-[#F58220]">
                <stat.icon className="size-5" />
              </span>
              <Users className="size-4 text-white/20 opacity-0 transition group-hover:opacity-100" />
            </div>
            <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.14em] text-white/40">
              {stat.label}
            </p>
            <p className="mt-1 text-[28px] font-extrabold tracking-tight text-white">
              {stat.value}
            </p>
            <p className="mt-1 text-[12px] text-white/45">{stat.hint}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-[15px] font-bold text-white">Recent bookings</h2>
            <Link
              href="/admin/dashboard/bookings"
              className="text-[12px] font-semibold text-[#F58220] hover:underline"
            >
              View all
            </Link>
          </div>
          {recentBookings.length === 0 ? (
            <p className="mt-6 text-[13px] text-white/45">No bookings yet.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {recentBookings.map((b) => (
                <li
                  key={b.id}
                  className="rounded-xl border border-white/8 bg-black/20 px-3.5 py-3"
                >
                  <p className="truncate text-[13px] font-semibold text-white">
                    {b.packageTitle}
                  </p>
                  <p className="mt-1 text-[12px] text-white/50">
                    {b.name} · {b.travelers} pax · {b.status}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-[15px] font-bold text-white">Recent enquiries</h2>
            <Link
              href="/admin/dashboard/enquiries"
              className="text-[12px] font-semibold text-[#F58220] hover:underline"
            >
              View all
            </Link>
          </div>
          {recentEnquiries.length === 0 ? (
            <p className="mt-6 text-[13px] text-white/45">No enquiries yet.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {recentEnquiries.map((e) => (
                <li
                  key={e.id}
                  className="rounded-xl border border-white/8 bg-black/20 px-3.5 py-3"
                >
                  <p className="truncate text-[13px] font-semibold text-white">
                    {e.name}
                  </p>
                  <p className="mt-1 line-clamp-2 text-[12px] text-white/50">
                    {e.message || e.email}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <div>
        <h2 className="mb-4 text-[14px] font-bold uppercase tracking-[0.14em] text-white/45">
          Quick actions
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-[#F58220]/40 hover:bg-white/[0.05]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-[#F58220]/15 text-[#F58220]">
                  <card.icon className="size-5" />
                </div>
                <ArrowUpRight className="size-4 text-white/30 transition group-hover:text-[#F58220]" />
              </div>
              <h3 className="mt-5 text-[16px] font-semibold tracking-tight">
                {card.title}
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-white/55">
                {card.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
