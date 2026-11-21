"use client";

import React from "react";
import WidgetInfoPopover from "@src/components/_widgets/WidgetInfoPopover";

type DeliveredOrdersProps = {
  value: number;
};

const WEEK_DAYS = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"] as const;

export default function DeliveredOrders({ value }: DeliveredOrdersProps) {
  const hasDeliveries = value > 0;
  const linePath = hasDeliveries
    ? "M0 68 C 35 60, 65 22, 100 38 C 135 54, 165 26, 200 32 C 235 38, 265 18, 300 14"
    : "M0 78 L 300 78";
  const areaPath = `${linePath} L 300 90 L 0 90 Z`;

  return (
    <div className="flex min-h-[250px] flex-col justify-between border border-neutral-200 bg-white p-6 sm:p-7 shadow-sm transition-shadow hover:shadow-md">
      {/* Header Row */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-extrabold uppercase tracking-wide text-[#111111]">
            Delivered Orders
          </h3>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500">
            Weekly Fulfillment Trend
          </p>
        </div>
        <WidgetInfoPopover
          title="Delivered Orders"
          summary="Displays your successfully completed and delivered store orders along with your weekly fulfillment trend curve."
        />
      </div>

      {/* Contained Non-Overlapping Metric + Area Trend Chart */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-end justify-between gap-5">
        <div className="space-y-2 shrink-0">
          <span className="block font-display text-4xl font-extrabold text-[#111111]">
            {value}
          </span>
          <div className="inline-flex items-center gap-1.5 border border-emerald-600/25 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700">
            <span className="size-1.5 rounded-full bg-emerald-600" />
            <span>Completed</span>
          </div>
        </div>

        <div className="w-full sm:max-w-[240px] space-y-1.5">
          <div className="h-20 w-full border-b border-neutral-200">
            <svg
              viewBox="0 0 300 90"
              preserveAspectRatio="none"
              aria-label="Delivered orders trend chart"
              className="h-full w-full"
            >
              <defs>
                <linearGradient
                  id="wizDeliveredGradient"
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor={hasDeliveries ? "#059669" : "#9CA3AF"}
                    stopOpacity="0.24"
                  />
                  <stop
                    offset="100%"
                    stopColor={hasDeliveries ? "#059669" : "#9CA3AF"}
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>
              <line
                x1="0"
                y1="45"
                x2="300"
                y2="45"
                stroke="#E5E7EB"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
              <path d={areaPath} fill="url(#wizDeliveredGradient)" />
              <path
                d={linePath}
                fill="none"
                stroke={hasDeliveries ? "#059669" : "#D1D5DB"}
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="flex justify-between px-0.5">
            {WEEK_DAYS.map((day) => (
              <span
                key={day}
                className="text-[10px] font-bold uppercase tracking-wider text-neutral-500"
              >
                {day}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
