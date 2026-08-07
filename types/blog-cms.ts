export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  author: string;
  category: string;
  tags: string[];
  keywords: string;
  metaTitle: string;
  metaDescription: string;
  dateLabel: string;
  publishedAt: string;
  visible: boolean;
};

export type BlogPageContent = {
  coverImageUrl: string;
  coverTitle: string;
  coverSubtitle: string;
  intro: string;
  latestHeading: string;
  categories: string[];
  metaTitle: string;
  metaDescription: string;
  posts: BlogPost[];
};
