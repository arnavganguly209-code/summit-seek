import type { FooterContent } from "@/types/footer-cms";
import {
  footerPartners,
  footerDestinations,
  footerTrekking,
  footerCompany,
  footerUseful,
} from "@/lib/data/footer";
import { SOCIAL } from "@/lib/constants";

export const DEFAULT_FOOTER: FooterContent = {
  topLogoUrl: "/logo-summit-seek-footer-top.png",
  brandLogoUrl: "/logo-summit-seek-white.png",
  brandTagline:
    "Unforgettable Himalayan adventures with expert local guides and trusted care across Nepal.",
  newsletterHeading: "Join Our Newsletter",
  newsletterDescription: "Trekking deals, travel inspiration and seasonal updates.",
  weAcceptLabel: "We Accept",
  travelersChoiceBadgeUrl: "/travelers-choice-badges.png",
  travelersChoiceHref: SOCIAL.tripadvisor,
  copyrightText: "© 2026 Summit Seek Travel. All rights reserved.",
  developedByLabel: "Developed By",
  developedByName: "The Global Orbit",
  developedByHref: "https://theglobalorbit.com/",
  partners: footerPartners.map((p) => ({
    id: p.id,
    label: p.label,
    href: p.href,
    logoUrl: p.logo,
    visible: true,
  })),
  payments: [
    { id: "visa", label: "Visa", imageUrl: "/payments/visa.svg", visible: true },
    {
      id: "mastercard",
      label: "Mastercard",
      imageUrl: "/payments/mastercard.svg",
      visible: true,
    },
    { id: "alipay", label: "Alipay", imageUrl: "/payments/alipay.svg", visible: true },
    {
      id: "unionpay",
      label: "UnionPay",
      imageUrl: "/payments/unionpay.svg",
      visible: true,
    },
    {
      id: "amex",
      label: "American Express",
      imageUrl: "/payments/amex.svg",
      visible: true,
    },
  ],
  destinations: footerDestinations.map(({ label, href }) => ({ label, href })),
  trekking: footerTrekking.map(({ label, href }) => ({ label, href })),
  company: footerCompany.map(({ label, href }) => ({ label, href })),
  useful: footerUseful.map(({ label, href }) => ({ label, href })),
};
