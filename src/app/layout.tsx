import type { Metadata, Viewport } from "next";
import "@src/styles/fonts.css";
import "@src/styles/globals.css";
import { type ReactNode } from "react";
import { Toaster } from "@src/components/ui/sonner";
import DefaultLayout from "@src/layouts/DefaultLayout";

const SITE_URL = "https://www.wizofuasia.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Wiz Ofuasia (Wizboyy) — Official Website",
    template: "%s | Wiz Ofuasia (Wizboyy)",
  },
  description:
    "Official website of Wiz Ofuasia (Wizboyy) — Nigerian Afrobeats & Highlife singer, songwriter, producer, and performer. Stream More Billionaires, Yolo, Wizolingo, watch music videos, and explore tour dates.",
  keywords: [
    "Wiz Ofuasia",
    "Wizboyy",
    "Wizboyy Ofuasia",
    "Wizolingo",
    "More Billionaires",
    "Yolo",
    "Lovinjitis",
    "Salambala",
    "Nigerian Afrobeats",
    "Highlife music",
    "Wiz Ofuasia official website",
    "Wiz Ofuasia songs",
    "Wiz Ofuasia tours",
  ],
  authors: [{ name: "Wiz Ofuasia", url: SITE_URL }],
  creator: "Wiz Ofuasia",
  publisher: "Wiz Ofuasia",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Wiz Ofuasia (Wizboyy)",
    title: "Wiz Ofuasia (Wizboyy) — Official Website",
    description:
      "Stream Wiz Ofuasia's latest releases including More Billionaires and Yolo, watch official music videos, and view live tour dates.",
    images: [
      {
        url: "/images/gallery/wizolingo1.jpg",
        width: 1200,
        height: 1200,
        alt: "Wiz Ofuasia (Wizboyy) — Official Website",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wiz Ofuasia (Wizboyy) — Official Website",
    description:
      "Official website of Wiz Ofuasia (Wizboyy) — Afrobeats & Highlife artist, producer, and live performer.",
    images: ["/images/gallery/wizolingo1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#D70E1D",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MusicGroup",
      "@id": `${SITE_URL}/#artist`,
      name: "Wiz Ofuasia",
      alternateName: ["Wizboyy", "Wizboyy Ofuasia"],
      url: SITE_URL,
      image: `${SITE_URL}/images/gallery/wizolingo1.jpg`,
      genre: ["Afrobeats", "Highlife", "Afropop"],
      sameAs: [
        "https://www.youtube.com/@wiz_ofuasia",
        "https://www.youtube.com/@wizboyyVEVO",
        "https://www.instagram.com/wizofuasia/",
        "https://www.threads.com/@wizofuasia",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Wiz Ofuasia (Wizboyy) — Official Website",
      publisher: { "@id": `${SITE_URL}/#artist` },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="font-sans antialiased">
      <body className="min-h-screen bg-[#222222] text-white transition-colors duration-200">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <DefaultLayout>{children}</DefaultLayout>
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
