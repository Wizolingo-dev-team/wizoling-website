"use client";

import React from "react";

type PendingOrdersProps = {
  value: number;
  total: number;
};

export default function PendingOrders({ value, total }: PendingOrdersProps) {
  const percentage = total > 0 ? (value / total) * 100 : 0;

  return (
    <div className="flex h-[250px] items-center justify-between border border-neutral-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-md">
      <div className="space-y-6">
        <div>
          <h3 className="font-display text-lg font-extrabold uppercase tracking-wide text-[#111111]">
            Pending Orders
          </h3>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
            Current Processing
          </p>
        </div>
        <div className="space-y-1">
          <span className="font-display text-4xl font-extrabold text-[#111111]">
            {value}
          </span>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D70E1D]">
            In Queue
          </p>
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <svg className="size-36 -rotate-90 transform">
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
            cx="72"
            cy="72"
            r="58"
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-neutral-200"
          />
          <circle
            cx="72"
            cy="72"
            r="58"
            stroke="url(#wizPrimaryGradient)"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={364.4}
            strokeDashoffset={364.4 - (364.4 * percentage) / 100}
            strokeLinecap="square"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="font-display text-xl font-extrabold text-[#111111]">
            {Math.round(percentage)}%
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
            of total
          </span>
        </div>
      </div>
    </div>
  );
}

