import type { PrivacyContent } from "@/types/privacy-cms";
import { SITE } from "@/lib/constants";

export const DEFAULT_PRIVACY: PrivacyContent = {
  coverImageUrl:
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=2000&q=80",
  coverTitle: "Privacy Policy",
  coverSubtitle:
    "How Summit Seek Travels & Tours collects, uses, and protects your personal information.",
  introEyebrow: SITE.legalName,
  introHeading: "Your privacy stays with us — never for sale",
  introBody: `${SITE.legalName} respects your privacy. We do not rent or sell your personal details to third parties for their marketing. Information you share helps us plan safe, accurate Himalayan journeys and stay in touch about your trip. Misuse of guest data is not how we work.`,
  sections: [
    {
      id: "p1",
      title: "Why we collect your information",
      body: `We use personal details only for clear trip and service purposes — never for casual sharing.\n\nTypical information includes:\n- Name, address, phone, and email\n- Passport details needed for permits and identification\n- Trip preferences, dietary needs, and emergency contacts you provide\n- Booking and payment confirmation records (not full card numbers)\n\nIf you book with us, we may ask for additional documents solely for operations (permits, lodge lists, flights). You can request updates by emailing ${SITE.email}.`,
      visible: true,
    },
    {
      id: "p2",
      title: "Where we store data",
      body: `Guest records are stored securely in our business systems and, where needed, as controlled paper files at our Kathmandu office.\n\n- Payment card transactions are processed with encryption via our payment partners. We do not store full card numbers in our own database.\n- If we issue account access credentials, keep passwords private.\n- Internet transmission is never risk-free; we take reasonable steps to protect data once received.\n- Some processing may involve trusted service providers (hosting, email, payment, analytics) under confidentiality expectations.\n\nBy sharing data with us for a booking, you consent to storage and processing needed to deliver that journey, consistent with this policy.`,
      visible: true,
    },
    {
      id: "p3",
      title: "Safeguards & access",
      body: `We apply practical technical and organizational measures to reduce unauthorized access, loss, or misuse of personal data.\n\n- Access inside Summit Seek is limited to team members who need it for your trip or support.\n- Credit card details are not retained in our CMS after gateway checkout.\n- No security system is perfect; we work continuously to keep systems current and staff briefed.`,
      visible: true,
    },
    {
      id: "p4",
      title: "How long we keep data",
      body: `We keep personal data while we need it to deliver services, meet legal and accounting duties, resolve disputes, and enforce agreements.\n\nWhen data is no longer required for those purposes, we delete or anonymize it where practical. You may request deletion by emailing us with your name, contact email, and a clear instruction to delete personal data we hold about you — subject to legal retention requirements.`,
      visible: true,
    },
    {
      id: "p5",
      title: "Your choices & rights",
      body: `You may ask us not to use your contact details for marketing. Use our contact form or email ${SITE.email} at any time.\n\nOur site may link to third-party websites. Those sites have their own privacy practices; we are not responsible for them. Review their policies before sharing information there.\n\nWe may use analytics tools (such as Google Analytics) to understand anonymous traffic patterns — pages visited, approximate location, and timing — so we can improve the website experience.`,
      visible: true,
    },
    {
      id: "p6",
      title: "Cookies",
      body: `We use cookies and similar technologies to keep the site working well and to understand visit patterns. Cookies help recognize returning browsers and improve navigation. You can control cookies through your browser settings; disabling some cookies may affect site features.`,
      visible: true,
    },
    {
      id: "p7",
      title: "Third-party links & legal disclosure",
      body: `Links on our site are for convenience. We do not control third-party content, products, or privacy practices. Information you give those sites is at your own risk.\n\nWe may disclose personal information if required by law or in good faith to comply with a valid legal process served on Summit Seek.`,
      visible: true,
    },
    {
      id: "p8",
      title: "Policy updates",
      body: `We may update this Privacy Policy as our services or legal obligations change. The version published on this page applies to new use of the site and new bookings unless otherwise agreed in writing.\n\nQuestions? Contact ${SITE.legalName} at ${SITE.address}, email ${SITE.email}, or WhatsApp ${SITE.whatsappDisplay}.\n\nThis policy does not cover organizations we do not own or control, or people we do not employ.`,
      visible: true,
    },
  ],
  ctaHeading: "Questions about your data?",
  ctaBody: `Ask us anytime — we will explain what we hold and how it is used for your journey. Email ${SITE.email} or message WhatsApp ${SITE.whatsappDisplay}.`,
  ctaPrimaryLabel: "Contact Summit Seek",
  ctaPrimaryHref: "/contact",
  ctaSecondaryLabel: "Terms & Conditions",
  ctaSecondaryHref: "/terms",
  metaTitle: "Privacy Policy | Summit Seek Travels & Tours",
  metaDescription:
    "Read how Summit Seek Travels & Tours collects, stores, and protects personal information for Himalayan trek bookings — privacy-first, never sold.",
};
