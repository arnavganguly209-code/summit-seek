export type AboutValue = {
  id: string;
  title: string;
  description: string;
};

export type AboutTeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  visible: boolean;
};

export type AboutPageContent = {
  coverImageUrl: string;
  coverTitle: string;
  coverSubtitle: string;
  companyName: string;
  tagline: string;
  storyHeading: string;
  storyBody: string;
  storyImageUrl: string;
  missionHeading: string;
  missionBody: string;
  visionHeading: string;
  visionBody: string;
  valuesHeading: string;
  values: AboutValue[];
  responsibleHeading: string;
  responsibleBody: string;
  ctaHeading: string;
  ctaBody: string;
  ctaLabel: string;
  ctaHref: string;
  metaTitle: string;
  metaDescription: string;
  teamCoverImageUrl: string;
  teamCoverTitle: string;
  teamCoverSubtitle: string;
  teamIntro: string;
  team: AboutTeamMember[];
  teamMetaTitle: string;
  teamMetaDescription: string;
  visionCoverImageUrl: string;
  visionPageCoverTitle: string;
  visionPageCoverSubtitle: string;
  visionPageIntro: string;
  visionPageBody: string;
  visionPillarsHeading: string;
  visionPillars: AboutValue[];
  visionMetaTitle: string;
  visionMetaDescription: string;
};
