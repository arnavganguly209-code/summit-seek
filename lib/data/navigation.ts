import type { NavItem, MegaCategory } from "@/types";

export const mainNav: NavItem[] = [
  { label: "Destinations", href: "/destinations", mega: true, dropdown: true },
  { label: "Trekking In Nepal", href: "/trekking", mega: true, dropdown: true },
  { label: "Travel Info", href: "/travel-guide", dropdown: true },
  { label: "Company", href: "/about", dropdown: true },
  { label: "Travel Blogs", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

export type MegaKind = "destinations" | "trekking";

export interface DestinationRegion {
  id: string;
  label: string;
  href: string;
  icon: string;
  description: string;
  packages: { title: string; href: string; duration: string }[];
}

export interface TrekkingPackage {
  title: string;
  href: string;
  duration: string;
  difficulty: "Easy" | "Moderate" | "Challenging" | "Strenuous";
}

export interface TrekkingColumn {
  id: string;
  heading: string;
  href: string;
  subtitle: string;
  links: TrekkingPackage[];
}

/** Destinations mega — left rail regions */
export const destinationRegions: DestinationRegion[] = [
  {
    id: "everest",
    label: "Everest",
    href: "/destinations/everest",
    icon: "mountain",
    description: "Iconic trails beneath the world's highest peak",
    packages: [
      { title: "Everest Base Camp", href: "/treks/everest-base-camp", duration: "14 Days" },
      { title: "Everest Three Passes", href: "/treks/three-passes", duration: "18 Days" },
      { title: "Gokyo Lakes", href: "/treks/gokyo-lakes", duration: "12 Days" },
      { title: "Island Peak", href: "/peaks/island-peak", duration: "18 Days" },
      { title: "Everest Luxury Trek", href: "/treks/everest-luxury", duration: "12 Days" },
      { title: "Helicopter Return", href: "/treks/ebc-heli-return", duration: "11 Days" },
    ],
  },
  {
    id: "annapurna",
    label: "Annapurna",
    href: "/destinations/annapurna",
    icon: "peaks",
    description: "Diverse landscapes from valleys to high passes",
    packages: [
      { title: "Annapurna Circuit", href: "/treks/annapurna-circuit", duration: "16 Days" },
      { title: "Annapurna Base Camp", href: "/treks/annapurna-base-camp", duration: "11 Days" },
      { title: "Poon Hill Luxury", href: "/treks/poon-hill-luxury", duration: "7 Days" },
      { title: "Mardi Himal", href: "/treks/mardi-himal", duration: "8 Days" },
      { title: "Annapurna Sanctuary Luxury", href: "/treks/abc-luxury", duration: "10 Days" },
      { title: "Ghorepani Trek", href: "/treks/ghorepani", duration: "6 Days" },
    ],
  },
  {
    id: "langtang",
    label: "Langtang",
    href: "/destinations/langtang",
    icon: "valley",
    description: "Close-to-Kathmandu alpine valleys and culture",
    packages: [
      { title: "Langtang Valley", href: "/treks/langtang-valley", duration: "9 Days" },
      { title: "Gosaikunda Lake", href: "/treks/gosaikunda", duration: "8 Days" },
      { title: "Helambu Circuit", href: "/treks/helambu", duration: "7 Days" },
      { title: "Tamang Heritage", href: "/treks/tamang-heritage", duration: "8 Days" },
    ],
  },
  {
    id: "manaslu",
    label: "Manaslu",
    href: "/destinations/manaslu",
    icon: "trail",
    description: "Restricted circuit around the eighth-highest peak",
    packages: [
      { title: "Manaslu Circuit", href: "/treks/manaslu-circuit", duration: "16 Days" },
      { title: "Manaslu with Tsum Valley", href: "/treks/manaslu-tsum", duration: "20 Days" },
      { title: "Manaslu Luxury Lodge", href: "/treks/manaslu-luxury", duration: "14 Days" },
      { title: "Tsum Valley Trek", href: "/treks/tsum-valley", duration: "14 Days" },
    ],
  },
  {
    id: "mustang",
    label: "Mustang",
    href: "/destinations/mustang",
    icon: "desert",
    description: "Ancient kingdoms and wind-sculpted cliffs",
    packages: [
      { title: "Upper Mustang", href: "/treks/upper-mustang", duration: "14 Days" },
      { title: "Lower Mustang", href: "/treks/lower-mustang", duration: "10 Days" },
      { title: "Mustang Helicopter", href: "/tours/mustang-heli", duration: "1 Day" },
      { title: "Lo Manthang Journey", href: "/treks/lo-manthang", duration: "12 Days" },
    ],
  },
  {
    id: "dolpo",
    label: "Dolpo",
    href: "/destinations/dolpo",
    icon: "remote",
    description: "Trans-Himalayan mystique and high plateaus",
    packages: [
      { title: "Upper Dolpo", href: "/treks/upper-dolpo", duration: "24 Days" },
      { title: "Lower Dolpo Circuit", href: "/treks/lower-dolpo", duration: "18 Days" },
      { title: "Phoksundo Lake", href: "/treks/phoksundo", duration: "12 Days" },
    ],
  },
  {
    id: "kanchenjunga",
    label: "Kanchenjunga",
    href: "/destinations/kanchenjunga",
    icon: "summit",
    description: "Remote eastern Himalaya wilderness",
    packages: [
      { title: "Kanchenjunga Base Camp", href: "/treks/kanchenjunga-bc", duration: "22 Days" },
      { title: "North Base Camp", href: "/treks/kanchenjunga-north", duration: "18 Days" },
      { title: "South Base Camp", href: "/treks/kanchenjunga-south", duration: "20 Days" },
    ],
  },
  {
    id: "makalu",
    label: "Makalu",
    href: "/destinations/makalu",
    icon: "ridge",
    description: "Wild trails beneath the fifth-highest mountain",
    packages: [
      { title: "Makalu Base Camp", href: "/treks/makalu-bc", duration: "20 Days" },
      { title: "Makalu Barun Valley", href: "/treks/makalu-barun", duration: "16 Days" },
      { title: "Sherpani Col", href: "/treks/sherpani-col", duration: "24 Days" },
    ],
  },
  {
    id: "dhaulagiri",
    label: "Dhaulagiri",
    href: "/destinations/dhaulagiri",
    icon: "glacier",
    description: "Glacier routes and dramatic white peaks",
    packages: [
      { title: "Dhaulagiri Circuit", href: "/treks/dhaulagiri-circuit", duration: "18 Days" },
      { title: "French Pass Trek", href: "/treks/french-pass", duration: "16 Days" },
      { title: "Dhaulagiri Base Camp", href: "/treks/dhaulagiri-bc", duration: "14 Days" },
    ],
  },
  {
    id: "hidden",
    label: "Hidden Himalayas",
    href: "/destinations/hidden-himalayas",
    icon: "compass",
    description: "Off-map valleys for true explorers",
    packages: [
      { title: "Nar Phu Valley", href: "/treks/nar-phu", duration: "14 Days" },
      { title: "Ruby Valley", href: "/treks/ruby-valley", duration: "10 Days" },
      { title: "Rolwaling Valley", href: "/treks/rolwaling", duration: "12 Days" },
      { title: "Tsum Valley", href: "/treks/tsum-valley", duration: "14 Days" },
    ],
  },
  {
    id: "bhutan",
    label: "Bhutan",
    href: "/destinations/bhutan",
    icon: "gem",
    description: "Himalayan kingdom journeys beyond Nepal",
    packages: [
      { title: "Druk Path Trek", href: "/treks/druk-path", duration: "10 Days" },
      { title: "Snowman Trek", href: "/treks/snowman", duration: "25 Days" },
      { title: "Paro Cultural Journey", href: "/tours/paro-cultural", duration: "7 Days" },
      { title: "Bhutan Luxury Tour", href: "/tours/bhutan-luxury", duration: "8 Days" },
    ],
  },
  {
    id: "tibet",
    label: "Tibet",
    href: "/destinations/tibet",
    icon: "flag",
    description: "High plateaus, monasteries, and sacred peaks",
    packages: [
      { title: "Lhasa Cultural Tour", href: "/tours/lhasa", duration: "8 Days" },
      { title: "Everest North Base Camp", href: "/treks/tibet-ebc", duration: "10 Days" },
      { title: "Tibet Overland Journey", href: "/tours/tibet-overland", duration: "12 Days" },
    ],
  },
  {
    id: "kailash",
    label: "Mount Kailash",
    href: "/destinations/mount-kailash",
    icon: "summit",
    description: "Sacred pilgrimage around the holy mountain",
    packages: [
      { title: "Kailash Mansarovar Yatra", href: "/treks/kailash-mansarovar", duration: "14 Days" },
      { title: "Kailash Outer Kora", href: "/treks/kailash-kora", duration: "16 Days" },
      { title: "Kailash Helicopter Yatra", href: "/tours/kailash-heli", duration: "9 Days" },
    ],
  },
];

/** Trekking In Nepal mega — sidebar regions + package panels */
export const trekkingColumns: TrekkingColumn[] = [
  {
    id: "everest",
    heading: "Everest Region",
    href: "/destinations/everest",
    subtitle: "World's highest mountain adventures.",
    links: [
      { title: "Everest Base Camp Trek", href: "/treks/everest-base-camp", duration: "14 Days", difficulty: "Challenging" },
      { title: "Everest Three Passes Trek", href: "/treks/three-passes", duration: "18 Days", difficulty: "Strenuous" },
      { title: "Gokyo Lakes Trek", href: "/treks/gokyo-lakes", duration: "12 Days", difficulty: "Challenging" },
      { title: "Everest Luxury Trek", href: "/treks/everest-luxury", duration: "12 Days", difficulty: "Moderate" },
      { title: "Everest View Trek", href: "/treks/everest-view", duration: "7 Days", difficulty: "Easy" },
      { title: "Island Peak Climbing", href: "/peaks/island-peak", duration: "18 Days", difficulty: "Strenuous" },
    ],
  },
  {
    id: "annapurna",
    heading: "Annapurna Region",
    href: "/destinations/annapurna",
    subtitle: "Classic trails beneath sacred Himalayan peaks.",
    links: [
      { title: "Annapurna Base Camp Trek", href: "/treks/annapurna-base-camp", duration: "11 Days", difficulty: "Moderate" },
      { title: "Annapurna Circuit Trek", href: "/treks/annapurna-circuit", duration: "16 Days", difficulty: "Challenging" },
      { title: "Mardi Himal Trek", href: "/treks/mardi-himal", duration: "10 Days", difficulty: "Moderate" },
      { title: "Poon Hill Trek", href: "/treks/poon-hill", duration: "5 Days", difficulty: "Easy" },
      { title: "Khopra Ridge Trek", href: "/treks/khopra-ridge", duration: "9 Days", difficulty: "Moderate" },
      { title: "Tilicho Lake Trek", href: "/treks/tilicho-lake", duration: "14 Days", difficulty: "Challenging" },
    ],
  },
  {
    id: "langtang",
    heading: "Langtang Region",
    href: "/destinations/langtang",
    subtitle: "Alpine valleys close to Kathmandu.",
    links: [
      { title: "Langtang Valley Trek", href: "/treks/langtang-valley", duration: "10 Days", difficulty: "Moderate" },
      { title: "Gosaikunda Trek", href: "/treks/gosaikunda", duration: "8 Days", difficulty: "Moderate" },
      { title: "Helambu Trek", href: "/treks/helambu", duration: "7 Days", difficulty: "Easy" },
      { title: "Tamang Heritage Trek", href: "/treks/tamang-heritage", duration: "11 Days", difficulty: "Moderate" },
      { title: "Langtang Ganja La Trek", href: "/treks/ganja-la", duration: "15 Days", difficulty: "Challenging" },
    ],
  },
  {
    id: "manaslu",
    heading: "Manaslu Region",
    href: "/destinations/manaslu",
    subtitle: "Remote circuits around the eighth-highest peak.",
    links: [
      { title: "Manaslu Circuit Trek", href: "/treks/manaslu-circuit", duration: "14 Days", difficulty: "Challenging" },
      { title: "Tsum Valley Trek", href: "/treks/tsum-valley", duration: "16 Days", difficulty: "Moderate" },
      { title: "Manaslu Tsum Valley Trek", href: "/treks/manaslu-tsum", duration: "20 Days", difficulty: "Challenging" },
      { title: "Rupina La Trek", href: "/treks/rupina-la", duration: "17 Days", difficulty: "Strenuous" },
    ],
  },
  {
    id: "mustang",
    heading: "Mustang Region",
    href: "/destinations/mustang",
    subtitle: "Ancient kingdoms beyond the Annapurna range.",
    links: [
      { title: "Upper Mustang Trek", href: "/treks/upper-mustang", duration: "14 Days", difficulty: "Moderate" },
      { title: "Lower Mustang Trek", href: "/treks/lower-mustang", duration: "8 Days", difficulty: "Easy" },
      { title: "Lo Manthang Trek", href: "/treks/lo-manthang", duration: "12 Days", difficulty: "Moderate" },
      { title: "Mustang Jeep Tour", href: "/tours/mustang-jeep", duration: "7 Days", difficulty: "Easy" },
    ],
  },
  {
    id: "dolpo",
    heading: "Dolpo Region",
    href: "/destinations/dolpo",
    subtitle: "Wild highlands and timeless Tibetan culture.",
    links: [
      { title: "Upper Dolpo Trek", href: "/treks/upper-dolpo", duration: "24 Days", difficulty: "Strenuous" },
      { title: "Lower Dolpo Trek", href: "/treks/lower-dolpo", duration: "18 Days", difficulty: "Challenging" },
      { title: "Shey Gompa Trek", href: "/treks/shey-gompa", duration: "21 Days", difficulty: "Strenuous" },
    ],
  },
  {
    id: "kanchenjunga",
    heading: "Kanchenjunga Region",
    href: "/destinations/kanchenjunga",
    subtitle: "Expedition trails to the world's third-highest peak.",
    links: [
      { title: "Kanchenjunga Circuit Trek", href: "/treks/kanchenjunga-circuit", duration: "22 Days", difficulty: "Strenuous" },
      { title: "North Base Camp Trek", href: "/treks/kanchenjunga-north", duration: "18 Days", difficulty: "Challenging" },
      { title: "South Base Camp Trek", href: "/treks/kanchenjunga-south", duration: "17 Days", difficulty: "Challenging" },
    ],
  },
  {
    id: "makalu",
    heading: "Makalu Region",
    href: "/destinations/makalu",
    subtitle: "Wild approaches to the fifth-highest mountain.",
    links: [
      { title: "Makalu Base Camp Trek", href: "/treks/makalu-bc", duration: "20 Days", difficulty: "Strenuous" },
    ],
  },
  {
    id: "dhaulagiri",
    heading: "Dhaulagiri Region",
    href: "/destinations/dhaulagiri",
    subtitle: "Rugged circuits around the White Mountain.",
    links: [
      { title: "Dhaulagiri Circuit Trek", href: "/treks/dhaulagiri-circuit", duration: "18 Days", difficulty: "Strenuous" },
    ],
  },
  {
    id: "rolwaling",
    heading: "Rolwaling Region",
    href: "/destinations/rolwaling",
    subtitle: "Hidden valleys between Everest and Langtang.",
    links: [
      { title: "Rolwaling Valley Trek", href: "/treks/rolwaling", duration: "12 Days", difficulty: "Challenging" },
    ],
  },
  {
    id: "hidden",
    heading: "Hidden Himalayas",
    href: "/destinations/hidden-himalayas",
    subtitle: "Off-map journeys for true explorers.",
    links: [
      { title: "Hidden Himalayas Trek", href: "/treks/hidden-himalayas", duration: "15 Days", difficulty: "Challenging" },
    ],
  },
];

/** Legacy alias — used by older imports / mobile fallbacks */
export const megaCategories: MegaCategory[] = destinationRegions.map((r) => ({
  id: r.id,
  label: r.label,
  href: r.href,
  icon: r.icon,
  description: r.description,
  packages: r.packages,
}));
