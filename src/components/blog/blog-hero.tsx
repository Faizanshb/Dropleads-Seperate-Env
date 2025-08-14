"use client";

import type React from "react";
import { useState } from "react";
import { Search, TrendingUp, Users, Target, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation"; // Import useRouter [^4]

interface BlogHeroProps {
  onSearch: (query: string) => void;
}

export function BlogHero({ onSearch }: BlogHeroProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter(); // Initialize useRouter [^4]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleGoToDashboard = () => {
    router.push("/"); // Navigate to email finder [^4]
  };

  const stats = [
    { icon: TrendingUp, label: "Growth Tips", value: "50+" },
    { icon: Users, label: "Success Stories", value: "100+" },
    { icon: Target, label: "Lead Gen Strategies", value: "25+" },
  ];

  return (
    <section className="relative bg-white border-b border-gray-100 py-16 md:py-10">
      <div className="container mx-auto px-4">
        {/* Back to Dashboard Button */}
        <div className="absolute top-6 left-4 md:left-8">
          <Button
            variant="ghost"
            onClick={handleGoToDashboard}
            className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Homepage</span>
          </Button>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Insights for <span className="text-blue-700">Growth</span>
          </h1>

          <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            Discover proven strategies, expert insights, and actionable tips to
            accelerate your B2B growth and lead generation efforts.
          </p>

          <form onSubmit={handleSearch} className="max-w-lg mx-auto mb-14">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 text-base border-gray-300 rounded-full focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
              />
              <Button
                type="submit"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200"
              >
                Search
              </Button>
            </div>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 rounded-full mb-3">
                  <stat.icon className="h-7 w-7 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
