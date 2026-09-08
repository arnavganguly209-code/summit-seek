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
} from "lucide-react";
import { getEnquiries } from "@/lib/orbit/store";

const cards = [
  {
    href: "/orbit/dashboard/website/home/hero",
    title: "Hero Section",
    desc: "Edit homepage video, headline, and search box copy.",
    icon: PanelsTopLeft,
  },
  {
    href: "/orbit/dashboard/website/contact",
    title: "Contact Page",
    desc: "Phone, email, address, and contact form labels.",
    icon: PhoneCall,
  },
  {
    href: "/admin/dashboard/packages",
    title: "All Packages & Trips",
    desc: "Full edit for itinerary, images, prices, and content.",
    icon: Mountain,
  },
  {
    href: "/admin/dashboard/enquiries",
    title: "Enquiries",
    desc: "Customer messages from the contact form.",
    icon: MessageSquareText,
  },
  {
    href: "/admin/dashboard/bookings",
    title: "Booking Requests",
    desc: "Book This Trip leads and package interest.",
    icon: CalendarCheck2,
  },
  {
    href: "/orbit/dashboard/website/blog",
    title: "Blog Posts",
    desc: "Write, edit, and publish travel stories.",
    icon: BookOpen,
  },
  {
    href: "/orbit/dashboard/media",
    title: "Media Library",
    desc: "Upload new images or replace existing ones.",
    icon: Images,
  },
  {
    href: "/admin/dashboard/new-package",
    title: "Add New Package",
    desc: "Create a new trek or tour page from a template.",
    icon: PlusCircle,
  },
  {
    href: "/admin/dashboard/settings",
    title: "Login & Passwords",
    desc: "Change admin User ID / password and view Orbit passkey.",
    icon: KeyRound,
  },
];

export default async function AdminDashboardHomePage() {
  const enquiries = await getEnquiries();
  const newEnquiries = enquiries.items.filter(
    (i) => i.kind === "enquiry" && i.status === "new",
  ).length;
  const newBookings = enquiries.items.filter(
    (i) => i.kind === "booking" && i.status === "new",
  ).length;

  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent p-6 sm:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#F58220]/30 bg-[#F58220]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#F58220]">
          <Sparkles className="size-3.5" />
          Premium Control
        </div>
        <h1 className="mt-4 text-[28px] font-bold tracking-tight sm:text-[32px]">
          Welcome back
        </h1>
        <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-white/60">
          Manage Summit Seek from one place — packages, bookings, enquiries, hero,
          contact, blog, and media. Each section opens a focused editor.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/40">
              New enquiries
            </p>
            <p className="mt-1 text-[22px] font-extrabold text-white">{newEnquiries}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/40">
              New bookings
            </p>
            <p className="mt-1 text-[22px] font-extrabold text-white">{newBookings}</p>
          </div>
        </div>
      </div>

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
            <h2 className="mt-5 text-[16px] font-semibold tracking-tight">{card.title}</h2>
            <p className="mt-1.5 text-[13px] leading-relaxed text-white/55">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
