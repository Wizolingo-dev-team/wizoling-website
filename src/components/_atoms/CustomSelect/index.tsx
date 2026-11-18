"use client";

import React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@src/lib/utils";

export type SelectOptionItem = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  value: string;
  onValueChange: (val: string) => void;
  options: SelectOptionItem[];
  placeholder?: string;
  ariaLabel?: string;
  variant?: "dark" | "light";
  className?: string;
};

export default function CustomSelect({
  value,
  onValueChange,
  options,
  placeholder = "Select option",
  ariaLabel = "Select option",
  variant = "light",
  className,
}: CustomSelectProps) {
  const isLight = variant === "light";

  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger
        aria-label={ariaLabel}
        className={cn(
          "inline-flex items-center justify-between gap-3 border px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors focus:border-[#D70E1D] focus:outline-none",
          isLight
            ? "border-neutral-300 bg-neutral-50 text-[#111111] hover:border-neutral-400"
            : "border-white/20 bg-[#181818] text-white hover:border-white/40",
          className
        )}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon>
          <ChevronDown
            className={cn(
              "size-3.5 shrink-0",
              isLight ? "text-neutral-500" : "text-white/60"
            )}
          />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={4}
          className={cn(
            "z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden border shadow-2xl",
            isLight
              ? "border-neutral-200 bg-white text-[#111111]"
              : "border-white/15 bg-[#161616] text-white"
          )}
        >
          <SelectPrimitive.Viewport className="p-1">
            {options.map((opt) => (
              <SelectPrimitive.Item
                key={opt.value}
                value={opt.value}
                className={cn(
                  "relative flex cursor-pointer select-none items-center justify-between gap-3 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] outline-none transition-colors data-[highlighted]:bg-[#D70E1D] data-[highlighted]:text-white",
                  isLight ? "text-neutral-700" : "text-white/80"
                )}
              >
                <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator>
                  <Check className="size-3.5" />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}

