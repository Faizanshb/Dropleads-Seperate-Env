"use client";

import type React from "react";
import type { LucideProps } from "lucide-react";

interface QualityFrameworkItemProps {
  icon: React.ComponentType<LucideProps>;
  title: string;
  description: string;
  isActive: boolean;
  onMouseEnter: () => void;
}

export function QualityFrameworkItem({
  icon: IconComponent,
  title,
  description,
  isActive,
  onMouseEnter,
}: QualityFrameworkItemProps) {
  return (
    <div
      className={`group cursor-pointer transition-all duration-300 ${
        isActive ? "scale-[1.02]" : ""
      }`}
      onMouseEnter={onMouseEnter}
      role="listitem"
    >
      <div
        className={`flex items-start gap-4 p-5 rounded-xl transition-all duration-300 ${
          isActive
            ? "bg-white shadow-lg border border-gray-100"
            : "hover:bg-white/60"
        }`}
      >
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
            isActive ? "bg-[#4285F4] shadow-md" : "bg-[#4285F4]/10"
          }`}
        >
          <IconComponent
            className={`w-5 h-5 transition-colors duration-300 ${
              isActive ? "text-white" : "text-[#4285F4]"
            }`}
            aria-hidden="true"
          />
        </div>
        <div className="flex-1">
          <h4
            className={`font-semibold text-md mb-1 transition-colors duration-300 ${
              isActive ? "text-[#4285F4]" : "text-[#1E293B]"
            }`}
          >
            {title}
          </h4>
          <p className="text-sm text-[#64748B] leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
