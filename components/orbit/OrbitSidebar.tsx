"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Globe2,
  Home,
  PanelsTopLeft,
  Package,
  BriefcaseBusiness,
  MessageSquareQuote,
  Info,
  PanelBottom,
  Images,
  Users,
  Settings,
  BookOpen,
  PhoneCall,
  Building2,
  Image as LogoImage,
  Scale,
  Sparkles,
  Leaf,
  Handshake,
  FileText,
  CreditCard,
  Shield,
  Stamp,
  Map,
  CalendarDays,
  ShieldCheck,
  HeartPulse,
  Wallet,
  Backpack,
  Mountain,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/orbit/dashboard", label: "Dashboard", icon: LayoutDashboard },
  {
    label: "Website",
    icon: Globe2,
    children: [
      { href: "/orbit/dashboard/website/home", label: "Home Page", icon: Home },
      {
        href: "/orbit/dashboard/website/home/hero",
        label: "Hero",
        icon: PanelsTopLeft,
      },
      { href: "/orbit/dashboard/website/header", label: "Header Logos", icon: LogoImage },
      { href: "/orbit/dashboard/website/packages", label: "Featured Packages", icon: Package },
      {
        href: "/orbit/dashboard/website/poon-hill",
        label: "Poon Hill Trek",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/annapurna-base-camp",
        label: "Annapurna Base Camp",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/everest-base-camp",
        label: "Everest Base Camp",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/everest-base-camp-trek",
        label: "EBC Trek 15 Days",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/everest-base-camp-helicopter-tour",
        label: "EBC Helicopter Tour",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/mardi-himal",
        label: "Mardi Himal Trek",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/three-passes",
        label: "Everest Three Passes",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/gokyo-lakes",
        label: "Gokyo Lakes Trek",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/everest-view",
        label: "Everest View Trek",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/annapurna-circuit",
        label: "Annapurna Circuit",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/annapurna-circuit-trek",
        label: "Annapurna Circuit 15 Days",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/langtang-valley",
        label: "Langtang Valley Trek",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/gosainkunda",
        label: "Gosainkunda Trek",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/helambu",
        label: "Helambu Trek",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/tamang-heritage",
        label: "Tamang Heritage Trail",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/manaslu-circuit",
        label: "Manaslu Circuit Trek",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/manaslu-tsum",
        label: "Manaslu Tsum Valley",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/tsum-valley",
        label: "Tsum Valley Trek",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/rupina-la",
        label: "Rupina La Trek",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/upper-mustang",
        label: "Upper Mustang Trek",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/lower-mustang",
        label: "Lower Mustang Trek",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/lo-manthang",
        label: "Lo Manthang Trek",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/mustang-jeep",
        label: "Mustang Jeep Tour",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/mustang-heli-vip",
        label: "VIP Mustang Helicopter",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/shivapuri-yoga-hike",
        label: "Shivapuri Yoga Hike",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/bhaktapur-city",
        label: "Bhaktapur City Tour",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/janakpur-city",
        label: "Janakpur City Tour",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/kathmandu-city",
        label: "Kathmandu City Tour",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/upper-dolpo",
        label: "Upper Dolpo Trek",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/lower-dolpo",
        label: "Lower Dolpo Trek",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/shey-gompa",
        label: "Shey Gompa Trek",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/phoksundo",
        label: "Phoksundo Lake Trek",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/kanchenjunga-circuit",
        label: "Kanchenjunga Circuit Trek",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/kanchenjunga-north",
        label: "Kanchenjunga North BC Trek",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/kanchenjunga-south",
        label: "Kanchenjunga South BC Trek",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/kanchenjunga-bc",
        label: "Kanchenjunga Base Camp Trek",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/makalu-bc",
        label: "Makalu Base Camp Trek",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/makalu-barun",
        label: "Makalu Barun Valley Trek",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/arun-valley",
        label: "Arun Valley Trek",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/sherpani-col",
        label: "Sherpani Col Trek",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/yala-peak",
        label: "Yala Peak Climbing",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/mera-peak",
        label: "Mera Peak Climbing",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/pokalde-peak",
        label: "Pokalde Peak Climbing",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/lobuche-peak",
        label: "Lobuche Peak Climbing",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/everest-heli-view",
        label: "Everest Heli View Trek",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/luxury-everest-base-camp",
        label: "Luxury Everest Base Camp",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/annapurna-luxury-lodge",
        label: "Annapurna Luxury Lodge",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/everest-region",
        label: "Everest Region",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/annapurna-region",
        label: "Annapurna Region",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/langtang-region",
        label: "Langtang Region",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/manaslu-region",
        label: "Manaslu Region",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/mustang-region",
        label: "Mustang Region",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/dolpo-region",
        label: "Dolpo Region",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/kanchenjunga-region",
        label: "Kanchenjunga Region",
        icon: Mountain,
      },
      {
        href: "/orbit/dashboard/website/makalu-region",
        label: "Makalu Region",
        icon: Mountain,
      },
      { href: "/orbit/dashboard/website/best-selling", label: "Best Selling Packages", icon: Package },
      { href: "/orbit/dashboard/website/services", label: "What We Offer", icon: BriefcaseBusiness },
      {
        href: "/orbit/dashboard/website/upcoming-trips",
        label: "Upcoming Trips",
        icon: BriefcaseBusiness,
      },
      { href: "/orbit/dashboard/website/reviews", label: "Reviews", icon: MessageSquareQuote },
      { href: "/orbit/dashboard/website/articles", label: "Travel Articles", icon: MessageSquareQuote },
      { href: "/orbit/dashboard/website/blog", label: "Blog", icon: BookOpen },
      { href: "/orbit/dashboard/website/contact", label: "Contact", icon: PhoneCall },
      { href: "/orbit/dashboard/website/about", label: "Get to Know Us", icon: Info },
      { href: "/orbit/dashboard/website/about-page", label: "About / Team / Vision", icon: Building2 },
      { href: "/orbit/dashboard/website/why-summit-seek", label: "Why Summit Seek", icon: Sparkles },
      {
        href: "/orbit/dashboard/website/responsible-travel",
        label: "Responsible Travel",
        icon: Leaf,
      },
      {
        href: "/orbit/dashboard/website/affiliate",
        label: "Affiliate Program",
        icon: Handshake,
      },
      {
        href: "/orbit/dashboard/website/terms",
        label: "Terms & Conditions",
        icon: FileText,
      },
      {
        href: "/orbit/dashboard/website/payment",
        label: "Payment Procedure",
        icon: CreditCard,
      },
      {
        href: "/orbit/dashboard/website/privacy",
        label: "Privacy Policy",
        icon: Shield,
      },
      {
        href: "/orbit/dashboard/website/nepal-visa",
        label: "Nepal Visa Guide",
        icon: Stamp,
      },
      {
        href: "/orbit/dashboard/website/permits-tims",
        label: "Permits & TIMS",
        icon: Map,
      },
      {
        href: "/orbit/dashboard/website/best-time",
        label: "Best Time to Visit",
        icon: CalendarDays,
      },
      {
        href: "/orbit/dashboard/website/travel-insurance",
        label: "Travel Insurance",
        icon: ShieldCheck,
      },
      {
        href: "/orbit/dashboard/website/health-safety",
        label: "Health & Safety",
        icon: HeartPulse,
      },
      {
        href: "/orbit/dashboard/website/money-currency",
        label: "Money & Currency",
        icon: Wallet,
      },
      {
        href: "/orbit/dashboard/website/packing-checklist",
        label: "Packing Checklist",
        icon: Backpack,
      },
      { href: "/orbit/dashboard/website/legal", label: "Legal Documents", icon: Scale },
      { href: "/orbit/dashboard/website/footer", label: "Footer", icon: PanelBottom },
    ],
  },
  { href: "/orbit/dashboard/media", label: "Media Library", icon: Images },
  { href: "/orbit/dashboard/users", label: "Users", icon: Users },
  { href: "/orbit/dashboard/settings", label: "Settings", icon: Settings },
];

