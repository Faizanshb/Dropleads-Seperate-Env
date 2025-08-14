"use client";

import { motion } from "framer-motion";

interface CurrencyToggleProps {
  currency: "USD" | "INR";
  onCurrencyChange: (currency: "USD" | "INR") => void;
  isLocked?: boolean;
  lockedCurrency?: "USD" | "INR";
  lockedReason?: string;
}

export function CurrencyToggle({
  currency,
  onCurrencyChange,
  isLocked = false,
  lockedCurrency,
  lockedReason = "Currency is locked to your current subscription plan",
}: CurrencyToggleProps) {
  const displayCurrency =
    isLocked && lockedCurrency ? lockedCurrency : currency;

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`relative inline-flex items-center border rounded-xl p-1 gap-1 ${
          isLocked
            ? "bg-slate-100/50 border-slate-200/40 cursor-not-allowed"
            : "bg-slate-50/80 backdrop-blur-sm border-slate-200/60"
        }`}
      >
        {/* Sliding background indicator */}
        <motion.div
          className={`absolute inset-y-1 rounded-lg shadow-sm ${
            isLocked
              ? "bg-slate-200/60 border border-slate-300/60"
              : "bg-white border border-slate-200/80 shadow-sm"
          }`}
          initial={false}
          animate={{
            x: displayCurrency === "USD" ? 4 : "calc(100% + 4px)",
            width: "calc(50% - 6px)",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        />

        {/* USD Button */}
        <button
          onClick={() => !isLocked && onCurrencyChange("USD")}
          disabled={isLocked}
          className={`relative z-10 flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
            displayCurrency === "USD"
              ? isLocked
                ? "text-slate-600"
                : "text-slate-900"
              : isLocked
              ? "text-slate-400"
              : "text-slate-500 hover:text-slate-700"
          } ${isLocked ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          <span className="text-base">🇺🇸</span>
          <span className="font-semibold tracking-tight">USD</span>
        </button>

        {/* INR Button */}
        <button
          onClick={() => !isLocked && onCurrencyChange("INR")}
          disabled={isLocked}
          className={`relative z-10 flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
            displayCurrency === "INR"
              ? isLocked
                ? "text-slate-600"
                : "text-slate-900"
              : isLocked
              ? "text-slate-400"
              : "text-slate-500 hover:text-slate-700"
          } ${isLocked ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          <span className="text-base">🇮🇳</span>
          <span className="font-semibold tracking-tight">INR</span>
        </button>
      </div>

      {/* Locked indicator */}
      {isLocked && lockedReason && (
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200/60">
          <svg
            className="w-3.5 h-3.5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <span className="font-medium">{lockedReason}</span>
        </div>
      )}
    </div>
  );
}
