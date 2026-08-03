export type TravelerReviewItem = {
  id: string;
  title: string;
  body: string;
  rating: number;
  author: string;
  country: string;
  date: string;
  initial: string;
  visible: boolean;
};

export type ReviewPlatform = {
  id: string;
  name: string;
  href: string;
};

export type TravelerReviewsContent = {
  /** Glass promo banner (replaces green block in reference) */
  promoEyebrow: string;
  promoHeading: string;
  promoDescription: string;
  promoCtaLabel: string;
  promoCtaHref: string;
  promoImageUrl: string;
  promoVideoLabel: string;
  promoVideoHref: string;
  promoVisible: boolean;

  eyebrow: string;
  heading: string;
  platforms: ReviewPlatform[];
  reviews: TravelerReviewItem[];
  viewAllLabel: string;
  viewAllHref: string;
  visible: boolean;
};