export function OrbitSidebar() {
  const pathname = usePathname();

  return (
    <aside className="relative z-10 hidden w-[270px] shrink-0 border-r border-white/[0.08] bg-[#050910]/90 backdrop-blur-xl lg:flex lg:flex-col">
      <div className="border-b border-white/[0.08] px-5 py-6">
        <p className="text-[12px] font-bold tracking-[0.28em] text-[#F58220]">ORBIT</p>
        <p className="mt-1.5 text-[13px] font-medium text-white/55">Content Operating System</p>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {nav.map((item) => {
          if ("children" in item && item.children) {
            return (
              <div key={item.label} className="pt-2">
                <div className="mb-1 flex items-center gap-2 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
                  <item.icon className="size-3.5" />
                  {item.label}
                </div>
                <div className="space-y-0.5">
                  {item.children.map((child) => {
                    const active = pathname === child.href;
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-medium transition",
                          active
                            ? "bg-[#F58220]/15 text-[#F58220]"
                            : "text-white/70 hover:bg-white/5 hover:text-white",
                        )}
                      >
                        <child.icon className="size-4 opacity-80" />
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          }
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href!}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2.5 text-[13px] font-medium transition",
                active
                  ? "bg-[#F58220]/15 text-[#F58220]"
                  : "text-white/70 hover:bg-white/5 hover:text-white",
              )}
            >
              <item.icon className="size-4 opacity-80" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
