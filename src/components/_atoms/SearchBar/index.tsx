"use client";

import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@src/lib/utils";

type SearchBarProps = {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  variant?: "dark" | "light";
  className?: string;
  inputClassName?: string;
};

export default function SearchBar({
  value,
  defaultValue = "",
  onChange,
  onSubmit,
  placeholder = "Search...",
  ariaLabel = "Search",
  variant = "dark",
  className,
  inputClassName,
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const isLight = variant === "light";

  const updateValue = (next: string) => {
    if (!isControlled) {
      setInternalValue(next);
    }
    onChange?.(next);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(currentValue.trim());
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative", className)}>
      <input
        type="text"
        value={currentValue}
        onChange={(e) => updateValue(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className={cn(
          "w-full border px-4 py-3 pr-16 text-xs transition-colors focus:border-[#D70E1D] focus:outline-none",
          isLight
            ? "border-neutral-300 bg-neutral-50 text-[#111111] placeholder:text-neutral-400"
            : "border-white/20 bg-white/[0.04] text-white placeholder:text-white/40",
          inputClassName
        )}
      />

      <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
        {currentValue ? (
          <button
            type="button"
            onClick={() => {
              updateValue("");
              onSubmit?.("");
            }}
            aria-label="Clear search"
            className={cn(
              "p-1.5 transition-colors",
              isLight
                ? "text-neutral-400 hover:text-[#111111]"
                : "text-white/50 hover:text-white"
            )}
          >
            <X className="size-3.5" />
          </button>
        ) : null}

        <button
          type="submit"
          aria-label="Submit search"
          className={cn(
            "p-1.5 transition-colors hover:text-[#D70E1D]",
            isLight ? "text-neutral-500" : "text-white/55"
          )}
        >
          <Search className="size-4" />
        </button>
      </div>
    </form>
  );
}

