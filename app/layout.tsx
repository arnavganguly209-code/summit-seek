import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SITE } from "@/lib/constants";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Premium Himalayan Trekking & Expeditions`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "Nepal trekking",
    "Everest Base Camp",
    "luxury trek Nepal",
    "peak climbing",
    "Himalayan expedition",
    "Summit Seek",
  ],
  authors: [{ name: SITE.legalName }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | Explore Nepal Beyond The Ordinary`,
    description: SITE.description,
    images: [
      {
        url: "/logo-summit-seek.png",
        width: 1024,
        height: 510,
        alt: SITE.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | Premium Himalayan Trekking`,
    description: SITE.description,
    images: ["/logo-summit-seek.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: SITE.legalName,
    description: SITE.description,
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address,
      addressLocality: "Kathmandu",
      addressCountry: "NP",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SITE.googleRating,
      reviewCount: SITE.googleReviews,
    },
  };

  return (
    <html lang="en" className={`${display.variable} ${sans.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-snow font-sans text-midnight antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
