"use client";

import React from "react";
import { Info } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@src/components/ui/popover";

type WidgetInfoPopoverProps = {
  title: string;
  summary: string;
};

export default function WidgetInfoPopover({
  title,
  summary,
}: WidgetInfoPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`About ${title}`}
          className="inline-flex size-7 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 text-neutral-500 transition-colors hover:border-[#D70E1D] hover:bg-[#D70E1D]/10 hover:text-[#D70E1D] focus:outline-none focus:ring-2 focus:ring-[#D70E1D]/30"
        >
          <Info className="size-3.5" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="space-y-2 border-t-2 border-t-[#D70E1D]">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#D70E1D]">
          Metric Summary
        </p>
        <h4 className="font-display text-xs font-extrabold uppercase tracking-wider text-[#111111]">
          {title}
        </h4>
        <p className="text-xs leading-relaxed text-neutral-600">{summary}</p>
      </PopoverContent>
    </Popover>
  );
}

