"use client";

import {
  Share2,
  Twitter,
  Linkedin,
  Facebook,
  LinkIcon,
 
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "@/lib/notion";

interface BlogPostSidebarProps {
  post: BlogPost;
}

export function BlogPostSidebar({ post }: BlogPostSidebarProps) {
  const shareUrl = `https://dropleads.io/blog/${post.slug}`;
  const shareText = `Check out this article: ${post.title}`;

  const handleShare = (platform: string) => {
    let url = "";
    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          shareText
        )}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          shareUrl
        )}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}`;
        break;
      case "copy":
        navigator.clipboard.writeText(shareUrl);
        return;
    }
    if (url) window.open(url, "_blank", "width=600,height=400");
  };

  return (
    <div className="space-y-8">
      {/* Share Section */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Share2 className="h-5 w-5 text-blue-600" />
          Share this article
        </h3>
        <div className="space-y-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare("twitter")}
            className="w-full justify-start border-gray-200 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700"
          >
            <Twitter className="h-4 w-4 mr-2 text-blue-500" />
            Share on Twitter
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare("linkedin")}
            className="w-full justify-start border-gray-200 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700"
          >
            <Linkedin className="h-4 w-4 mr-2 text-blue-600" />
            Share on LinkedIn
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare("facebook")}
            className="w-full justify-start border-gray-200 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700"
          >
            <Facebook className="h-4 w-4 mr-2 text-blue-700" />
            Share on Facebook
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare("copy")}
            className="w-full justify-start border-gray-200 hover:bg-gray-50 hover:text-gray-700"
          >
            <LinkIcon className="h-4 w-4 mr-2 text-gray-600" />
            Copy link
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      {/* <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="space-y-3">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start border-gray-200 hover:bg-red-50 hover:border-red-200 hover:text-red-700 bg-transparent"
          >
            <Heart className="h-4 w-4 mr-2 text-red-500" />
            Like this post
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start border-gray-200 hover:bg-yellow-50 hover:border-yellow-200 hover:text-yellow-700 bg-transparent"
          >
            <Bookmark className="h-4 w-4 mr-2 text-yellow-600" />
            Save for later
          </Button>
        </div>
      </div> */}

      {/* Table of Contents */}
      {/* <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Table of Contents
        </h3>
        <nav className="space-y-2">
          <a
            href="#introduction"
            className="block text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200"
          >
            1. Introduction
          </a>
          <a
            href="#key-strategies"
            className="block text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200"
          >
            2. Key Strategies
          </a>
          <a
            href="#implementation"
            className="block text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200"
          >
            3. Implementation Guide
          </a>
          <a
            href="#best-practices"
            className="block text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200"
          >
            4. Best Practices
          </a>
          <a
            href="#conclusion"
            className="block text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200"
          >
            5. Conclusion
          </a>
        </nav>
      </div> */}

      {/* Author Info */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          About the Author
        </h3>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-semibold text-lg">
              {post.author.charAt(0)}
            </span>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{post.author}</h4>
            <p className="text-sm text-gray-600">Content Specialist</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Expert in B2B data enrichment and lead generation strategies with over
          5 years of experience helping businesses scale their outreach efforts.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="w-full border-gray-200 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 bg-transparent"
        >
          <Mail className="h-4 w-4 mr-2" />
          Follow Author
        </Button>
      </div>

      {/* Newsletter Signup */}
      {/* <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Stay Updated
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Get the latest insights on B2B data and lead generation delivered to
          your inbox weekly.
        </p>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white border-0">
          <Mail className="h-4 w-4 mr-2" />
          Subscribe Now
        </Button>
      </div> */}
    </div>
  );
}
