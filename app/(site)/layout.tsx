import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SiteProviders } from "@/components/watchlist/SiteProviders";
import {
  getHeroContent,
  getFooterContent,
  getContactContent,
} from "@/lib/orbit/store";

export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hero, footer, contact] = await Promise.all([
    getHeroContent(),
    getFooterContent(),
    getContactContent(),
  ]);

  return (
    <SiteProviders>
      <Header
        logoUrl={hero.logoUrl}
        logoUrlLight={hero.logoUrlLight}
        phone={contact.phone}
        phoneDisplay={contact.phoneDisplay}
      />
      <main className="flex-1">{children}</main>
      <Footer content={footer} />
    </SiteProviders>
  );
}
