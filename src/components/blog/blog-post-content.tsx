// eslint-disable-next-line @typescript-eslint/no-explicit-any
"use client";
import { NotionRenderer } from "react-notion-x";
import type { BlogPost } from "@/lib/notion";

interface BlogPostContentProps {
  post: BlogPost;
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  let recordMap = null;
  try {
    if (post.content) {
      recordMap = JSON.parse(post.content);
      console.log("record map", recordMap);
    }
  } catch (error) {
    console.error("Error parsing post content:", error);
    // Optionally, you could set a state here to show a specific parsing error message
  }

  return (
    <article className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
      {recordMap ? (
        <NotionRenderer
          recordMap={recordMap }
          fullPage={true}
          darkMode={false} 
          components={
            {
              // You can customize components here
            }
          }
        />

      
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded animate-pulse"></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Content Loading
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">

              We&lsquo;re fetching the full content from Notion. This may take a
              moment as we render the rich content.
            </p>
            <div className="space-y-3 max-w-2xl mx-auto">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}