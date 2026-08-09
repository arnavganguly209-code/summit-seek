import type { TermsContent } from "@/types/terms-cms";
import { SITE } from "@/lib/constants";

export const DEFAULT_TERMS: TermsContent = {
  coverImageUrl:
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=80",
  coverTitle: "Terms & Conditions",
  coverSubtitle:
    "Clear booking rules for Summit Seek Travels & Tours — so every Himalayan journey starts with mutual trust.",
  introEyebrow: SITE.legalName,
  introHeading: "Booking terms for Summit Seek journeys",
  introBody: `${SITE.legalName} is a Kathmandu-based trekking and adventure company. These Terms & Conditions apply to services arranged through our website, email, WhatsApp, or office. By browsing, booking, or traveling with us, you confirm that you have read and agree to the terms below. Policies may be updated; the version published here applies to new bookings unless otherwise agreed in writing.`,
  sections: [
    {
      id: "t1",
      title: "Bookings & confirmation",
      body: `Bookings are arrangements for a future trek, climb, or tour with Summit Seek. A booking becomes a contract when we send written confirmation (email or invoice).\n\n- We recommend booking as early as practical for permits, lodges, and preferred dates.\n- Full payment is required before the trip starts, unless a different schedule is confirmed in writing.\n- Last-minute Nepal departures may be accepted when logistics allow and full payment is completed in time — typically within 24 hours of departure for qualifying Nepal trips.\n- Some multi-country or permit-heavy itineraries may not accept last-minute bookings.`,
      visible: true,
    },
    {
      id: "t2",
      title: "Payment policy",
      body: `Trip prices on our site are typically quoted in US dollars (USD). Payments may be made in currencies accepted under Nepali banking practice.\n\nAccepted methods generally include:\n- Cash (where arranged)\n- Credit / debit card (overseas-capable cards)\n- Bank transfer\n- Secure online payment links we provide\n\nCard payments may include a processing fee (commonly around 4%) charged by the payment provider. Bank details and payment instructions are shared at booking. Online payments use trusted banking / gateway partners.`,
      visible: true,
    },
    {
      id: "t3",
      title: "Client cancellation",
      body: `If you need to cancel, email us with a clear reason. Refunds follow the schedule in your confirmation; the outline below is typical unless your invoice states otherwise.\n\n- A deposit portion may be non-refundable once booking is confirmed.\n- Cancellations close to departure may incur higher fees to cover permits, lodges, and staff commitments.\n- After a trip has started, unused services (lodging, meals, transport, permits) are generally non-refundable.\n- Voluntary dropout mid-trek does not create a refund entitlement for unused days.\n- Approved refunds are processed promptly; bank timelines often take 7–10 working days.`,
      visible: true,
    },
    {
      id: "t4",
      title: "Postponement, transfer & flexible dates",
      body: `Life and weather change plans. Written notice is required for postponements or name transfers.\n\n- For many Nepal trips, notify us as early as possible — ideally 20–30 days before departure.\n- Transferring a booking to another traveler may be allowed when documents and fitness requirements are met.\n- Flexible rebooking may be offered when you notify us in advance (often at least 7 days before departure) and spaces / permits allow — subject to any price difference on the new dates.\n- Tibet / restricted or special-permit itineraries may carry higher reschedule fees and longer notice windows.`,
      visible: true,
    },
    {
      id: "t5",
      title: "Company changes, force majeure & itinerary",
      body: `Safety comes first. Guides and operations may alter routes, lodges, or timing for weather, landslides, strikes, flight issues, government rules, or medical need.\n\n- If we must cancel or materially change a trip due to events beyond our control, we will work with you on a rebook or fair resolution under company policy.\n- Extra costs from delays outside our control (flights, road blocks, evacuations beyond inclusions) are generally the traveler’s responsibility unless stated otherwise.\n- Twin-share lodging is standard on many packages; single supplements apply when a share is not available.`,
      visible: true,
    },
    {
      id: "t6",
      title: "Passports, visas & documents",
      body: `Travelers must hold a passport valid at least six months beyond the return date and obtain any required Nepal (or other country) visas, permits, and insurance documents.\n\n- Visa fees and related costs are the traveler’s responsibility.\n- Required documents must be provided to authorities and to Summit Seek as requested before departure.`,
      visible: true,
    },
    {
      id: "t7",
      title: "Health, fitness & special requirements",
      body: `Disclose medical conditions, mobility limits, pregnancy, or other factors that affect high-altitude travel at the time of booking.\n\n- Failure to disclose material conditions may lead to refusal to travel and forfeiture under cancellation rules.\n- Special dietary or facility requests are accommodated where possible but are not guaranteed unless confirmed in writing.\n- Medical standards vary by region; we do not warrant local facility quality.`,
      visible: true,
    },
    {
      id: "t8",
      title: "Children & minors",
      body: `Travelers under 16 must be accompanied by a legal guardian. Unaccompanied minors under 16 are not accepted. Guardians are responsible for minors’ gear and conduct. Child pricing, when offered, follows the rate confirmed on your invoice.`,
      visible: true,
    },
    {
      id: "t9",
      title: "Insurance",
      body: `Comprehensive travel and medical insurance — including helicopter evacuation where relevant, accident cover, and trip interruption — is strongly recommended and is not included in trip price unless explicitly stated.`,
      visible: true,
    },
    {
      id: "t10",
      title: "Risks, liability & publicity",
      body: `Adventure travel involves inherent risk. Summit Seek plans carefully but is not liable for accidents, losses, delays, or natural events beyond reasonable control. Additional costs from such events are generally borne by the traveler.\n\nUnless you opt out in writing, we may use trip photos for marketing. Tell us before departure if you prefer not to appear in publicity.`,
      visible: true,
    },
    {
      id: "t11",
      title: "Complaints, privacy & acceptance",
      body: `Raise issues with your guide promptly so we can help on the ground. After the trip, feedback helps us improve.\n\nDocuments you share are used for legal and operational purposes and are handled with care. Booking directly with Summit Seek means these terms apply; third-party agents may have additional terms of their own.`,
      visible: true,
    },
    {
      id: "t12",
      title: "Governing law",
      body: `These terms are governed by the laws of Nepal. Disputes are subject to the competent courts in Kathmandu, Nepal, unless mandatory consumer law in your home country requires otherwise.`,
      visible: true,
    },
  ],
  ctaHeading: "Questions about booking terms?",
  ctaBody: `Our Kathmandu team can clarify deposits, cancellations, and inclusions before you commit. Reach us at ${SITE.email} or WhatsApp ${SITE.whatsappDisplay}.`,
  ctaPrimaryLabel: "Contact Summit Seek",
  ctaPrimaryHref: "/contact",
  ctaSecondaryLabel: "Payment details",
  ctaSecondaryHref: "/payment",
  metaTitle: "Terms & Conditions | Summit Seek Travels & Tours",
  metaDescription:
    "Read Summit Seek Travels & Tours booking terms — payments, cancellations, postponements, insurance, liability, and traveler responsibilities for Himalayan journeys.",
};
