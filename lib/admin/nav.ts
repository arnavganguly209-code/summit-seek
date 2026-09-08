export type AdminNavItem = {
  href: string;
  label: string;
  description?: string;
};

export type AdminNavSection = {
  id: string;
  label: string;
  items: AdminNavItem[];
};

/** Orbit editor path for a live package href */
export function orbitEditorHref(packageHref: string): string {
  const slug = packageHref.split("/").filter(Boolean).pop() || "";
  return `/orbit/dashboard/website/${slug}`;
}

export const ADMIN_NAV: AdminNavSection[] = [
  {
    id: "overview",
    label: "Overview",
    items: [
      {
        href: "/admin/dashboard",
        label: "Dashboard Home",
        description: "Quick links and status",
      },
    ],
  },
  {
    id: "leads",
    label: "Customer Leads",
    items: [
      {
        href: "/admin/dashboard/enquiries",
        label: "Enquiries",
        description: "Contact form messages",
      },
      {
        href: "/admin/dashboard/bookings",
        label: "Booking Requests",
        description: "Book This Trip submissions",
      },
    ],
  },
  {
    id: "website",
    label: "Website Content",
    items: [
      {
        href: "/orbit/dashboard/website/home/hero",
        label: "Hero Section",
        description: "Video, search copy, features",
      },
      {
        href: "/orbit/dashboard/website/contact",
        label: "Contact Page",
        description: "Address, form labels, socials",
      },
      {
        href: "/orbit/dashboard/website/blog",
        label: "Blog Posts",
        description: "Write and publish blog content",
      },
      {
        href: "/orbit/dashboard/media",
        label: "Media Library",
        description: "Upload, replace, delete images",
      },
      {
        href: "/orbit/dashboard/website/header",
        label: "Header Logos",
      },
      {
        href: "/orbit/dashboard/website/footer",
        label: "Footer",
      },
    ],
  },
  {
    id: "packages",
    label: "Packages & Trips",
    items: [
      {
        href: "/admin/dashboard/packages",
        label: "All Packages",
        description: "Edit every trek, tour & package",
      },
      {
        href: "/orbit/dashboard/website/packages",
        label: "Featured Packages (Home)",
      },
      {
        href: "/orbit/dashboard/website/best-selling",
        label: "Best Selling Packages",
      },
      {
        href: "/orbit/dashboard/website/upcoming-trips",
        label: "Upcoming Trips",
      },
      {
        href: "/orbit/dashboard/website/day-tours",
        label: "Day Tours Listing",
      },
      {
        href: "/admin/dashboard/new-package",
        label: "Add New Package",
        description: "Create a new trip page",
      },
    ],
  },
];
