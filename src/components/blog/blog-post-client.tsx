/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { BlogPostHeader } from "./blog-post-header";
import { BlogPostContent } from "./blog-post-content";
import { BlogPostSidebar } from "./blog-post-sidebar";
import { RelatedPosts } from "./related-posts";
import type { BlogPost } from "@/lib/notion";
import { use, useEffect } from "react";
interface BlogPostClientProps {
  post: BlogPost;
}

export function BlogPostClient({ post }: BlogPostClientProps) {

  // useEffect(() => {
  //  console.log("BlogPostClient mounted with post:", post);
  // }, [post]);

  return (
    <div className="min-h-screen bg-white">
      <BlogPostHeader post={post} />

      <div className="container mx-auto px-4 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-3">
              <BlogPostContent post={post} />
            </div>
            <div className="lg:col-span-1">
              <BlogPostSidebar post={post} />
            </div>
          </div>
        </div>

        {/* <div className="mt-16">
          <RelatedPosts currentPost={post} />
        </div> */}
      </div>
    </div>
  );
}
