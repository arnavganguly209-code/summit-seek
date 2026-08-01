import type { NavItem, MegaCategory } from "@/types";

export const mainNav: NavItem[] = [
  { label: "Destinations", href: "/destinations", mega: true },
  { label: "Trekking In Nepal", href: "/trekking", mega: true },
  { label: "Travel Info", href: "/travel-guide" },
  { label: "Company", href: "/about" },
  { label: "Travel Blogs", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

export const megaCategories: MegaCategory[] = [
  {
    id: "everest",
    label: "Everest Region",
    href: "/destinations/everest",
    icon: "mountain",
    description: "Iconic trails beneath the world's highest peak",
    packages: [
      { title: "Everest Base Camp Trek", href: "/treks/everest-base-camp", duration: "14 Days" },
      { title: "Gokyo Lakes Trek", href: "/treks/gokyo-lakes", duration: "12 Days" },
      { title: "EBC with Helicopter Return", href: "/treks/ebc-heli-return", duration: "11 Days" },
      { title: "Three Passes Trek", href: "/treks/three-passes", duration: "18 Days" },
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
      { title: "Poon Hill Luxury Trek", href: "/treks/poon-hill-luxury", duration: "7 Days" },
      { title: "Mardi Himal Trek", href: "/treks/mardi-himal", duration: "8 Days" },
    ],
  },
  {
    id: "langtang",
    label: "Langtang",
    href: "/destinations/langtang",
    icon: "valley",
    description: "Close-to-Kathmandu alpine valleys and culture",
    packages: [
      { title: "Langtang Valley Trek", href: "/treks/langtang-valley", duration: "9 Days" },
      { title: "Gosaikunda Lake Trek", href: "/treks/gosaikunda", duration: "8 Days" },
      { title: "Helambu Circuit", href: "/treks/helambu", duration: "7 Days" },
    ],
  },
  {
    id: "manaslu",
    label: "Manaslu",
    href: "/destinations/manaslu",
    icon: "trail",
    description: "Restricted circuit around the eighth-highest peak",
    packages: [
      { title: "Manaslu Circuit Trek", href: "/treks/manaslu-circuit", duration: "16 Days" },
      { title: "Manaslu with Tsum Valley", href: "/treks/manaslu-tsum", duration: "20 Days" },
      { title: "Manaslu Luxury Lodge", href: "/treks/manaslu-luxury", duration: "14 Days" },
    ],
  },
  {
    id: "mustang",
    label: "Mustang",
    href: "/destinations/mustang",
    icon: "desert",
    description: "Ancient kingdoms and wind-sculpted cliffs",
    packages: [
      { title: "Upper Mustang Trek", href: "/treks/upper-mustang", duration: "14 Days" },
      { title: "Lower Mustang Journey", href: "/treks/lower-mustang", duration: "10 Days" },
      { title: "Mustang Helicopter Tour", href: "/tours/mustang-heli", duration: "1 Day" },
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
      { title: "North Base Camp Trek", href: "/treks/kanchenjunga-north", duration: "18 Days" },
    ],
  },
  {
    id: "dolpo",
    label: "Dolpo",
    href: "/destinations/dolpo",
    icon: "remote",
    description: "Trans-Himalayan mystique and high plateaus",
    packages: [
      { title: "Upper Dolpo Trek", href: "/treks/upper-dolpo", duration: "24 Days" },
      { title: "Lower Dolpo Circuit", href: "/treks/lower-dolpo", duration: "18 Days" },
    ],
  },
  {
    id: "makalu",
    label: "Makalu",
    href: "/destinations/makalu",
    icon: "ridge",
    description: "Wild trails beneath the fifth-highest mountain",
    packages: [
      { title: "Makalu Base Camp Trek", href: "/treks/makalu-bc", duration: "20 Days" },
      { title: "Makalu Barun Valley", href: "/treks/makalu-barun", duration: "16 Days" },
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
    ],
  },
  {
    id: "hidden",
    label: "Hidden Himalayas",
    href: "/destinations/hidden-himalayas",
    icon: "compass",
    description: "Off-map valleys for true explorers",
    packages: [
      { title: "Nar Phu Valley Trek", href: "/treks/nar-phu", duration: "14 Days" },
      { title: "Ruby Valley Trek", href: "/treks/ruby-valley", duration: "10 Days" },
      { title: "Rolwaling Valley", href: "/treks/rolwaling", duration: "12 Days" },
    ],
  },
  {
    id: "peak",
    label: "Peak Climbing",
    href: "/peak-climbing",
    icon: "iceaxe",
    description: "Technical summits with expert guidance",
    packages: [
      { title: "Island Peak Climbing", href: "/peaks/island-peak", duration: "18 Days" },
      { title: "Mera Peak Climbing", href: "/peaks/mera-peak", duration: "18 Days" },
      { title: "Lobuche East", href: "/peaks/lobuche-east", duration: "16 Days" },
    ],
  },
  {
    id: "expeditions",
    label: "Expeditions",
    href: "/expeditions",
    icon: "flag",
    description: "Full-scale Himalayan mountaineering",
    packages: [
      { title: "Ama Dablam Expedition", href: "/expeditions/ama-dablam", duration: "30 Days" },
      { title: "Himlung Himal", href: "/expeditions/himlung", duration: "28 Days" },
    ],
  },
  {
    id: "luxury",
    label: "Luxury Trek",
    href: "/luxury-trek",
    icon: "gem",
    description: "Lodge stays, private service, refined comfort",
    packages: [
      { title: "Everest Luxury Lodge Trek", href: "/treks/everest-luxury", duration: "12 Days" },
      { title: "Annapurna Sanctuary Luxury", href: "/treks/abc-luxury", duration: "10 Days" },
    ],
  },
  {
    id: "heli",
    label: "Helicopter Tour",
    href: "/helicopter-tours",
    icon: "heli",
    description: "Aerial Himalayan experiences",
    packages: [
      { title: "Everest Scenic Flight", href: "/tours/everest-heli", duration: "4 Hours" },
      { title: "Annapurna Heli Tour", href: "/tours/annapurna-heli", duration: "3 Hours" },
    ],
  },
  {
    id: "day",
    label: "Day Tours",
    href: "/day-tours",
    icon: "sun",
    description: "Curated day journeys from Kathmandu & Pokhara",
    packages: [
      { title: "Kathmandu Heritage Tour", href: "/tours/kathmandu-heritage", duration: "1 Day" },
      { title: "Nagarkot Sunrise Tour", href: "/tours/nagarkot-sunrise", duration: "1 Day" },
      { title: "Bhaktapur & Patan", href: "/tours/bhaktapur-patan", duration: "1 Day" },
    ],
  },
];
