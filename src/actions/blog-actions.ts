"use server";
import {
  getBlogPosts,
  getBlogPost,
  getBlogCategories,
  searchBlogPosts,
} from "@/lib/notion";

export async function fetchBlogPosts(page = 1, limit = 9, category?: string) {
  try {
    return await getBlogPosts(page, limit, category);
  } catch (error) {
    console.error("Error in fetchBlogPosts:", error);
    return {
      posts: [],
      totalPages: 0,
      currentPage: page,
      totalPosts: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    };
  }
}

export async function fetchBlogPost(slug: string) {
  try {
    return await getBlogPost(slug);
  } catch (error) {
    console.error("Error in fetchBlogPost:", error);
    return null;
  }
}

export async function fetchBlogCategories() {
  try {
    return await getBlogCategories();
  } catch (error) {
    console.error("Error in fetchBlogCategories:", error);
    return [{ name: "All", count: 0, color: "#4285F4" }];
  }
}

export async function searchBlogPostsAction(
  query: string,
  page = 1,
  limit = 9
) {
  try {
    return await searchBlogPosts(query, page, limit);
  } catch (error) {
    console.error("Error in searchBlogPostsAction:", error);
    return {
      posts: [],
      totalPages: 0,
      currentPage: page,
      totalPosts: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    };
  }
}
