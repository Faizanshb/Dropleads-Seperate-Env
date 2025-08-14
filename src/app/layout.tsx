import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/config/provider";
import "./globals.css";
// // core styles shared by all of react-notion-x (required)
// import 'react-notion-x/src/styles.css'

// import 'prismjs/themes/prism-tomorrow.css'

// import 'katex/dist/katex.min.css'
import { IntercomWidget } from "@/lib/intercom-widget";
import AnalyticsConfig from "@/lib/analytics-config";
import ClarityConfig from "@/lib/calrity-config";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DropLeads - Find Anyone's Email & Phone Number",
  description:
    "Find verified email addresses and phone numbers for any professional with DropLeads' data enrichment platform.",
  keywords: [
    "B2B data enrichment",
    "API data platform",
    "email finder",
    "company data",
    "employee lists",
    "contact information",
    "lead generation",
    "sales intelligence",
    "data verification",
    "business intelligence",
  ],
  authors: [{ name: "dropleads Team" }],
  creator: "dropleads",
  publisher: "dropleads",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://dropleads.io"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "DropLeads - Find Anyone's Email & Phone Number",
    description:
      "Find verified email addresses and phone numbers for any professional with DropLeads' data enrichment platform.",
    url: "https://dropleads.io",
    siteName: "DropLeads",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DropLeads - B2B Data Enrichment Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DropLeads - Find Anyone's Email & Phone Number",
    description:
      "Find verified email addresses and phone numbers for any professional with DropLeads' data enrichment platform.",
    images: ["/og-image.jpg"],
    creator: "@DropLeads",
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
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "DropLeads",
  description: "Real-time B2B data enrichment API platform for businesses",
  url: "https://dropleads.io",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free tier with 1000 API calls per month",
  },
  provider: {
    "@type": "Organization",
    name: "DropLeads",
    url: "https://dropleads.io",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "500",
    bestRating: "5",
    worstRating: "1",
  },
  featureList: [
    "Employee Lists",
    "Company Data",
    "Email Finder",
    "Phone Numbers",
    "Identity Verification",
    "Real-time API",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <AnalyticsConfig />
      <ClarityConfig />
      <body className={inter.className}>
        {/* Main content */}
        <Providers>
          {children}
          <IntercomWidget />
        </Providers>
      </body>
    </html>
  );
}
