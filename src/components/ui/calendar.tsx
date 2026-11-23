"use client";

import * as React from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@src/lib/utils";

export type CalendarProps = {
  selected?: Date | null;
  onSelect?: (date: Date | null) => void;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
};

export function Calendar({
  selected,
  onSelect,
  className,
  minDate,
  maxDate,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState<Date>(
    () => selected || new Date()
  );

  // Sync current month if selected date changes externally
  React.useEffect(() => {
    if (selected) {
      setCurrentMonth(selected);
    }
  }, [selected]);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday start
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const weekDayLabels = ["M", "T", "W", "T", "F", "S", "S"];

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentMonth((prev) => subMonths(prev, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentMonth((prev) => addMonths(prev, 1));
  };

  const handleDayClick = (day: Date, isDisabled: boolean) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isDisabled) return;
    if (onSelect) {
      if (selected && isSameDay(day, selected)) {
        onSelect(null);
      } else {
        onSelect(day);
      }
    }
  };

  return (
    <div
      className={cn(
        "p-3 select-none bg-[#1a1a1a] border border-white/10 rounded-md text-white shadow-xl w-[280px]",
        className
      )}
    >
      {/* Month Header & Navigation */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <button
          type="button"
          onClick={handlePrevMonth}
          aria-label="Previous month"
          className="inline-flex size-7 items-center justify-center rounded border border-white/15 bg-white/5 text-white/70 transition-colors hover:border-[#D70E1D] hover:bg-[#D70E1D] hover:text-white"
        >
          <ChevronLeft className="size-4" />
        </button>

        <span className="font-display text-xs font-bold uppercase tracking-wider text-white">
          {format(currentMonth, "MMMM yyyy")}
        </span>

        <button
          type="button"
          onClick={handleNextMonth}
          aria-label="Next month"
          className="inline-flex size-7 items-center justify-center rounded border border-white/15 bg-white/5 text-white/70 transition-colors hover:border-[#D70E1D] hover:bg-[#D70E1D] hover:text-white"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      {/* Weekday Column Headers */}
      <div className="grid grid-cols-7 pt-3 pb-1 text-center">
        {weekDayLabels.map((label, idx) => (
          <span
            key={`${label}-${idx}`}
            className="text-[10px] font-semibold uppercase text-white/40"
          >
            {label}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 pt-1">
        {days.map((day) => {
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isSelected = selected ? isSameDay(day, selected) : false;
          const isDayToday = isToday(day);
          const isBeforeMin = minDate ? day < minDate && !isSameDay(day, minDate) : false;
          const isAfterMax = maxDate ? day > maxDate && !isSameDay(day, maxDate) : false;
          const isDisabled = isBeforeMin || isAfterMax;

          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={isDisabled}
              onClick={handleDayClick(day, isDisabled)}
              className={cn(
                "relative flex h-8 w-8 items-center justify-center rounded text-xs font-medium transition-all mx-auto",
                !isCurrentMonth && "text-white/20",
                isCurrentMonth && !isSelected && "text-white/85 hover:bg-white/10 hover:text-white",
                isDayToday && !isSelected && "border border-white/30 font-bold text-white",
                isSelected &&
                  "bg-[#D70E1D] text-white font-bold shadow-md shadow-[#D70E1D]/30 hover:bg-[#b50b18]",
                isDisabled && "opacity-25 cursor-not-allowed hover:bg-transparent"
              )}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}

