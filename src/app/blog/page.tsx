import type { Metadata } from "next";
import { BlogClient } from "@/components/blog/blog-client";

export const metadata: Metadata = {
  title: "Blog - DropLeads",
  description:
    "Insights, tips, and strategies for B2B data enrichment and lead generation. Stay updated with the latest trends in sales and marketing.",
  keywords: [
    "B2B data",
    "lead generation",
    "email finder",
    "sales",
    "marketing",
    "business growth",
  ],
  openGraph: {
    title: "Blog - DropLeads",
    description:
      "Insights, tips, and strategies for B2B data enrichment and lead generation.",
    url: "https://dropleads.io/blog",
    siteName: "DropLeads",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - DropLeads",
    description:
      "Insights, tips, and strategies for B2B data enrichment and lead generation.",
  },
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "DropLeads Blog",
    description:
      "Insights, tips, and strategies for B2B data enrichment and lead generation.",
    url: "https://dropleads.io/blog",
    publisher: {
      "@type": "Organization",
      name: "DropLeads",
      logo: {
        "@type": "ImageObject",
        url: "https://dropleads.io/logo.png",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogClient />
    </>
  );
}
