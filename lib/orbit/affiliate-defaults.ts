import type { AffiliateContent } from "@/types/affiliate-cms";
import { SITE } from "@/lib/constants";

export const DEFAULT_AFFILIATE: AffiliateContent = {
  coverImageUrl:
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2000&q=80",
  coverTitle: "Affiliate Program",
  coverSubtitle:
    "Partner with Summit Seek Travels & Tours — earn commission by sharing Himalayan journeys your audience will love.",
  introEyebrow: "Partner with Summit Seek",
  introHeading: "Grow with Nepal’s most thoughtful Himalayan operator",
  introBody:
    "The Summit Seek Affiliate Program is built for travel creators, agents, bloggers, and community leaders who want to recommend Nepal treks with confidence. Share our itineraries, send travelers our way, and earn clear commission on confirmed bookings — backed by a Kathmandu team that delivers premium trail hospitality.",
  whatHeading: "What is a Summit Seek travel affiliate?",
  whatBody:
    "A Summit Seek affiliate is a trusted partner who promotes our treks, peak climbs, and Himalayan experiences through a unique referral link or code. When a guest books through your referral and completes a qualifying trip, you earn commission. Affiliates may work independently or through agencies — specializing in adventure travel, luxury treks, or destination content — using websites, social channels, newsletters, or private networks.",
  promoteHeading: "How to promote Summit Seek journeys",
  promoteIntro:
    "Choose the channels that fit your audience. We support partners with clear trip details, honest inclusions, and itineraries worth recommending.",
  promoteMethods: [
    {
      id: "pm1",
      title: "Website & blog",
      description:
        "Publish trek guides, season tips, and destination stories with your referral link woven into helpful, original content.",
      imageUrl: "",
      visible: true,
    },
    {
      id: "pm2",
      title: "Social media",
      description:
        "Share trail moments, packing tips, and trip highlights on Instagram, Facebook, YouTube, or TikTok with your unique code.",
      imageUrl: "",
      visible: true,
    },
    {
      id: "pm3",
      title: "Email & communities",
      description:
        "Feature Summit Seek departures in newsletters, private groups, or client lists who trust your travel recommendations.",
      imageUrl: "",
      visible: true,
    },
    {
      id: "pm4",
      title: "Influencer & creator collabs",
      description:
        "Partner with adventure voices who value safety-first planning and authentic Himalayan storytelling.",
      imageUrl: "",
      visible: true,
    },
    {
      id: "pm5",
      title: "SEO & content marketing",
      description:
        "Build long-form Nepal trek resources that rank — and convert — with transparent logistics your readers can trust.",
      imageUrl: "",
      visible: true,
    },
    {
      id: "pm6",
      title: "Paid & agency channels",
      description:
        "Run compliant ads or agency campaigns where allowed, following Summit Seek brand and advertising guidelines.",
      imageUrl: "",
      visible: true,
    },
  ],
  stepsHeading: "How to become a Summit Seek affiliate",
  stepsIntro: "A simple path from interest to earning — with a real Kathmandu desk behind every booking.",
  steps: [
    {
      id: "st1",
      title: "1. Apply",
      description:
        "Tell us who you are, your audience, and how you plan to promote. Share your website or social profiles when you apply.",
      imageUrl: "",
      visible: true,
    },
    {
      id: "st2",
      title: "2. Get approved",
      description:
        "We review fit, brand alignment, and reach. Once approved, you receive your unique referral link or code.",
      imageUrl: "",
      visible: true,
    },
    {
      id: "st3",
      title: "3. Promote",
      description:
        "Recommend trips that match your audience — Everest, Annapurna, peak climbs, luxury treks, or custom journeys.",
      imageUrl: "",
      visible: true,
    },
    {
      id: "st4",
      title: "4. Earn & track",
      description:
        "We track qualified bookings. Commissions are paid on the schedule agreed after onboarding — to your preferred account.",
      imageUrl: "",
      visible: true,
    },
  ],
  eligibilityHeading: "Who can join?",
  eligibilityBody:
    "Most adults with an audience — travel agents, bloggers, creators, educators, and community organizers — can apply. Some partners may need minimum traffic or follower quality; we care more about trust and accurate recommendations than raw numbers. Affiliates must follow local advertising and disclosure laws, and should be ready to help guests with clear, honest information — not just links.",
  commissionHeading: "Commission that rewards real bookings",
  commissionBody:
    "Summit Seek affiliates typically earn 10% commission on qualifying bookings, with rates up to 13% for larger groups (generally ten or more guests) when agreed in writing. Exact rates, payment intervals, and tracking details are confirmed during onboarding. Questions about commissions? Message us on WhatsApp or email — we are happy to clarify.",
  commissionRateLabel: "10%–13%",
  commissionRateNote: "Standard to group-boosted commission on qualifying Summit Seek bookings",
  termsHeading: "Affiliate program guidelines",
  termsPoints: [
    "Promote destinations and trip types that match your audience — we help tailor recommendations.",
    "Bookings are tracked through your referral link or code; earnings follow the agreed payout schedule.",
    "Commission rates and payment terms are confirmed in writing after approval.",
    "Use Summit Seek name, logo, and materials only as approved in brand guidelines.",
    "No false claims, spam, trademark bidding abuse, or misleading promotions.",
    "Respect cookie / tracking windows and guest privacy rules shared at onboarding.",
    "Either party may end the partnership per the written affiliate agreement.",
    "To cancel, send written notice by email; unused program access has no cash refund.",
  ],
  highlightHeading: "Recommend journeys worth taking",
  highlightBody:
    "Affiliates succeed when they send travelers to operators they trust. Summit Seek combines Kathmandu-based operations, safety-first itineraries, and hospitality that makes referrals feel proud — not risky.",
  highlightImageUrl: "",
  ctaHeading: "Ready to partner with Summit Seek?",
  ctaBody: `Apply via contact with “Affiliate Program” in your message. Include your name, country, website or socials, and how you plan to promote. We reply from ${SITE.email} or WhatsApp ${SITE.whatsappDisplay}.`,
  ctaPrimaryLabel: "Apply / Contact us",
  ctaPrimaryHref: "/contact",
  ctaSecondaryLabel: "Why Summit Seek",
  ctaSecondaryHref: "/why-summit-seek",
  metaTitle: "Affiliate Program | Summit Seek Travels & Tours",
  metaDescription:
    "Join the Summit Seek Affiliate Program — earn 10–13% commission promoting Himalayan treks and expeditions with a trusted Kathmandu-based operator.",
};
