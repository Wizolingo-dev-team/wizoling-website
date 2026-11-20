"use client";

import React from "react";
import { cn } from "@src/lib/utils";

type CanceledOrdersProps = {
  value: number;
};

export default function CanceledOrders({ value }: CanceledOrdersProps) {
  const labels = ["01", "02", "03", "04", "05", "06", "07"];

  return (
    <div className="relative flex h-[250px] flex-col justify-between border border-neutral-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="font-display text-xl font-extrabold uppercase tracking-wide text-[#111111]">
            Canceled Orders
          </h3>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
            Return / Cancel Rate
          </p>
        </div>
        <div className="w-fit border border-neutral-200 bg-[#111111] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
          {value} Total
        </div>
      </div>

      <div className="flex h-28 items-end justify-between px-2">
        {labels.map((label, i) => {
          const isHighlighted = value > 0 && i === labels.length - 1;
          const barHeight = value > 0 ? (i % 2 === 0 ? "40%" : "65%") : "15%";

          return (
            <div key={i} className="group flex flex-col items-center gap-3">
              <div
                className={cn(
                  "w-3 transition-all duration-700 ease-in-out",
                  isHighlighted
                    ? "bg-[#D70E1D]"
                    : "bg-neutral-300 group-hover:bg-[#D70E1D]/50"
                )}
                style={{ height: isHighlighted ? "85%" : barHeight }}
              />
              <span className="text-[10px] font-bold tracking-tighter text-neutral-500">
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

