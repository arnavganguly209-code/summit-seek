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

/** Admin CMS editor path for a live package href (never /orbit). */
export function adminEditorHref(packageHref: string): string {
  const slug = packageHref.split("/").filter(Boolean).pop() || "";
  return `/admin/dashboard/edit/${slug}`;
}

/** @deprecated use adminEditorHref — kept so older imports compile */
export function orbitEditorHref(packageHref: string): string {
  return adminEditorHref(packageHref);
}

export const ADMIN_NAV: AdminNavSection[] = [
  {
    id: "overview",
    label: "Overview",
    items: [
      {
        href: "/admin/dashboard",
        label: "Dashboard Home",
        description: "Bookings, enquiries, packages overview",
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
    id: "packages",
    label: "Packages & Trips",
    items: [
      {
        href: "/admin/dashboard/packages",
        label: "All Packages",
        description: "Edit every trek, tour & package",
      },
      {
        href: "/admin/dashboard/new-package",
        label: "Add / Duplicate Package",
        description: "Start from a template and publish",
      },
      {
        href: "/admin/dashboard/edit/packages",
        label: "Featured Packages (Home)",
        description: "Homepage adventure tabs",
      },
      {
        href: "/admin/dashboard/edit/best-selling",
        label: "Best Selling Packages",
      },
      {
        href: "/admin/dashboard/edit/upcoming-trips",
        label: "Upcoming Trips",
      },
      {
        href: "/admin/dashboard/edit/day-tours",
        label: "Day Tours Listing",
      },
    ],
  },
  {
    id: "website",
    label: "Website Content",
    items: [
      {
        href: "/admin/dashboard/edit/home/hero",
        label: "Hero Section",
        description: "Video, search copy, features",
      },
      {
        href: "/admin/dashboard/edit/contact",
        label: "Contact Page",
        description: "Address, form labels, socials",
      },
      {
        href: "/admin/dashboard/edit/blog",
        label: "Blog Posts",
        description: "Write and publish blog content",
      },
      {
        href: "/admin/dashboard/edit/media",
        label: "Media Library",
        description: "Upload, replace, delete images",
      },
      {
        href: "/admin/dashboard/edit/header",
        label: "Header Logos",
      },
      {
        href: "/admin/dashboard/edit/footer",
        label: "Footer",
      },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    items: [
      {
        href: "/admin/dashboard/settings",
        label: "Login, Phone & Email",
        description: "Passwords and public contact details",
      },
    ],
  },
];
