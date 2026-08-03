export type WhatWeOfferCard = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  imageUrl: string;
  ctaLabel: string;
  visible: boolean;
};

export type WhatWeOfferContent = {
  eyebrow: string;
  heading: string;
  description: string;
  cards: WhatWeOfferCard[];
  visible: boolean;
};
