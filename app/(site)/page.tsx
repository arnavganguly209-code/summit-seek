import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { FeaturedAdventureTabs } from "@/components/home/FeaturedAdventureTabs";
import { AboutIntro } from "@/components/home/AboutIntro";
import { BestSellingPackagesSection } from "@/components/home/BestSellingPackages";
import { WhatWeOffer } from "@/components/home/WhatWeOffer";
import { UpcomingTripsSection } from "@/components/home/UpcomingTrips";
import { TravelerReviews } from "@/components/home/TravelerReviews";
import { WhyChooseSummitSeek } from "@/components/home/WhyChooseSummitSeek";
import { SITE } from "@/lib/constants";
import {
  getAboutIntro,
  getBestSellingPackages,
  getFeaturedPackages,
  getHeroContent,
  getUpcomingTrips,
  getWhatWeOffer,
} from "@/lib/orbit/store";

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
  const [hero, featured, about, bestSelling, whatWeOffer, upcoming] =
    await Promise.all([
      getHeroContent(),
      getFeaturedPackages(),
      getAboutIntro(),
      getBestSellingPackages(),
      getWhatWeOffer(),
      getUpcomingTrips(),
    ]);

  return (
    <>
      <Hero content={hero} />
      <FeaturedAdventureTabs content={featured} />
      <AboutIntro content={about} />
      <BestSellingPackagesSection content={bestSelling} mode="home" />
      <WhatWeOffer content={whatWeOffer} />
      <UpcomingTripsSection content={upcoming} />
      <TravelerReviews />
      <WhyChooseSummitSeek />
    </>
  );
}
