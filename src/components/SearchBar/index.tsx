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
  className,
  inputClassName,
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

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
          "w-full border border-white/20 bg-white/[0.04] px-4 py-3 pr-16 text-xs text-white placeholder:text-white/40 transition-colors focus:border-[#D70E1D] focus:outline-none",
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
            className="p-1.5 text-white/50 transition-colors hover:text-white"
          >
            <X className="size-3.5" />
          </button>
        ) : null}

        <button
          type="submit"
          aria-label="Submit search"
          className="p-1.5 text-white/55 transition-colors hover:text-[#D70E1D]"
        >
          <Search className="size-4" />
        </button>
      </div>
    </form>
  );
}

