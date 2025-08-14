"use client";

import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

const comparisonFeatures = [
  {
    feature: "Multi-layer Signal Enrichment",
    gofindy: "Yes",
    clearbit: "Limited",
    snovio: "None",
  },
  {
    feature: "Mobile Numbers (Direct Dials)",
    gofindy: "Included",
    clearbit: "Not Offered",
    snovio: "Not Offered",
  },
  {
    feature: "Work + Personal Identity Matching",
    gofindy: "Advanced Logic",
    clearbit: "Primarily Work",
    snovio: "Manual Inputs",
  },
  {
    feature: "Noise Filtering + De-duplication",
    gofindy: "Automated",
    clearbit: "Not Included",
    snovio: "Not Included",
  },
  {
    feature: "Live Dataset Sync (Real-Time Updates)",
    gofindy: "Real-Time",
    clearbit: "Batch Updates",
    snovio: "Outdated",
  },
  {
    feature: "Confidence Scoring on All Results",
    gofindy: "Transparent",
    clearbit: "Opaque",
    snovio: "Not Available",
  },
  {
    feature: "GDPR, CCPA, CAN-SPAM Compliance",
    gofindy: "Comprehensive",
    clearbit: "Yes",
    snovio: "Minimal",
  },
  {
    feature: "API Response Time (<800ms avg)",
    gofindy: "Ultra-Fast",
    clearbit: "Variable",
    snovio: "Limited",
  },
  {
    feature: "Transparent Pricing",
    gofindy: "Clear Tiers",
    clearbit: "Hidden Fees",
    snovio: "Yes",
  },
  {
    feature: "Human QA + Verification Layer",
    gofindy: "Always On",
    clearbit: "Not Present",
    snovio: "Not Present",
  },
];

const renderValue = (value: string, provider: string) => {
  let icon = null;
  const text = value;
  const lowerValue = value.toLowerCase();

  // Determine text class based on provider and value positivity
  let textClass = "text-slate-600";
  if (provider === "gofindy") {
    if (
      [
        "yes",
        "included",
        "advanced logic",
        "automated",
        "real-time",
        "transparent",
        "comprehensive",
        "ultra-fast",
        "clear tiers",
        "always on",
      ].includes(lowerValue)
    ) {
      textClass = "text-green-600 font-semibold"; // Emphasized positive for Gofindy
    } else {
      textClass = "text-slate-700 font-medium";
    }
  }

  if (
    [
      "yes",
      "included",
      "advanced logic",
      "automated",
      "real-time",
      "transparent",
      "comprehensive",
      "ultra-fast",
      "clear tiers",
      "always on",
    ].includes(lowerValue)
  ) {
    icon = (
      <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
    );
  } else if (
    [
      "limited",
      "primarily work",
      "manual inputs",
      "batch updates",
      "variable",
      "minimal",
    ].includes(lowerValue)
  ) {
    icon = (
      <AlertTriangle className="w-5 h-5 text-orange-400 mr-2 flex-shrink-0" />
    );
  } else if (
    [
      "none",
      "not offered",
      "not included",
      "outdated",
      "opaque",
      "not available",
      "hidden fees",
      "not present",
    ].includes(lowerValue)
  ) {
    icon = <XCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />;
  }

  return (
    <div className="flex items-center">
      {icon}
      <span className={textClass}>{text}</span>
    </div>
  );
};

export default function ComparisonSection() {
  return (
    <section
      className="bg-slate-50 py-20 md:py-24 px-4"
      aria-labelledby="comparison-heading"
    >
      <div className="container mx-auto">
        <header className="text-center mb-16 md:mb-20">
          <h2
            id="comparison-heading"
            className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-5"
          >
            We are <span className="text-[#4285F4]">way beyond</span> your
            comparison.
          </h2>
          <p className="text-lg md:text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
            We help you reach verified, real people — with compliant,
            human-reviewed signals, trusted by GTM teams who can’t afford to get
            it wrong.
          </p>
        </header>

        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b border-slate-200 bg-slate-100">
                <tr>
                  <th
                    scope="col"
                    className="py-5 px-6 text-left text-xs sm:text-sm font-semibold text-slate-700 uppercase tracking-wider w-1/3 lg:w-2/5"
                  >
                    Feature / Provider
                  </th>
                  <th
                    scope="col"
                    className="py-5 px-6 text-left text-xs sm:text-sm font-semibold text-white uppercase tracking-wider bg-[#01519F] w-1/4 lg:w-1/5" // Darker brand blue for Gofindy header
                  >
                    Dropleads 🏆
                  </th>
                  <th
                    scope="col"
                    className="py-5 px-6 text-left text-xs sm:text-sm font-semibold text-slate-600 uppercase tracking-wider w-1/4 lg:w-1/5"
                  >
                    Clearbit <span className="opacity-60">⚠️</span>
                  </th>
                  <th
                    scope="col"
                    className="py-5 px-6 text-left text-xs sm:text-sm font-semibold text-slate-600 uppercase tracking-wider w-1/4 lg:w-1/5"
                  >
                    Snov.io <span className="opacity-60">🚧</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {comparisonFeatures.map((item) => (
                  <tr
                    key={item.feature}
                    className="group hover:bg-slate-50/70 transition-colors duration-150"
                  >
                    <td className="py-5 px-6 whitespace-normal text-sm font-medium text-slate-800 group-hover:text-slate-900">
                      {item.feature}
                    </td>
                    <td className="py-5 px-6 whitespace-normal text-sm bg-blue-500/5 group-hover:bg-blue-500/10">
                      {renderValue(item.gofindy, "gofindy")}
                    </td>
                    <td className="py-5 px-6 whitespace-normal text-sm">
                      {renderValue(item.clearbit, "clearbit")}
                    </td>
                    <td className="py-5 px-6 whitespace-normal text-sm">
                      {renderValue(item.snovio, "snovio")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-center text-sm text-slate-600 mt-10">
          Comparison based on publicly available information as of May 2025.
          Features and offerings may vary.
        </p>
      </div>
    </section>
  );
}
