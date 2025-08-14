"use client";

import { Play, Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";

interface ApiResponseMockupProps {
  codeExample: string;
  title?: string;
}

export function ApiResponseMockup({
  codeExample,
  title = "API Response Example",
}: ApiResponseMockupProps) {
  const [copied, setCopied] = useState(false);
  const [typedCode, setTypedCode] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < codeExample.length) {
        setTypedCode(codeExample.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 15);
    return () => clearInterval(timer);
  }, [codeExample]);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative lg:sticky lg:top-24">
      <div className="bg-[#1E293B] rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50">
        <div className="flex items-center justify-between p-4 bg-[#334155] border-b border-gray-600">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
            <span className="text-sm text-gray-300 font-mono">{title}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200"
              aria-label="Copy code"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" />
              )}
            </button>
            <div className="w-8 h-8 bg-[#4285F4] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#4285F4]/80">
              <Play className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
        <div className="p-6 font-mono text-xs sm:text-sm leading-relaxed max-h-[500px] overflow-y-auto">
          <pre className="text-gray-300 whitespace-pre-wrap">
            <code>{typedCode}</code>
            <span className="animate-pulse text-[#4285F4]">|</span>
          </pre>
        </div>
      </div>
      <div className="absolute -top-4 -right-4 bg-white rounded-xl p-3 shadow-lg border border-gray-100 text-center">
        <div className="text-xl font-bold text-[#4285F4]">99.9%</div>
        <div className="text-xs text-[#64748B]">Data Uptime</div>
      </div>
      <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-3 shadow-lg border border-gray-100 text-center">
        <div className="text-xl font-bold text-[#4285F4]">&lt;100ms</div>
        <div className="text-xs text-[#64748B]">API Response</div>
      </div>
    </div>
  );
}
