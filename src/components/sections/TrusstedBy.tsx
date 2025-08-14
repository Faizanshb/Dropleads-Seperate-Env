"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";

export default function TrustedBy() {
  const companies = [
    { name: "Salesforce", logo: "Salesforce" },
    { name: "Clay", logo: "Clay" },
    { name: "HubSpot", logo: "HubSpot" },
    { name: "Outreach", logo: "Outreach" },
    { name: "Apollo", logo: "Apollo" },
    { name: "ZoomInfo", logo: "ZoomInfo" },
    { name: "Gong", logo: "Gong" },
    { name: "Clearbit", logo: "Clearbit" },
  ];

  // Duplicate companies for seamless looping
  const duplicatedCompanies = [...companies, ...companies, ...companies]; // Tripled for even smoother long scroll

  return (
    <section
      className="py-24 px-4 bg-slate-50 overflow-hidden"
      aria-labelledby="trusted-by-main-heading"
    >
      <div className="container mx-auto">
        <header className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-[#4285F4] bg-[#4285F4]/10 px-4 py-2 rounded-full">
              INDUSTRY TRUSTED
            </span>
          </div>
          <h2
            id="trusted-by-main-heading"
            className="text-4xl md:text-5xl font-bold text-[#1E293B] mb-6"
          >
            Trusted by Teams Who Can’t Afford{" "}
            <span className="block sm:inline text-[#4285F4]">Bad Data</span>
          </h2>
          <p className="text-xl text-[#64748B] max-w-3xl mx-auto leading-relaxed">
            From high-velocity startups to enterprise dealmakers — our
            enrichment powers decisions that move the needle.
          </p>
        </header>

        <div className="relative group">
          {/* Gradient fades for seamless loop */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-16" // Increased gap for better visual separation
            animate={{
              x: ["0%", "-100%"], // Animate one full set of original companies
              transition: {
                ease: "linear",
                duration: 60, // Slower duration for a more premium feel
                repeat: Number.POSITIVE_INFINITY,
              },
            }}
          >
            {duplicatedCompanies.map((company, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-auto py-6 px-10" // Auto width based on content, more padding
                aria-label={`${company.name} logo`}
              >
                <span className="text-3xl font-medium text-slate-500 hover:text-slate-800 transition-colors duration-300 cursor-pointer">
                  {company.logo}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="mt-20 flex flex-col items-center space-y-3">
          <div
            className="flex items-center"
            role="img"
            aria-label="5 out of 5 stars rating"
          >
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 text-yellow-400 fill-yellow-400"
                aria-hidden="true"
              />
            ))}
          </div>
          <p className="text-slate-600 text-lg">
            <span className="font-semibold text-slate-700">4.8/5 stars</span>{" "}
            based on 500+ reviews
          </p>
        </div>
      </div>
    </section>
  );
}
