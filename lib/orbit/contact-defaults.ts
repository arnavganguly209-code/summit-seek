import type { ContactPageContent } from "@/types/contact-cms";
import { SITE, SOCIAL } from "@/lib/constants";

export const DEFAULT_CONTACT: ContactPageContent = {
  coverImageUrl:
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80",
  coverTitle: "Contact Us",
  coverSubtitle: "Plan your Himalayan journey with our Kathmandu-based trekking specialists.",
  detailsHeading: "Get in Touch",
  detailsIntro:
    "Reach Summit Seek for trek planning, custom itineraries, permits, and on-ground support across Nepal.",
  addressLabel: "Office",
  address: SITE.address,
  emailLabel: "Email",
  email: SITE.email,
  phoneLabel: "Phone",
  phone: SITE.phone,
  phoneDisplay: SITE.phoneDisplay,
  whatsappLabel: "WhatsApp",
  whatsapp: SITE.whatsapp,
  whatsappDisplay: SITE.whatsappDisplay,
  hoursLabel: "Office Hours",
  hours: "Sun – Fri · 9:00 AM – 6:00 PM (NPT)",
  socialHeading: "Follow Us",
  socials: [
    { id: "facebook", label: "Facebook", href: SOCIAL.facebook, visible: true },
    { id: "instagram", label: "Instagram", href: SOCIAL.instagram, visible: true },
    { id: "tiktok", label: "TikTok", href: SOCIAL.tiktok, visible: true },
  ],
  formHeading: "Send a Message",
  formIntro: "Tell us about your trek, dates, and group size — we’ll reply within 24 hours.",
  mapHeading: "Find Us in Kathmandu",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Thamel%2C%20Kathmandu%2C%20Nepal&z=15&output=embed",
  metaTitle: "Contact Us",
  metaDescription:
    "Contact Summit Seek Travels & Tours in Thamel, Kathmandu. Call +977-9823526833 for trek bookings and Himalayan travel support.",
};
