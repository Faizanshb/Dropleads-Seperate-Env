"use client"

import Image from "next/image"
import { Calendar, Clock, ArrowRight } from "lucide-react"

import Link from "next/link"
import type { BlogPost } from "@/lib/notion"

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
    console.log("dateString", dateString)
  }



  return (
    <Link   href={`/blog/${post.slug || post.id}`} className="group block cursor-pointer">
      <article className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-blue-200 transition-all duration-300 h-full">
        {post.coverImage && (
          <div className="aspect-[16/9] overflow-hidden">
            <Image
              src={post.coverImage || "/placeholder.svg"}
              alt={post.title}
              width={400}
              height={225}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.publishedDate)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime} min</span>
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
            {post.title}
          </h3>
          {/* <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p> */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium text-sm">{post.author.charAt(0)}</span>
              </div>
              <span className="text-sm text-gray-700 font-medium">{post.author}</span>
            </div>
            <div className="flex items-center gap-1 text-blue-600 group-hover:gap-2 transition-all duration-200">
              <span className="text-sm font-medium">Read more</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
