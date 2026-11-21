"use client";

import React from "react";
import { cn } from "@src/lib/utils";
import WidgetInfoPopover from "@src/components/_widgets/WidgetInfoPopover";

type TotalOrdersProps = {
  value: number;
  spend: number;
  bars: Array<{ label: string; value: number }>;
};

export default function TotalOrders({ value, spend, bars }: TotalOrdersProps) {
  const todayIndex = new Date().getDay();

  return (
    <div className="flex min-h-[250px] flex-col justify-between border border-neutral-200 bg-white p-6 sm:p-7 shadow-sm transition-shadow hover:shadow-md">
      {/* Header Row */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-extrabold uppercase tracking-wide text-[#111111]">
            Total Orders
          </h3>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500">
            All Time Stats &bull; 7-Day Activity
          </p>
        </div>
        <WidgetInfoPopover
          title="Total Orders"
          summary="Tracks your cumulative Wiz Ofuasia Store purchases (physical merch & digital music releases), total lifetime spend, and daily order distribution across the week."
        />
      </div>

      {/* Main Content: Metric + Readable Bar Chart */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="space-y-2.5">
          <span className="block font-display text-4xl font-extrabold text-[#111111]">
            {value}
          </span>
          <div className="w-fit border border-[#D70E1D]/25 bg-[#D70E1D]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D70E1D]">
            $
            {spend.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            Total Spend
          </div>
        </div>

        {/* 7-Day Bar Chart with Visible Track Rails */}
        <div
          aria-label="Weekly order distribution chart"
          className="flex h-28 items-end gap-2.5 border-b border-neutral-200 pb-1.5"
        >
          {bars.map((bar, i) => {
            const isToday = todayIndex === i;
            const barPercent = bar.value > 0 ? Math.max(bar.value, 18) : 8;
            return (
              <div
                key={`${bar.label}-${i}`}
                title={`${bar.label}: ${Math.round(bar.value)}%`}
                className="group flex h-full flex-col items-center justify-end gap-2"
              >
                <div className="relative flex h-20 w-3.5 items-end overflow-hidden rounded-t-sm bg-neutral-100">
                  <div
                    className={cn(
                      "w-full rounded-t-sm transition-all duration-500 ease-out group-hover:opacity-90",
                      bar.value > 0
                        ? isToday
                          ? "bg-[#D70E1D]"
                          : "bg-[#111111]"
                        : "bg-neutral-200"
                    )}
                    style={{ height: `${barPercent}%` }}
                  />
                </div>
                <span
                  className={cn(
                    "text-[10px] font-bold uppercase tracking-tighter",
                    isToday ? "text-[#D70E1D]" : "text-neutral-500"
                  )}
                >
                  {bar.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
