import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SiteProviders } from "@/components/watchlist/SiteProviders";
import { getHeroContent, getFooterContent } from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hero, footer] = await Promise.all([getHeroContent(), getFooterContent()]);

  return (
    <SiteProviders>
      <Header logoUrl={hero.logoUrl} logoUrlLight={hero.logoUrlLight} />
      <main className="flex-1">{children}</main>
      <Footer content={footer} />
    </SiteProviders>
  );
}
