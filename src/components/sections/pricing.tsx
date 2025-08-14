"use client";

import { Button } from "@/components/ui/button";
import { PricingCard } from "@/components/ui/pricing-plan-card"; // Abstracted component
import {
  Database,
  Star,
  Shield,
  Zap,
  Mail,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Use Next.js router for navigation
import { CurrencyToggle } from "../credit/currency-toggle";
type Currency = "USD" | "INR";

interface PricingPlan {
  name: string;
  credits: number;
  perCreditCost: {
    USD: number;
    INR: number;
  };
  price: {
    USD: number;
    INR: number;
  };
  priceId: {
    USD: string;
    INR: string;
  };
  features: {
    rollover: string;
    apiAccess: boolean;
    support: string;
  };
  isPopular: boolean;
  isCustomPlan?: boolean; // Added this property
}

export default function Pricing() {
  const router = useRouter();
    const [currency, setCurrency] = useState<Currency>("USD");

  const pricingPlans: PricingPlan[] = [
    {
      name: "Starter",
      credits: 2000,
      perCreditCost: {
        USD: 0.0145,
        INR: 1.2,
      },
      price: {
        USD: 29,
        INR: 2400,
      },
      priceId: {
        USD: "",
        INR: "",
      },
      features: {
        rollover: "All Credits",
        apiAccess: true,
        support: "Basic",
      },
      isPopular: false,
    },
    {
      name: "Growth",
      credits: 5000,
      perCreditCost: {
        USD: 0.0098,
        INR: 0.82,
      },
      price: {
        USD: 49,
        INR: 4100,
      },
      priceId: {
        USD: "",
        INR: "",
      },
      features: {
        rollover: "All Credits",
        apiAccess: true,
        support: "Basic",
      },
      isPopular: false,
    },
    {
      name: "Professional",
      credits: 12500,
      perCreditCost: {
        USD: 0.0079,
        INR: 0.67,
      },
      price: {
        USD: 99,
        INR: 8400,
      },
      priceId: {
        USD: "",
        INR: "",
      },
      features: {
        rollover: "All Credits",
        apiAccess: true,
        support: "Priority",
      },
      isPopular: true,
    },
    {
      name: "Business",
      credits: 30000,
      perCreditCost: {
        USD: 0.0066,
        INR: 0.56,
      },
      price: {
        USD: 199,
        INR: 16700,
      },
      priceId: {
        USD: "",
        INR: "",
      },
      features: {
        rollover: "All Credits",
        apiAccess: true,
        support: "Priority",
      },
      isPopular: false,
    },
    {
      name: "Enterprise",
      credits: 50000,
      perCreditCost: {
        USD: 0.006,
        INR: 0.5,
      },
      price: {
        USD: 299,
        INR: 25100,
      },
      priceId: {
        USD: "",
        INR: "",
      },
      features: {
        rollover: "All Credits",
        apiAccess: true,
        support: "Dedicated",
      },
      isPopular: false,
    },
    {
      name: "Ultimate",
      credits: 100000,
      perCreditCost: {
        USD: 0.00549,
        INR: 0.46,
      },
      price: {
        USD: 549,
        INR: 46000,
      },
      priceId: {
        USD: "",
        INR: "",
      },
      features: {
        rollover: "All Credits",
        apiAccess: true,
        support: "Dedicated",
      },
      isPopular: false,
    },

  ];

  // const plans = [
  //   {
  //     id: "starter",
  //     name: "Starter",
  //     bestFor: "Freelancers / Solopreneurs",
  //     price: "$49",
  //     priceSuffix: "/mo",
  //     keyFeatures: ["Enrichment + Validation"],
  //     support: "Email",
  //     buttonText: "Choose Starter",
  //     highlighted: false, // This will be controlled by selectedPlanId
  //   },
  //   {
  //     id: "pro",
  //     name: "Pro",
  //     bestFor: "Growing GTM Teams",
  //     price: "$199",
  //     priceSuffix: "/mo",
  //     keyFeatures: ["Enrichment + Validation", "+ API, Mobile"],
  //     support: "Chat + Email",
  //     buttonText: "Choose Pro",
  //     highlighted: true,
  //     badgeText: "MOST POPULAR",
  //   },
  //   {
  //     id: "enterprise",
  //     name: "Enterprise",
  //     bestFor: "High-volume Sales/Recruiting Ops",
  //     price: "Custom",
  //     priceSuffix: "",
  //     keyFeatures: [
  //       "Enrichment + Validation",
  //       "+ API, Mobile",
  //       "+ SLA, Onboarding",
  //     ],
  //     support: "Dedicated AM",
  //     buttonText: "Contact Sales",
  //     highlighted: false,
  //   },
  // ];

  const customerAvatars = [
    "SF", // Simplified for placeholder
    "HS",
    "CL",
    "AP",
    "ZI",
  ];



  // Update the render section to include custom plan
  const renderPricingCards = () => {
    // Return an array of PricingCard components
    return pricingPlans.map((plan) => (
      <PricingCard
        key={plan.name}
        name={plan.name}
        price={plan.price[currency]}
        credits={plan.credits}
        perCreditCost={plan.perCreditCost[currency]}
        features={plan.features}
        isPopular={plan.isPopular}
        currency={currency}
        isLoading={false}
        isCustomPlan={plan.isCustomPlan} // Pass the isCustomPlan prop
      />
    ));
  };

  return (
    <section
      id="pricing"
      className="py-24 px-4 bg-gradient-to-b from-[#F8FAFC] to-white"
      aria-labelledby="pricing-main-heading"
    >
      <div className=" mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2
            id="pricing-main-heading"
            className="text-5xl md:text-6xl font-bold text-[#1E293B] mb-4"
          >
            PRICING
          </h2>
          <p className="text-2xl md:text-3xl font-medium text-slate-700 mb-12 max-w-3xl mx-auto">
            Simple, Transparent Pricing That Scales with Your Growth
          </p>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-12">
            <div className="flex items-center gap-2 text-[#64748B]">
              <div className="w-8 h-8 bg-[#4285F4]/10 rounded-full flex items-center justify-center">
                <Database className="w-4 h-4 text-[#4285F4]" />
              </div>
              <span className="text-sm font-medium">
                Real-time data enrichment
              </span>
            </div>
            <div className="flex items-center gap-2 text-[#64748B]">
              <div className="w-8 h-8 bg-[#4285F4]/10 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-[#4285F4]" />
              </div>
              <span className="text-sm font-medium">
                95%+ accuracy guarantee
              </span>
            </div>
            <div className="flex items-center gap-2 text-[#64748B]">
              <div className="w-8 h-8 bg-[#4285F4]/10 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-[#4285F4]" />
              </div>
              <span className="text-sm font-medium">
                14-day money back guarantee
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="flex -space-x-3">
              {customerAvatars.map((avatarText, index) => (
                <div
                  key={index}
                  className="w-10 h-10 rounded-full border-2 border-white bg-[#4285F4]/10 flex items-center justify-center text-xs font-bold text-[#4285F4]"
                  aria-label={`Logo for ${avatarText}`}
                >
                  {avatarText}
                </div>
              ))}
            </div>
            <div
              className="flex items-center gap-1"
              role="img"
              aria-label="5 out of 5 stars"
            >
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-sm text-[#64748B]">from 500+ data teams</span>
          </div>
        </div>

        <div>
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">
              Monthly Subscription Plans
            </h2>
            <p className="text-slate-600">
              Select the perfect plan for your data enrichment needs
            </p>
            <CurrencyToggle
              currency={currency}
              onCurrencyChange={setCurrency}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-0 gap-4 mt-4">
            {renderPricingCards()}
          </div>
          {/* {plans.map((plan) => (
            <PricingPlanCard
              key={plan.id}
              {...plan}
              highlighted={
                selectedPlanId === plan.id ||
                (plan.id === "pro" && selectedPlanId === "pro")
              } // Pro is default highlighted, or selected one
              badgeText={plan.id === "pro" ? "MOST POPULAR" : undefined} // Ensure badge only for pro
              onSelect={setSelectedPlanId}
            />
          ))} */}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-700">
            Need help choosing a plan?{" "}
            <a
              href="https://calendly.com/dropleads-support/30min"
              className="text-[#4285F4] font-semibold hover:underline"
            >
              Talk to Sales <ArrowRight className="inline w-4 h-4 -mt-0.5" />
            </a>
          </p>
        </div>

        <section id="support" className="mt-10">
          <div className="mt-20 pt-16 border-t border-slate-200">
            <header className="text-center mb-12">
              <h3 className="text-4xl font-bold text-[#1E293B] mb-3">
                📬 Let’s Talk — Get the Data Edge
              </h3>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Have questions? Want a custom plan? Book a quick call and see
                how we can help your team unlock accurate, revenue-ready data.
              </p>
            </header>
            <div className="text-center mb-10">
              <Button
                size="lg"
                className="bg-[#4285F4] hover:bg-[#4285F4]/90 text-white px-8 py-4 text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => {
                  router.push("https://calendly.com/dropleads-support/30min");
                }}
              >
                🚀 Book a Call <ArrowRight className="inline w-5 h-5 ml-2" />
              </Button>
            </div>
            <div className="text-center text-slate-600 space-y-3">
              <p>Or reach us directly:</p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-x-6 gap-y-3">
                <a
                  href="mailto:ales@dropleads.io"
                  className="flex items-center gap-2 hover:text-[#4285F4]"
                >
                  <Mail className="w-5 h-5" /> sales@dropleads.io
                </a>
              </div>
              <p className="flex items-center justify-center gap-2">
                <MessageSquare className="w-5 h-5" /> Live Chat: Reach out to
                the chatbot on the bottom right corner.
              </p>
            </div>
          </div>

          <div className="text-center mt-16 space-y-2">
            <p className="text-sm text-[#64748B]">
              Prices in USD. All plans include GDPR compliance.
            </p>
            <p className="text-sm text-[#64748B] flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" />
              Secure payment processing. SOC 2 Type II certified.
            </p>
          </div>
        </section>
      </div>
    </section>
  );
}
