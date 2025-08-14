"use client";

import type React from "react";
import {
  Mail,
  Phone,
  MailCheck,
  UploadCloud,
  Zap,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  index: number; // Used for border styling
  statsLabel: string;
  stats: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: IconComponent,
  index,
  statsLabel,
  stats,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature border-gray-200/50",
        (index === 0 || index === 3) && "lg:border-l border-gray-200/50", // Left border for first item in each row (0 and 3 for 3-col grid)
        index < 3 && "lg:border-b border-gray-200/50" // Bottom border for first row items
      )}
    >
      {index < 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-[#4285F4]/5 to-transparent pointer-events-none" />
      )}
      {index >= 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-[#4285F4]/5 to-transparent pointer-events-none" />
      )}

      <div className="mb-6 relative z-10 px-10">
        <div className="w-12 h-12 bg-[#4285F4]/10 rounded-xl flex items-center justify-center group-hover/feature:bg-[#4285F4] transition-all duration-300 group-hover/feature:scale-110 shadow-lg group-hover/feature:shadow-xl">
          <IconComponent className="w-6 h-6 text-[#4285F4] group-hover/feature:text-white transition-colors duration-300" />
        </div>
      </div>

      <div className="text-xl font-bold mb-3 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-gray-200 group-hover/feature:bg-[#4285F4] transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-[#1E293B] group-hover/feature:text-[#4285F4]">
          {title}
        </span>
      </div>

      <p className="text-[#64748B] leading-relaxed mb-4 relative z-10 px-10 flex-grow">
        {description}
      </p>

      <div className="mt-auto pt-4 border-t border-gray-100 relative z-10 px-10">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#64748B]">{statsLabel}</span>
          <span className="text-sm font-semibold text-[#4285F4] group-hover/feature:scale-105 transition-transform duration-200">
            {stats}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function Product() {
  const coreFeatures = [
    {
      icon: Mail,
      title: "Email Finder",
      description:
        "Find valid, verified emails — whether they’re corporate or personal — using just a name and domain/company. Perfect for hard-to-reach leads, founders, or candidates who don’t use company emails.",
      statsLabel: "Data Freshness",
      stats: "Most Updated",
    },
    {
      icon: Phone,
      title: "Mobile Finder",
      description:
        "Access accurate direct dials with confidence. Our phone data is rigorously verified and constantly updated. Human-verified, globally available, and built for real conversations.",
      statsLabel: "Verification",
      stats: "Human-Verified",
    },
    {
      icon: MailCheck,
      title: "Email Validation",
      description:
        "Validate any email address in real time or bulk. We detect syntax issues, MX records, domain health, and inbox status. Reduce bounce rates. Improve sender reputation. Protect your domain.",
      statsLabel: "Key Benefit",
      stats: "Reduces Bounces",
    },
  ];

  const bonusCapabilities = [
    {
      icon: UploadCloud,
      title: "Bulk Search & CSV Upload",
      description:
        "Efficiently process large datasets. Upload your CSV files and let our platform handle the enrichment seamlessly.",
      statsLabel: "Efficiency",
      stats: "Fast Processing",
    },
    {
      icon: Zap,
      title: "Real-Time API Access",
      description:
        "Integrate gofindy's power directly into your workflows with our fast and reliable RESTful APIs. Comprehensive documentation and SDKs available.",
      statsLabel: "Performance",
      stats: "< 100ms Response",
    },
    {
      icon: Activity,
      title: "Confidence Scoring",
      description:
        "Receive a transparent confidence score with every result, helping you prioritize outreach and trust the data you're using.",
      statsLabel: "Clarity",
      stats: "On All Results",
    },
  ];

  return (
    <section
      id="product"
      className="py-20 px-4 relative overflow-hidden"
      aria-labelledby="product-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#F8FAFC] via-white to-[#F1F5F9] opacity-50" />

      <div className="container mx-auto relative z-10">
        <header className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-[#4285F4] bg-[#4285F4]/10 px-4 py-2 rounded-full">
              CORE CAPABILITIES
            </span>
          </div>
          <h2
            id="product-heading"
            className="text-4xl md:text-5xl font-bold text-[#1E293B] mb-6"
          >
            Connect with Anyone.
            <span className="block text-[#4285F4]">
              Backed by Verified Data.
            </span>
          </h2>
          <p className="text-xl text-[#64748B] max-w-3xl mx-auto leading-relaxed">
            Work or personal — if they’re reachable, we’ll help you find them.
            Our tools are precision-built for outreach teams that don’t settle
            for guesswork.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 py-10 max-w-7xl mx-auto">
          {coreFeatures.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>

        <header className="text-center mt-20 mb-12">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-[#4285F4] bg-[#4285F4]/10 px-4 py-2 rounded-full">
              BONUS CAPABILITIES
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 max-w-7xl mx-auto">
          {bonusCapabilities.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index + 3} />
          ))}
        </div>

        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="text-sm text-[#64748B]">Ready to get started?</div>
            <button className="bg-[#4285F4] hover:bg-[#4285F4]/90 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
              Explore API Docs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
