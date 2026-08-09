import type { PackingChecklistContent } from "@/types/packing-checklist-cms";
import { SITE } from "@/lib/constants";

export const DEFAULT_PACKING_CHECKLIST: PackingChecklistContent = {
  coverImageUrl:
    "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=2000&q=80",
  coverTitle: "Packing Checklist",
  coverSubtitle:
    "Layered clothing, broken-in boots, documents, and trail essentials — a clear Nepal packing list shaped for Summit Seek treks.",
  introEyebrow: "Travel Info",
  introHeading: "Pack light. Pack right. Trek better.",
  introBody:
    "Great Himalayan packing is about layers and priorities — not filling every corner of your bag. Season, max altitude, and trek length change the mix. Most teahouse treks work best with a layered clothing system, broken-in boots, a daypack, and a duffel within the porter weight limit (usually about 15 kg / 33 lb).",
  alertText:
    "We finalize a route-specific gear note after you book. Rent bulky items like sleeping bags or down jackets in Kathmandu if you prefer not to fly with them.",
  categoriesHeading: "Core packing categories",
  categoriesIntro:
    "Use this as your master checklist. Tick what you already own, then fill gaps in Thamel before departure.",
  categories: [
    {
      id: "pk1",
      title: "Clothing layers",
      description: "A layer system beats one heavy jacket.",
      items: [
        "Moisture-wicking base layers (top & bottom)",
        "Mid-layer fleece or softshell",
        "Insulated down / synthetic jacket",
        "Waterproof & windproof shell jacket",
        "Trekking pants (1–2) + lightweight trousers for evenings",
        "Warm hat, sun hat, gloves, buff / neck gaiter",
      ],
      visible: true,
    },
    {
      id: "pk2",
      title: "Footwear",
      description: "Boot fit problems end more trips than weather.",
      items: [
        "Broken-in waterproof hiking boots with ankle support",
        "Camp shoes or sandals for lodges",
        "3–4 pairs trekking socks (wool / synthetic)",
        "Gaiters (useful in snow or muddy monsoon lower trails)",
      ],
      visible: true,
    },
    {
      id: "pk3",
      title: "Sleeping & carrying",
      description: "Confirm what Summit Seek provides on your package.",
      items: [
        "Sleeping bag rated for sub-freezing nights (or rent locally)",
        "Duffel bag for porter-carried gear",
        "30–35L daypack with hip belt",
        "Trekking poles (highly useful on descents)",
        "Dry bags / pack liners for rain protection",
      ],
      visible: true,
    },
    {
      id: "pk4",
      title: "Health & sun protection",
      description: "Altitude, UV, and blisters deserve space in the kit.",
      items: [
        "Personal medications + basic first-aid",
        "Altitude medication only if prescribed by your doctor",
        "Water purification tablets / filter bottle",
        "Sunscreen SPF 50+, lip balm with SPF",
        "Sunglasses (category 3–4 for high glare)",
        "Hand sanitizer, wet wipes, blister care",
      ],
      visible: true,
    },
    {
      id: "pk5",
      title: "Documents",
      description: "Carry paper and digital copies.",
      items: [
        "Passport (6+ months validity) + photocopies",
        "Nepal visa details / arrival paperwork",
        "Travel insurance policy (helicopter + max elevation)",
        "Passport photos for permits",
        "Summit Seek trip confirmation & emergency contacts",
      ],
      visible: true,
    },
    {
      id: "pk6",
      title: "Trail accessories",
      description: "Small items that make long days smoother.",
      items: [
        "Headlamp + spare batteries",
        "Two 1L water bottles or soft flasks",
        "Power bank + charging cables",
        "Quick-dry towel, toiletries (biodegradable where possible)",
        "Earplugs, lightweight snacks for the daypack",
      ],
      visible: true,
    },
  ],
  tipsHeading: "Season & altitude tips",
  tips: [
    "Below 3,000 m: light layers and strong sun protection.",
    "3,000–4,000 m: add warm fleece, wind shell, hat and gloves for mornings.",
    "Above 4,000 m: full layering — base, insulation, down, waterproof shell.",
    "Winter and late autumn need heavier insulation even on classic routes.",
    "Monsoon lower trails: prioritize waterproof shells and quick-dry clothing.",
  ],
  notesHeading: "Rent vs bring",
  notes: [
    "Bring from home: broken-in boots, personal meds, base layers, socks, documents.",
    "Often rent in Kathmandu: sleeping bag, down jacket, poles (if needed).",
    "Buy locally: water bottles, snacks, simple toiletries, spare gloves or hats.",
    "Ask Summit Seek what your package already includes before buying duplicates.",
  ],
  ctaHeading: "Want a checklist for your exact trek?",
  ctaBody: `Share your route and travel month — we will refine this list for altitude and season. WhatsApp ${SITE.whatsappDisplay} or email ${SITE.email}.`,
  ctaPrimaryLabel: "Contact Summit Seek",
  ctaPrimaryHref: "/contact",
  ctaSecondaryLabel: "Best time to visit",
  ctaSecondaryHref: "/travel-guide/best-time-to-visit",
  metaTitle: "Nepal Trekking Packing Checklist | Summit Seek",
  metaDescription:
    "Practical Nepal trekking packing list — clothing layers, footwear, documents, health kit, and season tips from Summit Seek.",
};
