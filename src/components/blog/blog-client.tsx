"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchBlogPosts, fetchBlogCategories } from "@/actions/blog-actions"
import { BlogHero } from "./blog-hero"
import { BlogCategories } from "./blog-categories"
import { BlogGrid } from "./blog-grid"
import { BlogPagination } from "./blog-pagination"

export function BlogClient() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const {
    data: postsData,
    isLoading: postsLoading,
    error: postsError,
  } = useQuery({
    queryKey: ["blog-posts", currentPage, selectedCategory, searchQuery],
    queryFn: () => fetchBlogPosts(currentPage, 9, selectedCategory === "All" ? undefined : selectedCategory),
  })

  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["blog-categories"],
    queryFn: fetchBlogCategories,
  })

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-white">
      <BlogHero onSearch={handleSearch} />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {!categoriesLoading && !categoriesError && categories && (
            <BlogCategories
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          )}

          <BlogGrid
            posts={postsData?.posts || []}
            isLoading={postsLoading}
            error={postsError}
            searchQuery={searchQuery}
          />

          {postsData && postsData.totalPages > 1 && (
            <BlogPagination
              currentPage={currentPage}
              totalPages={postsData.totalPages}
              onPageChange={handlePageChange}
              hasNextPage={postsData.hasNextPage}
              hasPreviousPage={postsData.hasPreviousPage}
            />
          )}
        </div>
      </div>
    </div>
  )
}
