import type { BestTimeContent } from "@/types/best-time-cms";
import { SITE } from "@/lib/constants";

export const DEFAULT_BEST_TIME: BestTimeContent = {
  coverImageUrl:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80",
  coverTitle: "Best Time to Visit Nepal",
  coverSubtitle:
    "Season-by-season guidance for clear peaks, rhododendron trails, quiet winters, and rain-shadow adventures.",
  introEyebrow: "Travel Info",
  introHeading: "When should you trek the Himalaya?",
  introBody:
    "Nepal can be trekked year-round, but weather, views, and crowd levels change with the seasons. Spring and autumn usually bring the clearest mountain days. Winter suits lower trails. Monsoon opens rain-shadow regions like Upper Mustang. Summit Seek helps match your dates, fitness, and dream route to the right window.",
  seasonsHeading: "Four seasons on the trail",
  seasonsIntro:
    "Pick the season that fits your trek style — photography, flowers, solitude, or high-altitude ambitions.",
  seasons: [
    {
      id: "autumn",
      name: "Autumn",
      months: "September – November",
      tagline: "Best overall trekking season",
      description:
        "After monsoon, skies turn crisp and peaks look sharp. Stable weather and mild days make autumn the favorite window for classic high routes and festival travel around Dashain and Tihar.",
      highlights: [
        "Crystal-clear Himalayan visibility",
        "Stable weather for high-altitude treks",
        "Ideal for photography and festivals",
        "Everest, Annapurna, Manaslu, Langtang at their best",
      ],
      condition: "Excellent",
      imageUrl: "",
      visible: true,
    },
    {
      id: "spring",
      name: "Spring",
      months: "March – May",
      tagline: "Flowers, warmth & peak climbs",
      description:
        "Rhododendrons paint the hillsides and daytime temperatures feel pleasant on mid-altitude trails. Spring is the second-best classic window and a strong season for peak climbing.",
      highlights: [
        "Blooming forests and lush hillsides",
        "Pleasant daytime temperatures",
        "Strong mountain views on clear days",
        "Great for Poon Hill, Mardi, Island Peak, Mera Peak",
      ],
      condition: "Very good",
      imageUrl: "",
      visible: true,
    },
    {
      id: "winter",
      name: "Winter",
      months: "December – February",
      tagline: "Quiet trails & low-altitude treks",
      description:
        "High passes can close with snow, but many lower routes stay open with fewer crowds and bright winter skies. Pack for cold nights and short daylight.",
      highlights: [
        "Clear skies and dramatic light",
        "Fewer trekkers on popular trails",
        "Best for short / lower-altitude itineraries",
        "Poon Hill, Langtang, Everest View options",
      ],
      condition: "Good",
      imageUrl: "",
      visible: true,
    },
    {
      id: "monsoon",
      name: "Monsoon / Summer",
      months: "June – August",
      tagline: "Rain-shadow & green landscapes",
      description:
        "Heavy rain can make many trails muddy, but rain-shadow regions stay comparatively dry. Lush scenery and quieter paths reward travelers who choose the right zone.",
      highlights: [
        "Lush green valleys and fewer crowds",
        "Ideal for Upper Mustang and Upper Dolpo",
        "Strong for cultural exploration",
        "Nar Phu and similar rain-shadow routes",
      ],
      condition: "Moderate (route-dependent)",
      imageUrl: "",
      visible: true,
    },
  ],
  summaryHeading: "Quick season summary",
  notesHeading: "How Summit Seek helps you choose",
  notes: [
    "The “best” month depends on altitude, region, and whether you want festivals, flowers, solitude, or summit pushes.",
    "Autumn and spring are the safest bets for classic Everest and Annapurna itineraries.",
    "Winter and monsoon work brilliantly when we match you to the right altitude and rain-shadow route.",
    "We build itineraries around weather windows, flights, and permit timing — not just a calendar label.",
  ],
  ctaHeading: "Ready to pick your season?",
  ctaBody: `Tell us your preferred month, trek length, and fitness. We will recommend the clearest window for your route. WhatsApp ${SITE.whatsappDisplay} or email ${SITE.email}.`,
  ctaPrimaryLabel: "Contact Summit Seek",
  ctaPrimaryHref: "/contact",
  ctaSecondaryLabel: "Travel insurance guide",
  ctaSecondaryHref: "/travel-guide/travel-insurance",
  metaTitle: "Best Time to Visit Nepal | Summit Seek Travels & Tours",
  metaDescription:
    "Find the best season to trek in Nepal — autumn, spring, winter, and monsoon guidance from Summit Seek Travels & Tours for clear peaks and smart itineraries.",
};
