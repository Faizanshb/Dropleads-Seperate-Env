"use client";

import type React from "react";
import { Button } from "@/components/ui/button";

import {
  CheckCircle,
  Database,
  Users,
  Building2,
  Mail,
  Phone,
  Shield,
  ArrowDown,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { useState, useEffect } from "react";


export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const dataPoints = [
    { icon: Users, label: "Employee Data", color: "from-blue-500 to-cyan-500" },
    {
      icon: Building2,
      label: "Company Info",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Mail,
      label: "Email Finder",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Phone,
      label: "Phone Numbers",
      color: "from-orange-500 to-red-500",
    },
  ];

  const integrations = [
    { name: "Salesforce", logo: "SF" },
    { name: "HubSpot", logo: "HS" },
    { name: "Clay", logo: "CL" },
    { name: "Apollo", logo: "AP" },
  ];

  // Local component for Workflow Card items for better readability
  const WorkflowItemCard = ({
    icon: Icon,
    label,
    color,
  }: {
    icon: React.ElementType;
    label: string;
    color: string;
  }) => (
    <div className="bg-gray-50 rounded-xl p-4 hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer group">
      <div
        className={`w-10 h-10 bg-gradient-to-r ${color} rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="text-xs text-[#64748B]">{label}</div>
    </div>
  );

  const IntegrationItemCard = ({
    logo,
    name,
  }: {
    logo: string;
    name: string;
  }) => (
    <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 hover:bg-white hover:shadow-md transition-all duration-300">
      <div className="w-10 h-10 bg-[#4285F4]/10 rounded-lg flex items-center justify-center font-bold text-[#4285F4]">
        {logo}
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium text-[#1E293B]">{name}</div>
        <div className="text-xs text-green-600">Connected</div>
      </div>
      <div className="w-2 h-2 bg-green-500 rounded-full" />
    </div>
  );

  return (
    <section
      className="relative py-24 px-4 mt-0 overflow-hidden min-h-[90vh]"
      id="hero"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-96 h-96 bg-[#4285F4]/5 rounded-full blur-3xl transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${
              mousePosition.y * 0.02
            }px)`,
            top: "10%",
            left: "10%",
            opacity: 0.4,
          }}
        />
        <div
          className="absolute w-80 h-80 bg-[#4285F4]/3 rounded-full blur-3xl transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${
              mousePosition.y * -0.01
            }px)`,
            bottom: "10%",
            right: "10%",
            opacity: 0.4,
          }}
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:block">
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
              <div className="text-3xl font-bold text-[#1E293B]">95%</div>
              <div className="text-sm text-[#64748B] flex items-center gap-2">
                Accuracy Rate
                <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="w-[95%] h-full bg-[#4285F4] rounded-full" />
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
              <div className="text-3xl font-bold text-[#1E293B]">50K+</div>
              <div className="text-sm text-[#64748B]">API Calls/min</div>
            </div>
          </div>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-8 h-8 text-green-500" />
              <div>
                <div className="text-sm font-semibold text-[#1E293B]">
                  Enterprise Security
                </div>
                <div className="text-xs text-[#64748B]">
                  SOC 2 Type II Certified
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-green-600">
              <CheckCircle className="w-4 h-4" />
              GDPR Compliant
            </div>
          </div>
        </div>

        <div className="text-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h1
              id="hero-heading"
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1E293B] mb-6 leading-tight"
            >
              Real-time B2B Data
              <span className="block text-[#4285F4]">Enrichment Platform</span>
            </h1>
          </div>

          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-xl md:text-2xl text-[#64748B] mb-8 max-w-3xl mx-auto leading-relaxed">
              Get accurate, real-time B2B data enrichment for people and
              companies — without the noise, bounces, or guesswork. Trusted by
              high-performance teams to power sales, recruiting, and growth
            </p>
          </div>

          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                size="lg"
                className="group bg-[#4285F4] hover:bg-[#4285F4]/90 text-white px-8 py-4 text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                aria-label="Start Free"
                onClick={() => {
                  window.location.href = "https://app.dropleads.io/auth/signup";
                }}
              >
                Start Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group border-2 border-gray-300 text-[#1E293B] hover:border-[#4285F4] hover:text-[#4285F4] hover:bg-[#4285F4]/10 px-8 py-4 text-lg font-semibold transition-all duration-300 cursor-pointer"
                aria-label="View API Docs"
                onClick={() => {
                  window.location.href = "https://dropleads.readme.io/reference/email-finder";
                }}
              >
                <BookOpen className="w-5 h-5 mr-2 group-hover:scale-105 transition-transform" />
                View API Docs
              </Button>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 delay-600 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative max-w-5xl mx-auto">
              {/* Connection lines SVG can be kept or removed if deemed unnecessary clutter */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ zIndex: 0 }}
              >
                <defs>
                  <linearGradient
                    id="gradient1"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#4285F4" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="#4285F4" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#4285F4" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                {/* Simplified or remove lines if not essential for the "optimized" look */}
              </svg>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50">
                  <h3 className="text-lg font-semibold text-[#1E293B] mb-6">
                    Your Data Sources
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {dataPoints.map((point) => (
                      <WorkflowItemCard key={point.label} {...point} />
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-[#4285F4]/10 blur-3xl rounded-full scale-150" />
                  <div className="relative bg-white rounded-3xl p-8 shadow-xl border-2 border-[#4285F4]/20">
                    <div className="flex justify-center mb-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-[#4285F4] to-[#4285F4]/80 rounded-2xl flex items-center justify-center shadow-lg">
                        <Database className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    {/* Re-add Badge if needed, or remove import if not used */}
                    {/* <Badge className="mb-4 bg-[#4285F4]/10 text-[#4285F4] border-[#4285F4]/20">
                      <Zap className="w-3 h-3 mr-1" />
                      gofindy API
                    </Badge> */}
                    <p className="text-center text-sm font-semibold text-[#4285F4] mb-2">
                      DropLeads API
                    </p>
                    <p className="text-sm text-[#64748B] mb-4 text-center">
                      Intelligent data enrichment engine
                    </p>
                    <div className="flex justify-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-100" />
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-200" />
                    </div>
                  </div>
                  <div className="absolute -left-20 top-1/2 -translate-y-1/2 hidden lg:block">
                    <div className="w-4 h-4 bg-[#4285F4] rounded-full animate-ping" />
                  </div>
                  <div className="absolute -right-20 top-1/2 -translate-y-1/2 hidden lg:block">
                    <div className="w-4 h-4 bg-[#4285F4] rounded-full animate-ping delay-500" />
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50">
                  <h3 className="text-lg font-semibold text-[#1E293B] mb-6">
                    Your Applications
                  </h3>
                  <div className="space-y-3">
                    {integrations.map((integration) => (
                      <IntegrationItemCard
                        key={integration.name}
                        {...integration}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 -bottom-16">
                <ArrowDown className="w-6 h-6 text-[#4285F4] animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
