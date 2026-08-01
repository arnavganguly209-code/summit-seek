import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { AboutIntro } from "@/components/home/AboutIntro";
import { PopularTrekkingPackages } from "@/components/home/PopularTrekkingPackages";
import { WhatWeOffer } from "@/components/home/WhatWeOffer";
import { TrustedBy } from "@/components/home/TrustedBy";
import { FeaturedTreks } from "@/components/home/FeaturedTreks";
import { LuxuryPackages } from "@/components/home/LuxuryPackages";
import { PopularDestinations } from "@/components/home/PopularDestinations";
import { PeakClimbing } from "@/components/home/PeakClimbing";
import { Expeditions } from "@/components/home/Expeditions";
import { LuxuryExperience } from "@/components/home/LuxuryExperience";
import { WhySummitSeek } from "@/components/home/WhySummitSeek";
import { Testimonials } from "@/components/home/Testimonials";
import { AdventureGallery } from "@/components/home/AdventureGallery";
import { TravelBlogs } from "@/components/home/TravelBlogs";
import { Awards } from "@/components/home/Awards";
import { Partners } from "@/components/home/Partners";
import { Instagram } from "@/components/home/Instagram";
import { Newsletter } from "@/components/home/Newsletter";
import { LuxuryCTA } from "@/components/home/LuxuryCTA";
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
      <TrustedBy />
      <FeaturedTreks />
      <LuxuryPackages />
      <PopularDestinations />
      <PeakClimbing />
      <Expeditions />
      <LuxuryExperience />
      <div id="why">
        <WhySummitSeek />
      </div>
      <Testimonials />
      <AdventureGallery />
      <TravelBlogs />
      <Awards />
      <Partners />
      <Instagram />
      <Newsletter />
      <LuxuryCTA />
    </>
  );
}
