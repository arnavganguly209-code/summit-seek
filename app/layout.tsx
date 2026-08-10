import type { Metadata } from "next";
import { Playfair_Display, Inter, Plus_Jakarta_Sans } from "next/font/google";
import { SITE } from "@/lib/constants";
import "./globals.css";

const display = Playfair_Display({
  /** Raw Playfair face — composed with a plain-& overlay in globals.css */
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/**
 * Site UI + all package surfaces — Plus Jakarta Sans (permanent default).
 * Loaded twice so both CSS variables resolve to the same family.
 */
const ui = Plus_Jakarta_Sans({
  variable: "--font-ui",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
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
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${ui.variable} ${jakarta.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-snow font-sans text-midnight antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
