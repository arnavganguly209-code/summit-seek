import type { TravelInsuranceContent } from "@/types/travel-insurance-cms";
import { SITE } from "@/lib/constants";

export const DEFAULT_TRAVEL_INSURANCE: TravelInsuranceContent = {
  coverImageUrl:
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=80",
  coverTitle: "Travel Insurance",
  coverSubtitle:
    "Helicopter evacuation and high-altitude medical cover — the protection every Himalayan trekker should confirm before departure.",
  introEyebrow: "Travel Info",
  introHeading: "Insure the mountains before you walk them",
  introBody:
    "Summit Seek strongly recommends comprehensive travel insurance for every guest. The Himalaya are remote — if altitude illness or injury occurs, helicopter evacuation is often the only fast option. Insurance is not usually mandatory to book, but it is one of the most important preparations you can make.",
  alertText:
    "Summit Seek does not sell travel insurance. Purchase a policy yourself well before departure, and confirm in writing that it covers helicopter rescue and the maximum elevation on your itinerary.",
  mustHaveHeading: "What your policy must include",
  mustHaveIntro:
    "Before you trek with us, double-check these benefits. Policies vary by country and plan level — read the fine print.",
  mustHaveItems: [
    {
      id: "mi1",
      title: "Emergency helicopter evacuation",
      description:
        "Air rescue from trail or lodge to hospital — essential above remote valleys where road access is limited.",
      visible: true,
    },
    {
      id: "mi2",
      title: "High-altitude medical cover",
      description:
        "Coverage up to at least 6,000 m (or higher if your trek / climb goes beyond that).",
      visible: true,
    },
    {
      id: "mi3",
      title: "Hospital & treatment costs",
      description:
        "Medical care, hospital stays, and related treatment after an incident on or off the trail.",
      visible: true,
    },
    {
      id: "mi4",
      title: "Trip interruption / cancellation",
      description:
        "Protection if illness, injury, or covered events force you to cancel or cut short the journey.",
      visible: true,
    },
  ],
  altitudeHeading: "Match cover to your highest point",
  altitudeBody:
    "Many Summit Seek treks travel between about 3,500 m and 5,600 m. Peak climbs and some remote routes go higher. Your policy must explicitly cover the maximum elevation on your confirmed itinerary — not just “trekking in Nepal” in general.",
  providersHeading: "Providers travelers often compare",
  providersIntro:
    "Past guests have used the companies below as starting points by region. This is reference only — not an endorsement. Always verify altitude, helicopter, and exclusion clauses yourself.",
  providerGroups: [
    {
      id: "pg1",
      region: "USA & Canada",
      providers:
        "Tugo, World Nomads (Explore Plan – Level 3), Blue Cross, BHTP, Travelex, InsureMyTrip",
      visible: true,
    },
    {
      id: "pg2",
      region: "Australia & New Zealand",
      providers: "Allianz Australia, NIB Insurance, Fast Cover, Cover-More, OneCover",
      visible: true,
    },
    {
      id: "pg3",
      region: "United Kingdom",
      providers: "Snowcard, Allianz, Direct Line, BMC (British Mountaineering Council)",
      visible: true,
    },
    {
      id: "pg4",
      region: "Europe",
      providers: "Alpenverein Edelweiss, Allianz Europe",
      visible: true,
    },
    {
      id: "pg5",
      region: "Singapore",
      providers: "Income Travel Insurance, World Nomads (Explore Plan – Level 3)",
      visible: true,
    },
    {
      id: "pg6",
      region: "South Africa",
      providers: "Quantum Insurance, MSO Insurance",
      visible: true,
    },
    {
      id: "pg7",
      region: "Taiwan",
      providers: "Fubon Insurance, World Nomads",
      visible: true,
    },
    {
      id: "pg8",
      region: "Global options",
      providers: "Genki Traveler, AXA Travel Insurance, Allianz Travel Insurance, World Nomads",
      visible: true,
    },
  ],
  disclaimerHeading: "Important declaration",
  disclaimerBody:
    "Provider names are listed from traveler feedback for convenience only. Summit Seek is not affiliated with these insurers and accepts no responsibility for policy terms, claims, or coverage gaps. Review every policy carefully — especially helicopter evacuation, maximum elevation, adventure-sport exclusions, and pre-existing conditions.",
  notesHeading: "Before you fly to Kathmandu",
  notes: [
    "Buy insurance early — some plans need purchase soon after booking flights or the trek.",
    "Save digital and paper copies of your policy and emergency contacts.",
    "Share your insurer name, policy number, and 24/7 assistance phone with Summit Seek before departure.",
    "If your trek changes to a higher peak or pass, re-check altitude limits before you start.",
  ],
  ctaHeading: "Questions about altitude cover?",
  ctaBody: `Tell us your trek name and we will confirm the highest point so you can check your policy. WhatsApp ${SITE.whatsappDisplay} or email ${SITE.email}.`,
  ctaPrimaryLabel: "Contact Summit Seek",
  ctaPrimaryHref: "/contact",
  ctaSecondaryLabel: "Best time to visit",
  ctaSecondaryHref: "/travel-guide/best-time-to-visit",
  metaTitle: "Travel Insurance for Nepal Trekking | Summit Seek",
  metaDescription:
    "What travel insurance you need for Nepal trekking — helicopter evacuation, high-altitude medical cover, and provider references from Summit Seek Travels & Tours.",
};
