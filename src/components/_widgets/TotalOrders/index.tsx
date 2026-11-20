"use client";

import React from "react";
import { cn } from "@src/lib/utils";

type TotalOrdersProps = {
  value: number;
  spend: number;
  bars: Array<{ label: string; value: number }>;
};

export default function TotalOrders({ value, spend, bars }: TotalOrdersProps) {
  return (
    <div className="flex h-[250px] items-center justify-between border border-neutral-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-md">
      <div className="space-y-6">
        <div>
          <h3 className="font-display text-lg font-extrabold uppercase tracking-wide text-[#111111]">
            Total Orders
          </h3>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
            All Time Stats
          </p>
        </div>
        <div className="space-y-3">
          <span className="font-display text-4xl font-extrabold text-[#111111]">
            {value}
          </span>
          <div className="w-fit border border-[#D70E1D]/25 bg-[#D70E1D]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D70E1D]">
            ${spend.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Total Spend
          </div>
        </div>
      </div>

      <div className="flex h-36 items-end gap-3 pr-2">
        {bars.map((bar, i) => (
          <div key={i} className="group flex flex-col items-center gap-3">
            <div
              className={cn(
                "w-3 transition-all duration-700 ease-out group-hover:scale-y-110",
                new Date().getDay() === i
                  ? "bg-[#D70E1D] shadow-[0_4px_12px_rgba(215,14,29,0.3)]"
                  : "bg-neutral-200"
              )}
              style={{ height: `${Math.max(bar.value, 15)}%` }}
            />
            <span className="text-[10px] font-bold uppercase tracking-tighter text-neutral-500">
              {bar.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

