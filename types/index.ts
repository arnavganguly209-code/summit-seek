export interface NavItem {
  label: string;
  href: string;
  mega?: boolean;
  dropdown?: boolean;
}

export interface MegaCategory {
  id: string;
  label: string;
  href: string;
  icon: string;
  description: string;
  packages: { title: string; href: string; duration: string }[];
}
