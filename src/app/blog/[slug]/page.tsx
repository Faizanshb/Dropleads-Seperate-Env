import type { Metadata } from "next";
import { fetchBlogPost } from "@/actions/blog-actions";
import { BlogPostClient } from "@/components/blog/blog-post-client";
import { BlogNotFound } from "@/components/blog/blog-not-found";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await fetchBlogPost(slug);

    if (!post) {
      return {
        title: "Post Not Found - DropLeads Blog",
        description: "The requested blog post could not be found.",
      };
    }

    return {
      title: `${post.title} - DropLeads Blog`,
      description: post.excerpt,
      keywords: post.tags,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        url: `https://dropleads.io/blog/${post.slug}`,
        siteName: "DropLeads",
        images: post.coverImage
          ? [
              {
                url: post.coverImage,
                width: 1200,
                height: 630,
                alt: post.title,
              },
            ]
          : [],
        type: "article",
        publishedTime: post.publishedDate,
        authors: [post.author],
        tags: post.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt,
        images: post.coverImage ? [post.coverImage] : [],
      },
      alternates: {
        canonical: `/blog/${post.slug}`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Post - DropLeads",
      description: "Read our latest blog post on DropLeads.",
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const { slug } = await params;

    // Add timeout to the entire page generation
    const post = await fetchBlogPost(slug)
    if (!post) {
      console.log(`Post not found for slug: ${slug}`);
      return <BlogNotFound slug={slug} />;
    }

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      image: post.coverImage,
      datePublished: post.publishedDate,
      dateModified: post.publishedDate,
      author: {
        "@type": "Person",
        name: post.author,
      },
      publisher: {
        "@type": "Organization",
        name: "DropLeads",
        logo: {
          "@type": "ImageObject",
          url: "https://dropleads.io/logo.png",
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://dropleads.io/blog/${post.slug}`,
      },
      keywords: post.tags.join(", "),
      wordCount: post.content ? post.content.split(" ").length : 0,
      timeRequired: `PT${post.readTime}M`,
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <BlogPostClient post={post} />
      </>
    );
  } catch (error) {
    console.error("Error rendering blog post page:", error);
    const { slug } = await params;
    return <BlogNotFound slug={slug} />;
  }
}
