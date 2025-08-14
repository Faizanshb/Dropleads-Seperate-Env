"use client";

import { useState, useEffect } from "react";
import { X, Copy, Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PromotionalBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  const [textIndex, setTextIndex] = useState(0);
  const BANNER_KEY = "dropleads-promo-banner-dismissed";

  const rotatingTexts = [
    "Emails on Scale",
    "Unlimited API calls",
    "Premium Data access",
    "Advanced Analytics",
  ];

  useEffect(() => {
    const isDismissed = localStorage.getItem(BANNER_KEY);
    if (!isDismissed) {
      setTimeout(() => {
        setIsVisible(true);
        setIsAnimating(true);
      }, 800);
    }
  }, []);

  // Text rotation effect
  useEffect(() => {
    if (!isVisible) return;
    const textTimer = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000);
    return () => clearInterval(textTimer);
  }, [isVisible, rotatingTexts.length]);

  // Countdown timer effect
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft({ days, hours, minutes });

      if (distance < 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleDismiss = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem(BANNER_KEY, "true");
    }, 400);
  };

  const copyPromoCode = async () => {
    try {
      await navigator.clipboard.writeText("LAUNCH50");
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes checkmark {
          0% {
            transform: scale(0) rotate(0deg);
          }
          50% {
            transform: scale(1.2) rotate(180deg);
          }
          100% {
            transform: scale(1) rotate(360deg);
          }
        }
        @keyframes success {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          100% {
            opacity: 0;
            transform: scale(1);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed-1 {
          animation: float 4s ease-in-out infinite 1s;
        }
        .animate-float-delayed-2 {
          animation: float 5s ease-in-out infinite 2s;
        }
      `}</style>

      <div
        className={`fixed top-0 left-0 right-0 z-[60] bg-[#4285F4] text-white overflow-hidden transition-all duration-700 ${
          isAnimating
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
        data-banner="true"
      >
        {/* Subtle animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg
            className="absolute inset-0"
            viewBox="0 0 60 60"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" fillRule="evenodd">
              <g fill="#ffffff" fillOpacity="0.1">
                <circle cx="30" cy="30" r="2" />
              </g>
            </g>
          </svg>
        </div>

        {/* Floating elements with advanced animations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1 left-1/4 w-1.5 h-1.5 bg-white/20 rounded-full animate-float"></div>
          <div className="absolute top-2 right-1/3 w-1 h-1 bg-white/30 rounded-full animate-float-delayed-1"></div>
          <div className="absolute bottom-1 left-1/3 w-1 h-1 bg-white/15 rounded-full animate-float-delayed-2"></div>
        </div>

        <div className="relative py-2 px-4">
          <div className="container mx-auto flex items-center justify-center relative max-w-7xl">
            <div className="flex items-center gap-3 sm:gap-6 flex-wrap justify-center">
              {/* Lightning icon with pulse */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Zap
                    className="h-4 w-4 text-white animate-pulse"
                    fill="currentColor"
                  />
                  <div className="absolute inset-0 animate-ping">
                    <Zap className="h-4 w-4 text-white opacity-30" />
                  </div>
                </div>
                <span className="font-bold text-sm tracking-wide">
                  $2.5M Funded
                </span>
              </div>

              <div className="hidden sm:block w-px h-4 bg-white/30"></div>

              {/* Rotating text with smooth transitions */}
              <div className="relative h-6 flex items-center overflow-hidden">
                <span className="font-semibold text-sm mr-2">Get</span>
                <div className="relative w-40 h-full">
                  {rotatingTexts.map((text, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 flex items-center font-bold text-sm transition-all duration-700 ${
                        index === textIndex
                          ? "translate-y-0 opacity-100"
                          : index < textIndex
                          ? "-translate-y-full opacity-0"
                          : "translate-y-full opacity-0"
                      }`}
                    >
                      <span className="text-white">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hidden sm:block w-px h-4 bg-white/30"></div>

              {/* Minimalist countdown */}
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/20">
                <span className="text-xs font-medium opacity-90">Ends in</span>
                <div className="flex gap-1.5 font-mono font-bold text-xs">
                  <div className="flex flex-col items-center">
                    <span className="leading-none">
                      {String(timeLeft.days).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] opacity-70 leading-none">
                      d
                    </span>
                  </div>
                  <span className="opacity-50 self-start">:</span>
                  <div className="flex flex-col items-center">
                    <span className="leading-none">
                      {String(timeLeft.hours).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] opacity-70 leading-none">
                      h
                    </span>
                  </div>
                  <span className="opacity-50 self-start">:</span>
                  <div className="flex flex-col items-center">
                    <span className="leading-none">
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] opacity-70 leading-none">
                      m
                    </span>
                  </div>
                </div>
              </div>

              <div className="hidden sm:block w-px h-4 bg-white/30"></div>

              {/* Sophisticated promo code button */}
              <button
                onClick={copyPromoCode}
                className="group relative bg-white text-[#4285F4] px-4 py-1.5 rounded-lg font-bold text-xs tracking-wide transition-all duration-300 hover:bg-white/95 active:scale-95 border border-white/20"
              >
                <div className="flex items-center gap-2">
                  <span className="relative z-10">LAUNCH50</span>
                  <div className="relative z-10">
                    {copied ? (
                      <Check className="h-3 w-3 text-green-600" />
                    ) : (
                      <Copy className="h-3 w-3 transition-transform duration-200 group-hover:scale-110" />
                    )}
                  </div>
                </div>

                {/* Subtle hover effect */}
                <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Success state overlay */}
                {copied && (
                  <div className="absolute inset-0 bg-green-50 rounded-lg opacity-50"></div>
                )}

                <div className="text-[10px] opacity-80 group-hover:opacity-100 transition-opacity absolute -bottom-3 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  {copied ? "Copied!" : "Click to copy"}
                </div>
              </button>
            </div>

            {/* Refined close button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 rounded-lg group"
              aria-label="Dismiss banner"
            >
              <X className="h-3 w-3 transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110" />
            </Button>
          </div>
        </div>

        {/* Subtle bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20"></div>
      </div>
    </>
  );
}
