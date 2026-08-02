export type CompanyNavItem = {
  id: string;
  title: string;
  href: string;
};

/** Company dropdown — Destinations-style dark list */
export const companyNavItems: CompanyNavItem[] = [
  { id: "about", title: "About Company", href: "/about" },
  { id: "team", title: "Our Team", href: "/about#team" },
  { id: "vision", title: "Our Vision", href: "/about#vision" },
  { id: "legal", title: "Legal Documents", href: "/legal" },
  { id: "why", title: "Why Summit Seek", href: "/why-summit-seek" },
  { id: "responsible", title: "Responsible Travel", href: "/responsible-travel" },
  { id: "affiliate", title: "Affiliate Program", href: "/affiliate" },
  { id: "terms", title: "Terms & Conditions", href: "/terms" },
  { id: "payment", title: "Payment Procedure & Details", href: "/payment" },
  { id: "privacy", title: "Privacy Policy", href: "/privacy" },
];
