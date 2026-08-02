export type HeroFeatureIcon = "shield" | "mountain" | "compass" | "headset";

export type HeroFeature = {
  id: string;
  title: string;
  subtitle: string;
  icon: HeroFeatureIcon;
  showStars?: boolean;
};

export type HeroContent = {
  videoUrl: string;
  logoUrl: string;
  logoUrlLight: string;
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
  searchPlaceholder: string;
  searchButtonLabel: string;
  overlayOpacity: number;
  headlineAnimation: boolean;
  visible: boolean;
  features: HeroFeature[];
};

export type MediaItem = {
  id: string;
  name: string;
  filename: string;
  url: string;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  duration?: number;
  uploadedAt: string;
  status: "ready" | "processing" | "error";
  tags?: string[];
};
