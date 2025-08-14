"use client";

import {
  DatabaseZap,
  Layers,
  Activity,
  UserCheck,
  Users,
  Filter,
  Shield,
} from "lucide-react";
import { QualityFrameworkItem } from "@/components/ui/quality-framework-item"; 
import { ApiResponseMockup } from "@/components/ui/api-response-mockup";
import { useState } from "react";

export default function DataQuality() {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

  const qualityFrameworkFeatures = [
    {
      icon: Layers,
      title: "Multi-Layered Validation",
      description:
        "Every email, phone number, and company is verified through syntax, domain, SMTP, and deliverability checks — not just guessed.",
    },
    {
      icon: Activity,
      title: "Confidence Scoring",
      description:
        "Each result comes with a confidence score and enrichment level, so you know what’s rock-solid and what needs a second look.",
    },
    {
      icon: UserCheck,
      title: "Human Verification & Internal QA",
      description:
        "Behind every API response is a team of experts continuously reviewing data quality and flagging anomalies — ensuring you get the most reliable contacts.",
    },
    {
      icon: Users,
      title: "Crowdsourced Signals",
      description:
        "We enrich our dataset with verified contributions from trusted partners and community sources, adding fresh insights beyond static databases.",
    },
    {
      icon: Filter,
      title: "Auto De-Duplication & Noise Filtering",
      description:
        "We eliminate duplicates, disposable emails, spam traps, and low-quality domains to keep your lists clean and deliverability high.",
    },
    {
      icon: DatabaseZap,
      title: "Live Database Sync",
      description:
        "Our engine pulls from continuously updated sources and proprietary data signals — not stale, static databases.",
    },
    {
      icon: Shield,
      title: "Compliance-First",
      description:
        "Built with GDPR, CCPA, and CAN-SPAM in mind. Clean data is also ethical data.",
    },
  ];

  const apiCodeExample = `{
"contact_found": true,
"email": "jane.doe@examplecorp.com",
"email_confidence": 0.98,
"email_validation": {
  "status": "valid",
  "deliverable": true,
  "is_role_account": false
},
"phone_mobile": "+15550123456",
"phone_confidence": 0.92,
"company_name": "ExampleCorp Inc.",
"title": "Senior Marketing Manager",
"linkedin_url": "linkedin.com/in/janedoe",
"data_sources": ["internal_db", "linkedin", "public_records"],
"last_updated": "2025-05-29T10:30:00Z"
}`;

  return (
    <section
      className="py-20 px-4 bg-gradient-to-br from-white via-[#F8FAFC] to-white relative overflow-hidden"
      aria-labelledby="data-quality-heading"
    >
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#4285F4]/5 rounded-full blur-3xl opacity-70" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#4285F4]/3 rounded-full blur-3xl opacity-70" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-x-16 gap-y-12 lg:items-center">
          <div>
            <div className="mb-6">
              <span className="text-sm font-semibold text-[#4285F4] bg-[#4285F4]/10 px-4 py-2 rounded-full">
                DATA QUALITY FEATURES
              </span>
            </div>

            <h2
              id="data-quality-heading"
              className="text-4xl md:text-5xl font-bold text-[#1E293B] mb-6"
            >
              The Cleanest Data Pipeline
              <span className="block text-[#4285F4]">You’ll Ever Use</span>
            </h2>

            <p className="text-xl text-[#64748B] mb-12 leading-relaxed">
              We obsess over data quality, so you don’t have to. Every result
              you get is filtered, validated, and scored — in real time.
            </p>

            <h3 className="text-2xl font-semibold text-[#1E293B] mb-6">
              🔐 Our Quality Framework:
            </h3>
            <div className="space-y-6">
              {qualityFrameworkFeatures.map((feature, index) => (
                <QualityFrameworkItem
                  key={feature.title}
                  {...feature}
                  isActive={activeFeatureIndex === index}
                  onMouseEnter={() => setActiveFeatureIndex(index)}
                />
              ))}
            </div>
          </div>

          <ApiResponseMockup codeExample={apiCodeExample} />
        </div>
      </div>
    </section>
  );
}
