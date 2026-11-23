"use client";

import * as React from "react";
import { format, parseISO, isValid } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { cn } from "@src/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@src/components/ui/popover";
import { Calendar } from "@src/components/ui/calendar";

export type DatePickerProps = {
  value?: string;
  onChange?: (dateString: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  id?: string;
};

export function DatePicker({
  value,
  onChange,
  placeholder = "Select date",
  className,
  disabled,
  minDate,
  maxDate,
  id,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const selectedDate: Date | null = React.useMemo(() => {
    if (!value) return null;
    const parsed = parseISO(value);
    return isValid(parsed) ? parsed : null;
  }, [value]);

  const handleSelect = (date: Date | null) => {
    if (onChange) {
      if (date && isValid(date)) {
        onChange(format(date, "yyyy-MM-dd"));
      } else {
        onChange("");
      }
    }
    setOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onChange) onChange("");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          id={id}
          type="button"
          disabled={disabled}
          className={cn(
            "flex w-full items-center justify-between border border-white/15 bg-[#1a1a1a] px-3.5 py-2.5 text-sm text-white placeholder:text-white/35 outline-none transition-colors hover:border-white/30 focus:border-[#D70E1D] focus:ring-0",
            disabled && "cursor-not-allowed opacity-50",
            className
          )}
        >
          <span className={cn("truncate", !selectedDate && "text-white/35")}>
            {selectedDate ? format(selectedDate, "dd/MM/yyyy") : placeholder}
          </span>
          <div className="flex items-center gap-1.5 ml-2 shrink-0">
            {selectedDate && !disabled && (
              <span
                role="button"
                tabIndex={0}
                aria-label="Clear date"
                onClick={handleClear}
                className="p-0.5 rounded text-white/40 hover:text-white transition-colors"
              >
                <X className="size-3.5" />
              </span>
            )}
            <CalendarIcon className="size-4 text-white/50" />
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="z-[70] w-auto p-0 border border-white/15 bg-[#1a1a1a] shadow-2xl text-white"
      >
        <Calendar
          selected={selectedDate}
          onSelect={handleSelect}
          minDate={minDate}
          maxDate={maxDate}
        />
        <div className="flex items-center justify-between px-3 py-2 border-t border-white/10 bg-[#141414] text-[11px]">
          <button
            type="button"
            onClick={() => handleSelect(new Date())}
            className="text-white/70 hover:text-[#D70E1D] font-medium transition-colors"
          >
            Today
          </button>
          {selectedDate && (
            <button
              type="button"
              onClick={() => handleSelect(null)}
              className="text-white/40 hover:text-white transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

