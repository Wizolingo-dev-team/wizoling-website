"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Disc3 } from "lucide-react";

type DashboardLoaderProps = {
  message?: string;
  eyebrow?: string;
};

export default function DashboardLoader({
  message = "Loading your Dashboard. Please wait...",
  eyebrow = "Wiz Ofuasia (Wiz Boyy)",
}: DashboardLoaderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const content = (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-neutral-50 px-6"
    >
      <div className="flex flex-col items-center text-center space-y-6">
        {/* Bouncing Rounded-Full Red Border Emblem */}
        <div className="relative flex items-center justify-center">
          <span
            aria-hidden="true"
            className="absolute inline-flex size-24 rounded-full border border-[#D70E1D]/30 animate-ping"
          />
          <div className="relative flex size-20 items-center justify-center rounded-full border-2 border-[#D70E1D] bg-white shadow-xl shadow-[#D70E1D]/15 animate-bounce">
            <Disc3 className="size-9 text-[#D70E1D] animate-spin" />
          </div>
        </div>

        {/* Branded Status Copy */}
        <div className="space-y-2 max-w-xs">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#D70E1D]">
            {eyebrow}
          </p>
          <p className="font-display text-sm sm:text-base font-bold uppercase tracking-wider text-[#111111]">
            {message}
          </p>
        </div>

        {/* Animated Shimmer Progress Bar */}
        <div className="h-1 w-48 overflow-hidden rounded-full bg-neutral-200">
          <div className="h-full w-1/2 rounded-full bg-[#D70E1D] animate-[shimmer_1.4s_infinite]" />
        </div>
      </div>
    </div>
  );

  if (mounted && typeof document !== "undefined") {
    return createPortal(content, document.body);
  }

  return content;
}
