import type { HealthSafetyContent } from "@/types/health-safety-cms";
import { SITE } from "@/lib/constants";

export const DEFAULT_HEALTH_SAFETY: HealthSafetyContent = {
  coverImageUrl:
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80",
  coverTitle: "Health & Safety",
  coverSubtitle:
    "Altitude awareness, hygiene, guides, and emergency readiness — how Summit Seek keeps Himalayan journeys careful and confident.",
  introEyebrow: "Travel Info",
  introHeading: "Safe adventure starts before the first step",
  introBody:
    "Himalayan travel rewards preparation. Summit Seek designs itineraries with acclimatization, licensed guides, and clear emergency plans so you can focus on the mountains — not on worry. Share any medical history with us before departure so we can support you properly on trail.",
  alertText:
    "This page is practical guidance, not medical advice. Consult your doctor before high-altitude travel, especially if you have heart, lung, or blood-pressure conditions.",
  topicsHeading: "How we protect your journey",
  topicsIntro:
    "From guide training to food hygiene and weather decisions — these are the pillars behind every Summit Seek trek.",
  topics: [
    {
      id: "hs1",
      title: "Licensed guides who watch the group",
      description:
        "Our guides know the routes, weather patterns, and local protocols. They pace the day, check how you feel, and adjust plans when safety requires it.",
      points: [
        "Route and weather awareness",
        "Continuous guest wellbeing checks",
        "Clear communication in English and Nepali",
      ],
      visible: true,
    },
    {
      id: "hs2",
      title: "Altitude awareness & acclimatization",
      description:
        "Most people do well with gradual ascent. We build rest days where needed and train guides to spot early altitude symptoms.",
      points: [
        "Walk at a comfortable pace",
        "Drink regularly and eat well",
        "Tell your guide about headache, nausea, or unusual fatigue immediately",
      ],
      visible: true,
    },
    {
      id: "hs3",
      title: "Health preparation before travel",
      description:
        "Arrive fit for your chosen trek difficulty. Bring personal medications and a small first-aid kit — pharmacies thin out above the cities.",
      points: [
        "Doctor consult for pre-existing conditions",
        "Notify Summit Seek of medical needs in advance",
        "Carry prescriptions and spare medication",
      ],
      visible: true,
    },
    {
      id: "hs4",
      title: "Food, water & hygiene",
      description:
        "Use purified or treated water on the trail. Practice hand hygiene and tell us about dietary needs before the trip so lodges can prepare.",
      points: [
        "Prefer boiled, filtered, or tablet-treated water",
        "Hand sanitizer and wet wipes help in remote lodges",
        "Share allergies and diet requirements early",
      ],
      visible: true,
    },
    {
      id: "hs5",
      title: "Emergency support",
      description:
        "Serious incidents are uncommon, but mountain travel needs a plan. We coordinate with local services and arrange evacuation support when insurance and conditions allow.",
      points: [
        "Stay in contact where signal exists",
        "Helicopter rescue depends on weather and insurance",
        "Carry insurer contacts and policy number",
      ],
      visible: true,
    },
    {
      id: "hs6",
      title: "Weather flexibility",
      description:
        "Mountain weather shifts fast. Guides may delay starts, change routes, or turn around when conditions threaten safety — flexibility is part of responsible trekking.",
      points: [
        "Expect possible schedule changes",
        "Trust guide decisions on trail",
        "Pack layers for cold, wind, and rain",
      ],
      visible: true,
    },
  ],
  tipsHeading: "Simple habits that keep you strong",
  tips: [
    "Sleep well the night before long ascent days.",
    "Avoid alcohol at altitude and limit caffeine if it dehydrates you.",
    "Dress in layers — remove a layer before you overheat, add one before you chill.",
    "Follow guide instructions and local customs.",
    "Buy travel insurance that covers helicopter evacuation and your trek’s max elevation.",
  ],
  notesHeading: "Before you leave Kathmandu",
  notes: [
    "Confirm vaccines and personal meds with your physician.",
    "Share emergency contacts and insurance details with Summit Seek.",
    "Pack a headlamp, blister care, sunscreen SPF 50+, and lip balm with SPF.",
    "Download offline maps only as backup — your guide leads the route.",
  ],
  ctaHeading: "Tell us your health questions",
  ctaBody: `Message Summit Seek with your trek name and any medical concerns. WhatsApp ${SITE.whatsappDisplay} or email ${SITE.email}.`,
  ctaPrimaryLabel: "Contact Summit Seek",
  ctaPrimaryHref: "/contact",
  ctaSecondaryLabel: "Travel insurance guide",
  ctaSecondaryHref: "/travel-guide/travel-insurance",
  metaTitle: "Health & Safety for Nepal Trekking | Summit Seek",
  metaDescription:
    "Altitude awareness, hygiene, guides, and emergency readiness for Nepal treks — Summit Seek’s practical health and safety guide.",
};
