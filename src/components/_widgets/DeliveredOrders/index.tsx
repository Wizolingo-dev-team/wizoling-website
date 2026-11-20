"use client";

import React from "react";

type DeliveredOrdersProps = {
  value: number;
};

export default function DeliveredOrders({ value }: DeliveredOrdersProps) {
  const pathData =
    "M0 60 C 20 60, 40 10, 60 40 C 80 70, 100 20, 120 30 C 140 40, 160 80, 180 50 C 200 20, 220 30, 240 60 C 260 90, 280 40, 300 50 L 300 100 L 0 100 Z";

  return (
    <div className="group relative flex h-[250px] flex-col justify-between overflow-hidden border border-neutral-200 bg-white p-7 shadow-sm">
      <div className="z-10 flex items-start justify-between">
        <h3 className="font-display text-lg font-extrabold uppercase tracking-wide text-[#111111]">
          Delivered Orders
        </h3>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
          Weekly Performance
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-0 h-40">
        <svg
          viewBox="0 0 300 100"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <defs>
            <linearGradient id="wizWaveGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#D70E1D" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#D70E1D" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={pathData}
            fill="url(#wizWaveGradient)"
            stroke="#D70E1D"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="z-10 flex items-end justify-between">
        <div className="space-y-1">
          <span className="font-display text-5xl font-extrabold text-[#111111]">
            {value}
          </span>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D70E1D]">
            Completed
          </p>
        </div>
        <div className="flex gap-3 pb-2">
          {["MO", "TU", "WE", "TH", "FR", "SA", "SU"].map((d) => (
            <span
              key={d}
              className="text-[10px] font-bold uppercase tracking-widest text-neutral-500"
            >
              {d}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

