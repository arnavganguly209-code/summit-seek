import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { FeaturedAdventureTabs } from "@/components/home/FeaturedAdventureTabs";
import { AboutIntro } from "@/components/home/AboutIntro";
import { PopularTrekkingPackages } from "@/components/home/PopularTrekkingPackages";
import { WhatWeOffer } from "@/components/home/WhatWeOffer";
import { TravelerReviews } from "@/components/home/TravelerReviews";
import { WhyChooseSummitSeek } from "@/components/home/WhyChooseSummitSeek";
import { SITE } from "@/lib/constants";
import { getFeaturedPackages, getHeroContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Premium Himalayan Trekking & Luxury Expeditions",
  description: SITE.description,
  openGraph: {
    title: `${SITE.name} | Explore Nepal Beyond The Ordinary`,
    description: SITE.description,
  },
};

export default async function HomePage() {
  const [hero, featured] = await Promise.all([
    getHeroContent(),
    getFeaturedPackages(),
  ]);

  return (
    <>
      <Hero content={hero} />
      <FeaturedAdventureTabs content={featured} />
      <AboutIntro />
      <PopularTrekkingPackages />
      <WhatWeOffer />
      <TravelerReviews />
      <WhyChooseSummitSeek />
    </>
  );
}
