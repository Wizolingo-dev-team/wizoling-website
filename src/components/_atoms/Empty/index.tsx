import React, { type ReactNode } from "react";
import Link from "next/link";
import { PackageOpen } from "lucide-react";
import { cn } from "@src/lib/utils";

type EmptyProps = {
  title?: string;
  description?: string;
  icon?: ReactNode;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  variant?: "dark" | "light";
  className?: string;
};

export default function Empty({
  title = "No items found",
  description = "There is currently nothing to display here. Try adjusting your filters or check back soon.",
  icon,
  actionLabel,
  actionHref,
  onAction,
  variant = "dark",
  className,
}: EmptyProps) {
  const isLight = variant === "light";

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center border px-6 py-14 text-center",
        isLight
          ? "border-neutral-200 bg-neutral-50"
          : "border-white/15 bg-black/50 backdrop-blur-sm",
        className
      )}
    >
      <div
        className={cn(
          "mb-4 inline-flex size-14 items-center justify-center border text-[#D70E1D]",
          isLight
            ? "border-neutral-200 bg-white"
            : "border-white/15 bg-white/[0.04]"
        )}
      >
        {icon ?? <PackageOpen className="size-6" />}
      </div>

      <h3
        className={cn(
          "font-display text-lg sm:text-xl font-extrabold uppercase tracking-wide",
          isLight ? "text-[#111111]" : "text-white"
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "mt-2 max-w-md text-xs sm:text-sm leading-relaxed",
          isLight ? "text-neutral-600" : "text-white/65"
        )}
      >
        {description}
      </p>

      {actionLabel && actionHref ? (
        <Link
          href={actionHref}
          className={cn(
            "mt-6 inline-flex items-center justify-center bg-[#D70E1D] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-colors",
            isLight
              ? "hover:bg-[#111111] hover:text-white"
              : "hover:bg-white hover:text-[#111111]"
          )}
        >
          {actionLabel}
        </Link>
      ) : actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className={cn(
            "mt-6 inline-flex items-center justify-center bg-[#D70E1D] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-colors",
            isLight
              ? "hover:bg-[#111111] hover:text-white"
              : "hover:bg-white hover:text-[#111111]"
          )}
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}

