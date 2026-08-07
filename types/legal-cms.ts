export type LegalDocument = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  visible: boolean;
};

export type LegalPageContent = {
  coverImageUrl: string;
  coverTitle: string;
  coverSubtitle: string;
  intro: string;
  documents: LegalDocument[];
  metaTitle: string;
  metaDescription: string;
};
