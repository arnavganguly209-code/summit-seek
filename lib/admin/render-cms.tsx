import { notFound } from "next/navigation";
import { PoonHillEditor } from "@/components/orbit/PoonHillEditor";
import { HeroEditor } from "@/components/orbit/HeroEditor";
import { ContactEditor } from "@/components/orbit/ContactEditor";
import { BlogEditor } from "@/components/orbit/BlogEditor";
import { FooterEditor } from "@/components/orbit/FooterEditor";
import { HeaderLogosEditor } from "@/components/orbit/HeaderLogosEditor";
import { FeaturedPackagesEditor } from "@/components/orbit/FeaturedPackagesEditor";
import { BestSellingPackagesEditor } from "@/components/orbit/BestSellingPackagesEditor";
import { UpcomingTripsEditor } from "@/components/orbit/UpcomingTripsEditor";
import { DayToursListingEditor } from "@/components/orbit/DayToursListingEditor";
import OrbitMediaPage from "@/app/orbit/dashboard/media/page";
import {
  LINKABLE_PACKAGES,
  getPackageContentByHref,
} from "@/lib/orbit/package-content-by-href";
import {
  getHeroContent,
  getContactContent,
  getBlogContent,
  getFooterContent,
  getFeaturedPackages,
  getBestSellingPackages,
  getUpcomingTrips,
  getDayToursListing,
} from "@/lib/orbit/store";
import { enrichUpcomingTrips } from "@/lib/orbit/enrich-upcoming-trips";

function packageBySlug(slug: string) {
  return LINKABLE_PACKAGES.find((p) => {
    const last = p.href.split("/").filter(Boolean).pop();
    return last === slug;
  });
}

export async function renderAdminCms(slugParts: string[]) {
  const key = slugParts.filter(Boolean).join("/");
  if (!key) notFound();

  if (key === "media") {
    return <OrbitMediaPage />;
  }

  if (key === "home/hero" || key === "hero") {
    const content = await getHeroContent();
    return <HeroEditor initial={content} />;
  }

  if (key === "header") {
    const content = await getHeroContent();
    return <HeaderLogosEditor initial={content} />;
  }

  if (key === "contact") {
    const content = await getContactContent();
    return <ContactEditor initial={content} />;
  }

  if (key === "blog") {
    const content = await getBlogContent();
    return <BlogEditor initial={content} />;
  }

  if (key === "footer") {
    const content = await getFooterContent();
    return <FooterEditor initial={content} />;
  }

  if (key === "packages") {
    const content = await getFeaturedPackages();
    return <FeaturedPackagesEditor initial={content} />;
  }

  if (key === "best-selling") {
    const content = await getBestSellingPackages();
    return <BestSellingPackagesEditor initial={content} />;
  }

  if (key === "upcoming-trips") {
    const stored = await getUpcomingTrips();
    const content = await enrichUpcomingTrips(stored);
    return <UpcomingTripsEditor initial={content} packages={LINKABLE_PACKAGES} />;
  }

  if (key === "day-tours") {
    const content = await getDayToursListing();
    return <DayToursListingEditor initial={content} packages={LINKABLE_PACKAGES} />;
  }

  // Single-segment package / trip / tour editors
  if (slugParts.length === 1) {
    const slug = slugParts[0];
    const pkg = packageBySlug(slug);
    if (pkg) {
      const content = await getPackageContentByHref(pkg.href);
      if (content) {
        return (
          <PoonHillEditor
            initial={content}
            title={pkg.label}
            pathLabel={pkg.href}
            apiPath={`/api/orbit/${slug}`}
          />
        );
      }
    }
  }

  notFound();
}
