"use server";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";

if (!process.env.NOTION_TOKEN) {
  throw new Error("Invalid token");
}

// Initialize Notion client for API access with production-optimized timeout
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  timeoutMs: 30000, // Increased for production
});

// Initialize unofficial Notion client for page content
const notionClient = new NotionAPI({
  activeUser: undefined,
  authToken: undefined,
  userTimeZone: "America/New_York",
});

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  coverImage?: string;
  publishedDate: string;
  author: string;
  tags: string[];
  readTime: number;
  status: string;
  category: string;
}

export interface BlogCategory {
  name: string;
  count: number;
  color: string;
}

export interface PaginatedBlogPosts {
  posts: BlogPost[];
  totalPages: number;
  currentPage: number;
  totalPosts: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Cache for database ID to avoid repeated searches
let cachedDatabaseId: string | null = null;

// Cache for blog posts to avoid repeated API calls
let cachedBlogPosts: { posts: any[]; timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Helper function to add delay for production stability
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to safely check if object exists and has properties
const safeObjectKeys = (obj: any): string[] => {
  if (!obj || typeof obj !== 'object') {
    return [];
  }
  try {
    return Object.keys(obj);
  } catch (error) {
    console.error('Error getting object keys:', error);
    return [];
  }
};

// Helper function to safely access nested properties
const safeGet = (obj: any, path: string, defaultValue: any = null) => {
  if (!obj || typeof obj !== 'object') {
    return defaultValue;
  }
  
  try {
    const keys = path.split('.');
    let current = obj;
    
    for (const key of keys) {
      if (current === null || current === undefined || typeof current !== 'object') {
        return defaultValue;
      }
      current = current[key];
    }
    
    return current !== undefined ? current : defaultValue;
  } catch (error) {
    console.error(`Error accessing path ${path}:`, error);
    return defaultValue;
  }
};

export async function getBlogDatabases() {
  try {
    // Return cached database ID if available
    if (cachedDatabaseId) {
      return [{ id: cachedDatabaseId }];
    }

    // Add delay for production stability
    await delay(100);

    const response = await Promise.race([
      notion.search({
        filter: {
          value: "database",
          property: "object",
        },
        page_size: 10,
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Database search timeout")), 15000)
      ),
    ]) as any;

    if (response?.results && Array.isArray(response.results) && response.results.length > 0) {
      cachedDatabaseId = response.results[0].id;
    }

    return response?.results || [];
  } catch (error) {
    console.error("Error fetching databases:", error);
    return [];
  }
}

// Helper function to get all blog posts with caching
async function getAllBlogPosts() {
  const now = Date.now();
  
  // Return cached posts if they're still fresh
  if (cachedBlogPosts && now - cachedBlogPosts.timestamp < CACHE_DURATION) {
    return cachedBlogPosts.posts;
  }

  try {
    const databases = await getBlogDatabases();
    if (!databases || databases.length === 0) return [];

    const databaseId = databases[0].id;
    
    // Add delay before making the request
    await delay(200);

    const response = await Promise.race([
      notion.databases.query({
        database_id: databaseId,
        sorts: [
          {
            property: "Date",
            direction: "descending",
          },
        ],
        page_size: 100,
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("All posts fetch timeout")), 20000)
      ),
    ]) as any;

    // Validate response structure
    if (!response || !response.results || !Array.isArray(response.results)) {
      console.error("Invalid response structure:", response);
      return [];
    }

    // Cache the results
    cachedBlogPosts = {
      posts: response.results,
      timestamp: now,
    };

    return response.results;
  } catch (error) {
    console.error("Error fetching all blog posts:", error);
    return [];
  }
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  try {
    const allPosts = await getAllBlogPosts();
    
    if (!Array.isArray(allPosts)) {
      return [{ name: "All", count: 0, color: "#4285F4" }];
    }

    const categoryMap = new Map<string, number>();
    const colors = [
      "#4285F4",
      "#34A853",
      "#EA4335",
      "#FBBC04",
      "#9C27B0",
      "#FF9800",
    ];

    // Add delay before processing
    await delay(50);

    allPosts.forEach((page: any) => {
      if (!page || !page.properties) return;
      
      const category =
        safeGet(page, 'properties.Category.select.name') ||
        safeGet(page, 'properties.Type.select.name') ||
        "General";
      
      categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
    });

    const categories: BlogCategory[] = Array.from(categoryMap.entries()).map(
      ([name, count], index) => ({
        name,
        count,
        color: colors[index % colors.length],
      })
    );

    const totalPosts = allPosts.length;
    categories.unshift({
      name: "All",
      count: totalPosts,
      color: "#4285F4",
    });

    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [{ name: "All", count: 0, color: "#4285F4" }];
  }
}

// Helper function to convert Notion page to BlogPost with better error handling
function convertNotionPageToBlogPost(page: any): BlogPost {
  if (!page || !page.properties) {
    console.error("Invalid page structure:", page);
    return {
      id: page?.id || 'unknown',
      title: 'Untitled',
      slug: 'untitled',
      excerpt: 'No excerpt available',
      coverImage: '',
      publishedDate: new Date().toISOString(),
      author: 'DropLeads Team',
      tags: [],
      readTime: 5,
      status: 'Published',
      category: 'General',
    };
  }

  const properties = page.properties;
  
  const title =
    safeGet(properties, 'Name.title.0.plain_text') ||
    safeGet(properties, 'Title.title.0.plain_text') ||
    "Untitled";

  const slug =
    safeGet(properties, 'Slug.rich_text.0.plain_text') ||
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") ||
    page.id;

  return {
    id: page.id,
    title,
    slug,
    excerpt:
      safeGet(properties, 'Excerpt.rich_text.0.plain_text') ||
      safeGet(properties, 'Description.rich_text.0.plain_text') ||
      "No excerpt available",
    coverImage:
      safeGet(properties, 'Cover Image.files.0.file.url') ||
      safeGet(properties, 'Cover Image.files.0.external.url') ||
      safeGet(properties, 'Image.files.0.file.url') ||
      safeGet(properties, 'Image.files.0.external.url') ||
      safeGet(page, 'cover.external.url') ||
      safeGet(page, 'cover.file.url') ||
      "",
    publishedDate:
      safeGet(properties, 'Date.date.start') ||
      safeGet(properties, 'Published Date.date.start') ||
      safeGet(properties, 'Created Date.date.start') ||
      new Date().toISOString(),
    author:
      safeGet(properties, 'Author.people.0.name') ||
      safeGet(properties, 'Writer.people.0.name') ||
      "DropLeads Team",
    tags:
      safeGet(properties, 'Tags.multi_select')?.map((tag: any) => tag?.name).filter(Boolean) ||
      safeGet(properties, 'Labels.multi_select')?.map((tag: any) => tag?.name).filter(Boolean) ||
      [],
    readTime:
      safeGet(properties, 'Read Time.number') || 
      safeGet(properties, 'Duration.number') || 
      5,
    status: safeGet(properties, 'Status.select.name') || "Published",
    category:
      safeGet(properties, 'Category.select.name') ||
      safeGet(properties, 'Type.select.name') ||
      "General",
  };
}

export async function getBlogPosts(
  page = 1,
  limit = 9,
  category?: string
): Promise<PaginatedBlogPosts> {
  try {
    const allPosts = await getAllBlogPosts();
    
    if (!Array.isArray(allPosts)) {
      return {
        posts: [],
        totalPages: 0,
        currentPage: page,
        totalPosts: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      };
    }

    // Add delay before filtering
    await delay(100);

    // Filter by category if specified
    let filteredPosts = allPosts;
    if (category && category !== "All") {
      filteredPosts = allPosts.filter((post: any) => {
        if (!post || !post.properties) return false;
        
        const postCategory =
          safeGet(post, 'properties.Category.select.name') ||
          safeGet(post, 'properties.Type.select.name') ||
          "General";
        return postCategory === category;
      });
    }

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedResults = filteredPosts.slice(startIndex, endIndex);

    const posts: BlogPost[] = paginatedResults.map(convertNotionPageToBlogPost);

    const totalPosts = filteredPosts.length;
    const totalPages = Math.ceil(totalPosts / limit);

    return {
      posts,
      totalPages,
      currentPage: page,
      totalPosts,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
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

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const allPosts = await getAllBlogPosts();
    
    if (!Array.isArray(allPosts)) {
      console.error("Invalid posts data structure");
      return null;
    }

    // Add delay before processing
    await delay(150);

    // Find the post by slug
    const foundPage = allPosts.find((page: any) => {
      if (!page || !page.properties) return false;
      
      const properties = page.properties;
      const title =
        safeGet(properties, 'Name.title.0.plain_text') ||
        safeGet(properties, 'Title.title.0.plain_text') ||
        "";
      
      const pageSlug =
        safeGet(properties, 'Slug.rich_text.0.plain_text') ||
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") ||
        page.id;

      return pageSlug === slug;
    });

    if (!foundPage) {
      console.log(`Blog post with slug "${slug}" not found`);
      return null;
    }

    const post = convertNotionPageToBlogPost(foundPage);

    // Add delay before fetching content
    await delay(200);

    // Fetch the full page content with timeout and error handling
    try {
      const pageContent = await Promise.race([
        notionClient.getPage(post.id),
        new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error("Page content fetch timeout")),
            45000 // Increased timeout for production
          )
        ),
      ]);

      // Validate the page content before processing
      if (pageContent && typeof pageContent === "object") {
        // Add delay before stringifying
        await delay(100);
        
        // Safely stringify the content
        try {
          post.content = JSON.stringify(pageContent);
        } catch (stringifyError) {
          console.error("Error stringifying page content:", stringifyError);
          post.content = JSON.stringify({ error: "Content serialization failed" });
        }
      } else {
        throw new Error("Invalid page content structure");
      }
    } catch (contentError) {
      console.error("Error fetching page content:", contentError);
      
      // Add delay before fallback
      await delay(300);
      
      // Fallback: try to get basic content from blocks API
      try {
        const blocks = await Promise.race([
          notion.blocks.children.list({
            block_id: post.id,
            page_size: 100,
          }),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Blocks fetch timeout")), 20000)
          ),
        ]) as any;

        // Ensure blocks.results exists and is an array
        if (blocks?.results && Array.isArray(blocks.results)) {
          // Add delay before processing blocks
          await delay(100);
          
          console.log("record map", blocks.results);
          
          // Safely process blocks
          const safeBlocks = blocks.results.filter((block: any) => 
            block && typeof block === 'object' && block.id
          );
          
          post.content = JSON.stringify(safeBlocks);
        } else {
          console.error("Invalid blocks structure:", blocks);
          post.content = JSON.stringify({ error: "No content available" });
        }
      } catch (blocksError) {
        console.error("Error fetching blocks:", blocksError);
        post.content = JSON.stringify({ error: "Content fetch failed" });
      }
    }

    return post;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

export async function searchBlogPosts(
  query: string,
  page = 1,
  limit = 9
): Promise<PaginatedBlogPosts> {
  try {
    const allPosts = await getAllBlogPosts();
    
    if (!Array.isArray(allPosts)) {
      return {
        posts: [],
        totalPages: 0,
        currentPage: page,
        totalPosts: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      };
    }

    // Add delay before processing
    await delay(100);

    const blogPosts = allPosts.map(convertNotionPageToBlogPost);

    // Filter posts based on search query
    const filteredPosts = blogPosts.filter(
      (post: BlogPost) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.some((tag: string) =>
          tag.toLowerCase().includes(query.toLowerCase())
        )
    );

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    const totalPosts = filteredPosts.length;
    const totalPages = Math.ceil(totalPosts / limit);

    return {
      posts: paginatedPosts,
      totalPages,
      currentPage: page,
      totalPosts,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };
  } catch (error) {
    console.error("Error searching blog posts:", error);
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
