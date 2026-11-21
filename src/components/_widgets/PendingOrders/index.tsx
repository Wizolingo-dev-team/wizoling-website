"use client";

import React from "react";
import WidgetInfoPopover from "@src/components/_widgets/WidgetInfoPopover";

type PendingOrdersProps = {
  value: number;
  total: number;
};

export default function PendingOrders({ value, total }: PendingOrdersProps) {
  const percentage = total > 0 ? Math.min(100, (value / total) * 100) : 0;
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (circumference * percentage) / 100;

  return (
    <div className="flex min-h-[250px] flex-col justify-between border border-neutral-200 bg-white p-6 sm:p-7 shadow-sm transition-shadow hover:shadow-md">
      {/* Header Row */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-extrabold uppercase tracking-wide text-[#111111]">
            Pending Orders
          </h3>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500">
            Current Processing &amp; Transit
          </p>
        </div>
        <WidgetInfoPopover
          title="Pending Orders"
          summary="Shows orders currently in Processing, Payment Confirmed, or On the Way status, along with the percentage of your total orders awaiting fulfillment."
        />
      </div>

      {/* Main Content: Metric + Donut Ring */}
      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="space-y-2">
          <span className="block font-display text-4xl font-extrabold text-[#111111]">
            {value}
          </span>
          <div className="inline-flex items-center gap-1.5 border border-amber-500/30 bg-amber-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-700">
            <span className="size-1.5 rounded-full bg-amber-500" />
            <span>In Queue</span>
          </div>
        </div>

        <div className="relative flex size-32 shrink-0 items-center justify-center">
          <svg viewBox="0 0 128 128" className="size-32 -rotate-90">
            <defs>
              <linearGradient
                id="wizPrimaryGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#D70E1D" />
                <stop offset="100%" stopColor="#FF3B4B" />
              </linearGradient>
            </defs>
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="currentColor"
              strokeWidth="10"
              fill="transparent"
              className="text-neutral-100"
            />
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="url(#wizPrimaryGradient)"
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              className="transition-all duration-700"
            />
          </svg>
          <div className="absolute flex flex-col items-center text-center">
            <span className="font-display text-xl font-extrabold text-[#111111]">
              {Math.round(percentage)}%
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-500">
              of total
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
