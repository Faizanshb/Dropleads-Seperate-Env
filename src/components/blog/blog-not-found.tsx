"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Search, FileText, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface BlogNotFoundProps {
  slug?: string;
}

export function BlogNotFound({ slug }: BlogNotFoundProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Animation */}
          <div className="mb-8">
            <div className="relative">
              <div className="text-8xl font-bold text-gray-200 dark:text-gray-700 select-none">
                404
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FileText className="w-16 h-16 text-gray-400 dark:text-gray-500 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Blog Post Not Found
              </h1>

              {slug && (
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  We couldn&apos;t find a blog post with the slug{" "}
                  <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">
                    {slug}
                  </code>
                </p>
              )}

              <p className="text-gray-600 dark:text-gray-300 mb-8">
                The blog post you&apos;re looking for might have been moved, deleted,
                or never existed. Don&apos;t worry, we have plenty of other great
                content for you to explore!
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => router.back()}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Go Back
                </Button>

                <Button asChild className="flex items-center gap-2">
                  <Link href="/blog">
                    <Search className="w-4 h-4" />
                    Browse All Posts
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Link href="/">
                    <Home className="w-4 h-4" />
                    Home Page
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Suggested Actions */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              What would you like to do?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                <Link href="/blog">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Latest Posts
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Check out our most recent blog posts and insights
                    </p>
                  </CardContent>
                </Link>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                <Link href="/blog?category=guides">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Search className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Guides & Tutorials
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Learn how to get the most out of DropLeads
                    </p>
                  </CardContent>
                </Link>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                <Link href="/">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Home className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      DropLeads Platform
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Explore our lead generation platform
                    </p>
                  </CardContent>
                </Link>
              </Card>
            </div>
          </div>

          {/* Contact Support */}
          <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Still can&apos;t find what you&apos;re looking for?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Our support team is here to help you find the right content.
            </p>
            <Button asChild variant="outline">
              <Link href="mailto:support@dropleads.io">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
