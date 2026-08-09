import type { NepalVisaContent } from "@/types/nepal-visa-cms";
import { SITE } from "@/lib/constants";

export const DEFAULT_NEPAL_VISA: NepalVisaContent = {
  coverImageUrl:
    "https://images.unsplash.com/photo-1544735716-392fe2c6ce19?auto=format&fit=crop&w=2000&q=80",
  coverTitle: "Nepal Visa Guide",
  coverSubtitle:
    "Clear tourist visa fees, entry points, and extension rules — so your Summit Seek journey starts smoothly.",
  introEyebrow: "Travel Info",
  introHeading: "How to get a Nepal tourist visa",
  introBody:
    "Most travelers obtain a Nepal tourist visa on arrival at Tribhuvan International Airport (Kathmandu) or at approved land border immigration posts. You can also apply in advance at a Nepalese embassy or consulate. Summit Seek shares current fee guidance below — always confirm official rates before travel, as immigration rules can change.",
  alertText:
    "Citizens of some countries (including Nigeria, Ghana, Afghanistan, Zimbabwe, Somalia, Cameroon, Eswatini/Swaziland, Iraq, Ethiopia, Liberia, Palestine, and others as listed by Nepal Immigration) may not receive visas at entry points. Check the Department of Immigration of Nepal before you fly.",
  requirementsHeading: "What you need for a visa on arrival",
  requirementsIntro:
    "Prepare these items before you reach the immigration counter. Completing the online form ahead of time saves queue time.",
  requirements: [
    {
      id: "req1",
      title: "Valid passport",
      description:
        "At least six months validity from your entry date, plus a blank page for the visa stamp.",
      visible: true,
    },
    {
      id: "req2",
      title: "Online visa application",
      description:
        "Complete the official Nepal Immigration online form before arrival. Applications stay in the system for 15 days — submit within 15 days of your entry date.",
      visible: true,
    },
    {
      id: "req3",
      title: "Visa fee payment",
      description:
        "Pay the tourist visa fee as directed by immigration (cash or accepted card methods at the counter — policies can vary by entry point).",
      visible: true,
    },
    {
      id: "req4",
      title: "Nepal address for the form",
      description:
        "Use your first hotel or lodge address in Kathmandu (or your trek start town). Summit Seek can share your booked hotel details after confirmation.",
      visible: true,
    },
  ],
  entryPointsHeading: "Main immigration entry points",
  entryPoints: [
    "Tribhuvan International Airport, Kathmandu (TIA)",
    "Eastern Nepal — Kakarbhitta, Jhapa",
    "Central Nepal — Birgunj, Parsa",
    "Northern border — Kodari, Sindhupalchowk",
    "Western — Belahiya / Bhairahawa, Rupandehi",
    "Mid-western — Jamunaha / Nepalgunj, Banke",
    "Far-western — Mohana / Dhangadhi (Kailali) and Gaddachauki / Mahendranagar (Kanchanpur)",
  ],
  feesHeading: "Tourist visa fees",
  feesIntro:
    "Fees are typically payable in USD or equivalent convertible currency. Rates below reflect commonly published tourist visa prices — confirm at immigration or the official portal before travel.",
  fees: [
    {
      id: "fee15",
      label: "15-day tourist visa",
      price: "USD 30",
      note: "Or equivalent convertible currency",
      visible: true,
    },
    {
      id: "fee30",
      label: "30-day tourist visa",
      price: "USD 50",
      note: "Or equivalent convertible currency",
      visible: true,
    },
    {
      id: "fee90",
      label: "90-day tourist visa",
      price: "USD 125",
      note: "Or equivalent convertible currency",
      visible: true,
    },
    {
      id: "feesaarc",
      label: "SAARC nationals",
      price: "Free (up to 30 days)",
      note: "Confirm eligibility and documents at immigration",
      visible: true,
    },
    {
      id: "feeindia",
      label: "Indian nationals",
      price: "No visa required",
      note: "Carry valid ID (passport / voter ID / citizenship). Air arrivals need valid ID; children under 10 may need a birth certificate.",
      visible: true,
    },
  ],
  extensionHeading: "Visa extension",
  extensionBody:
    "Extensions are handled through Nepal Immigration offices (commonly Kathmandu / Pokhara).\n\n- Extension of 15 days or less: typically USD 30 (or equivalent).\n- Beyond 15 days: commonly USD 2 per day after the first 15-day extension block.\n- Maximum stay on a tourist visa is generally up to 150 days in a visa year (January–December).\n\nBring your passport, current visa, and any forms requested by immigration. Summit Seek can advise on timing around your trek dates.",
  transitHeading: "Transit visa",
  transitBody:
    "If you land in Nepal only for transit or an unexpected stopover, a short transit visa (often one day) may be available for about USD 5 or equivalent — subject to immigration approval and current rules.",
  addressHeading: "Address tip for the online form",
  addressBody:
    "The online application asks for your address in Nepal. Use the hotel where you will spend your first night. After you book with Summit Seek, we send your Kathmandu hotel name and address so the form matches your itinerary.",
  notesHeading: "Important visa notes",
  notes: [
    "Entering or staying in Nepal without a valid visa is illegal.",
    "Tourist visas can be obtained at embassies/consulates abroad or at listed Nepal immigration entry points (where eligible).",
    "Once issued, visas are generally not amended; fees are typically non-refundable.",
    "Children under 10 may be fee-exempt but still need a valid visa — confirm current child rules.",
    "If you renew a passport mid-trip, contact Immigration about document transfer.",
    "Carry your passport (and permits) while trekking — checkpoints may ask to see them.",
    "Respect local culture, restricted filming zones, and laws throughout your stay.",
  ],
  ctaHeading: "Planning dates around your visa?",
  ctaBody: `Tell Summit Seek your arrival date and trek length. We help you choose the right visa duration and keep permit timing aligned. WhatsApp ${SITE.whatsappDisplay} or email ${SITE.email}.`,
  ctaPrimaryLabel: "Contact Summit Seek",
  ctaPrimaryHref: "/contact",
  ctaSecondaryLabel: "Trekking permits guide",
  ctaSecondaryHref: "/travel-guide/permits-tims",
  metaTitle: "Nepal Visa Guide | Summit Seek Travels & Tours",
  metaDescription:
    "Nepal tourist visa fees, on-arrival requirements, entry points, and extension rules — practical guidance from Summit Seek Travels & Tours.",
};
