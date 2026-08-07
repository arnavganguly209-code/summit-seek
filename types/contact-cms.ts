export type ContactSocialLink = {
  id: string;
  label: string;
  href: string;
  visible: boolean;
};

export type ContactPageContent = {
  coverImageUrl: string;
  coverTitle: string;
  coverSubtitle: string;
  detailsHeading: string;
  detailsIntro: string;
  addressLabel: string;
  address: string;
  emailLabel: string;
  email: string;
  phoneLabel: string;
  phone: string;
  phoneDisplay: string;
  whatsappLabel: string;
  whatsapp: string;
  whatsappDisplay: string;
  hoursLabel: string;
  hours: string;
  socialHeading: string;
  socials: ContactSocialLink[];
  formHeading: string;
  formIntro: string;
  mapHeading: string;
  mapEmbedUrl: string;
  metaTitle: string;
  metaDescription: string;
};
