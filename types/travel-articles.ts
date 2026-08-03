export type TravelArticle = {
  id: string;
  title: string;
  dateLabel: string;
  href: string;
  imageUrl: string;
  visible: boolean;
};

export type TravelArticlesContent = {
  eyebrow: string;
  heading: string;
  viewMoreLabel: string;
  viewMoreHref: string;
  articles: TravelArticle[];
  visible: boolean;
};
