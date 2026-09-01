export type LinkablePackageOption = {
  href: string;
  label: string;
  group: "Packages" | "Treks" | "Tours";
};

/** Legacy listing links → live pages already on the site. */
export const HREF_ALIASES: Record<string, string> = {
  "/packages/upper-mustang-trek": "/treks/upper-mustang",
  "/packages/ghorepani-poon-hill-trek": "/treks/poon-hill",
  "/packages/guerrilla-trek": "/treks/arun-valley",
  "/packages/renjo-la-gokyo-heli": "/treks/gokyo-lakes",
};

export const LINKABLE_PACKAGE_OPTIONS: LinkablePackageOption[] = [
  { href: "/packages/annapurna-base-camp-trek", label: "Annapurna Base Camp Trek", group: "Packages" },
  { href: "/packages/annapurna-circuit-trek", label: "Annapurna Circuit Trek", group: "Packages" },
  { href: "/packages/everest-base-camp-helicopter-tour", label: "Everest Base Camp Helicopter Tour", group: "Packages" },
  { href: "/packages/everest-base-camp-trek", label: "Everest Base Camp Trek", group: "Packages" },
  { href: "/packages/langtang-valley-trek", label: "Langtang Valley Trek", group: "Packages" },
  { href: "/packages/manaslu-circuit-trek", label: "Manaslu Circuit Trek", group: "Packages" },
  { href: "/treks/annapurna-base-camp", label: "Annapurna Base Camp", group: "Treks" },
  { href: "/treks/annapurna-circuit", label: "Annapurna Circuit", group: "Treks" },
  { href: "/treks/annapurna-luxury-lodge", label: "Annapurna Luxury Lodge", group: "Treks" },
  { href: "/treks/arun-valley", label: "Arun Valley Trek", group: "Treks" },
  { href: "/treks/everest-base-camp", label: "Everest Base Camp", group: "Treks" },
  { href: "/treks/everest-heli-view", label: "Everest Heli View Trek", group: "Treks" },
  { href: "/treks/everest-view", label: "Everest View Trek", group: "Treks" },
  { href: "/treks/gokyo-lakes", label: "Gokyo Lakes Trek", group: "Treks" },
  { href: "/treks/gosainkunda", label: "Gosainkunda Trek", group: "Treks" },
  { href: "/treks/helambu", label: "Helambu Trek", group: "Treks" },
  { href: "/treks/kanchenjunga-bc", label: "Kanchenjunga Base Camp", group: "Treks" },
  { href: "/treks/kanchenjunga-circuit", label: "Kanchenjunga Circuit", group: "Treks" },
  { href: "/treks/kanchenjunga-north", label: "Kanchenjunga North", group: "Treks" },
  { href: "/treks/kanchenjunga-south", label: "Kanchenjunga South", group: "Treks" },
  { href: "/treks/langtang-valley", label: "Langtang Valley", group: "Treks" },
  { href: "/treks/lobuche-peak", label: "Lobuche Peak", group: "Treks" },
  { href: "/treks/lo-manthang", label: "Lo Manthang", group: "Treks" },
  { href: "/treks/lower-dolpo", label: "Lower Dolpo", group: "Treks" },
  { href: "/treks/lower-mustang", label: "Lower Mustang", group: "Treks" },
  { href: "/treks/luxury-everest-base-camp", label: "Luxury Everest Base Camp", group: "Treks" },
  { href: "/treks/makalu-barun", label: "Makalu Barun", group: "Treks" },
  { href: "/treks/makalu-bc", label: "Makalu Base Camp", group: "Treks" },
  { href: "/treks/manaslu-circuit", label: "Manaslu Circuit", group: "Treks" },
  { href: "/treks/manaslu-tsum", label: "Manaslu Tsum", group: "Treks" },
  { href: "/treks/mardi-himal", label: "Mardi Himal", group: "Treks" },
  { href: "/treks/mera-peak", label: "Mera Peak", group: "Treks" },
  { href: "/treks/phoksundo", label: "Phoksundo Trek", group: "Treks" },
  { href: "/treks/pokalde-peak", label: "Pokalde Peak", group: "Treks" },
  { href: "/treks/poon-hill", label: "Ghorepani Poon Hill Trek", group: "Treks" },
  { href: "/treks/rupina-la", label: "Rupina La", group: "Treks" },
  { href: "/treks/sherpani-col", label: "Sherpani Col", group: "Treks" },
  { href: "/treks/shey-gompa", label: "Shey Gompa", group: "Treks" },
  { href: "/treks/tamang-heritage", label: "Tamang Heritage", group: "Treks" },
  { href: "/treks/three-passes", label: "Three Passes", group: "Treks" },
  { href: "/treks/tsum-valley", label: "Tsum Valley", group: "Treks" },
  { href: "/treks/upper-dolpo", label: "Upper Dolpo", group: "Treks" },
  { href: "/treks/upper-mustang", label: "Upper Mustang Trek", group: "Treks" },
  { href: "/treks/yala-peak", label: "Yala Peak", group: "Treks" },
  { href: "/tours/bhaktapur-city", label: "Bhaktapur City Tour", group: "Tours" },
  { href: "/tours/janakpur-city", label: "Janakpur City Tour", group: "Tours" },
  { href: "/tours/kathmandu-city", label: "Kathmandu City Tour", group: "Tours" },
  { href: "/tours/mustang-heli-vip", label: "VIP Mustang Helicopter Tour", group: "Tours" },
  { href: "/tours/mustang-jeep", label: "Mustang Jeep Tour", group: "Tours" },
  { href: "/tours/shivapuri-yoga-hike", label: "Shivapuri Yoga Hike", group: "Tours" },
  { href: "/tours/chitwan-jungle-safari", label: "Chitwan Jungle Safari", group: "Tours" },
  { href: "/tours/chitwan-wildlife-lodge-safari", label: "Chitwan Wildlife Lodge Safari", group: "Tours" },
  { href: "/tours/bardiya-jungle-safari", label: "Bardiya Jungle Safari", group: "Tours" },
  { href: "/tours/koshi-tappu-safari", label: "Koshi Tappu Safari", group: "Tours" },
];

export function normalizePackageHref(href: string): string {
  const trimmed = href.trim();
  return HREF_ALIASES[trimmed] ?? trimmed;
}
