export type FooterPartner = {
  id: string;
  label: string;
  href: string;
  logoUrl: string;
  visible: boolean;
};

export type FooterPayment = {
  id: string;
  label: string;
  imageUrl: string;
  visible: boolean;
};

export type FooterLinkItem = {
  label: string;
  href: string;
};

export type FooterContent = {
  topLogoUrl: string;
  brandLogoUrl: string;
  brandTagline: string;
  newsletterHeading: string;
  newsletterDescription: string;
  weAcceptLabel: string;
  travelersChoiceBadgeUrl: string;
  travelersChoiceHref: string;
  copyrightText: string;
  developedByLabel: string;
  developedByName: string;
  developedByHref: string;
  partners: FooterPartner[];
  payments: FooterPayment[];
  destinations: FooterLinkItem[];
  trekking: FooterLinkItem[];
  company: FooterLinkItem[];
  useful: FooterLinkItem[];
};
