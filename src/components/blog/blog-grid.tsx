/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { BlogCard } from "./blog-card";
import { BlogCardSkeleton } from "./blog-card-skeleton";
import type { BlogPost } from "@/lib/notion";

interface BlogGridProps {
  posts: BlogPost[];
  isLoading: boolean;
  error: any;
  searchQuery?: string;
}

export function BlogGrid({
  posts,
  isLoading,
  error,
  searchQuery,
}: BlogGridProps) {
  if (error) {
    return (
      <div className="text-center py-16">
        <div className="text-red-600 text-lg font-medium mb-2">
          Error loading posts
        </div>
        <div className="text-gray-600">Please try again later</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {Array.from({ length: 9 }).map((_, index) => (
          <BlogCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-600 text-lg mb-2">
          {searchQuery
            ? `No posts found for "${searchQuery}"`
            : "No posts available"}
        </div>
        <div className="text-gray-500">Check back later for new content</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
