"use client";

import React from "react";
import { cn } from "@src/lib/utils";
import WidgetInfoPopover from "@src/components/_widgets/WidgetInfoPopover";

type CanceledOrdersProps = {
  value: number;
};

const PERIOD_LABELS = ["01", "02", "03", "04", "05", "06", "07"] as const;

export default function CanceledOrders({ value }: CanceledOrdersProps) {
  return (
    <div className="flex min-h-[250px] flex-col justify-between border border-neutral-200 bg-white p-6 sm:p-7 shadow-sm transition-shadow hover:shadow-md">
      {/* Header Row */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-extrabold uppercase tracking-wide text-[#111111]">
            Canceled Orders
          </h3>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500">
            Return &amp; Cancel Rate
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="border border-neutral-200 bg-[#111111] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
            {value} Total
          </span>
          <WidgetInfoPopover
            title="Canceled Orders"
            summary="Monitors any orders that were cancelled or refunded across recent billing periods so you can verify account order health at a glance."
          />
        </div>
      </div>

      {/* Main Content: Metric + Readable Bar Chart */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="space-y-2 shrink-0">
          <span className="block font-display text-4xl font-extrabold text-[#111111]">
            {value}
          </span>
          <div className="inline-flex items-center gap-1.5 border border-neutral-200 bg-neutral-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-700">
            <span
              className={cn(
                "size-1.5 rounded-full",
                value > 0 ? "bg-[#D70E1D]" : "bg-emerald-600"
              )}
            />
            <span>{value > 0 ? "Needs Review" : "Zero Cancellations"}</span>
          </div>
        </div>

        <div
          aria-label="Canceled orders history chart"
          className="flex h-24 flex-1 max-w-[240px] items-end justify-between gap-2 border-b border-neutral-200 pb-1.5"
        >
          {PERIOD_LABELS.map((label, i) => {
            const isHighlighted = value > 0 && i === PERIOD_LABELS.length - 1;
            const barPercent =
              value > 0 ? (isHighlighted ? 82 : i % 2 === 0 ? 38 : 58) : 8;

            return (
              <div
                key={label}
                className="group flex h-full flex-col items-center justify-end gap-2"
              >
                <div className="relative flex h-16 w-3 items-end overflow-hidden rounded-t-sm bg-neutral-100">
                  <div
                    className={cn(
                      "w-full rounded-t-sm transition-all duration-500",
                      isHighlighted
                        ? "bg-[#D70E1D]"
                        : value > 0
                          ? "bg-neutral-400 group-hover:bg-[#D70E1D]/60"
                          : "bg-neutral-200"
                    )}
                    style={{ height: `${barPercent}%` }}
                  />
                </div>
                <span className="text-[10px] font-bold tracking-tighter text-neutral-500">
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
