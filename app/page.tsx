import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { AboutIntro } from "@/components/home/AboutIntro";
import { PopularTrekkingPackages } from "@/components/home/PopularTrekkingPackages";
import { WhatWeOffer } from "@/components/home/WhatWeOffer";
import { TravelerReviews } from "@/components/home/TravelerReviews";
import { WhyChooseSummitSeek } from "@/components/home/WhyChooseSummitSeek";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Premium Himalayan Trekking & Luxury Expeditions",
  description: SITE.description,
  openGraph: {
    title: `${SITE.name} | Explore Nepal Beyond The Ordinary`,
    description: SITE.description,
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutIntro />
      <PopularTrekkingPackages />
      <WhatWeOffer />
      <TravelerReviews />
      <WhyChooseSummitSeek />
    </>
  );
}
