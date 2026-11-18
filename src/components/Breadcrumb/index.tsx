import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@src/lib/utils";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  variant?: "dark" | "light";
  className?: string;
};

export default function Breadcrumb({
  items,
  variant = "dark",
  className,
}: BreadcrumbProps) {
  const isLight = variant === "light";

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em]",
        className
      )}
    >
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={`${item.label}-${idx}`}>
            {idx > 0 && (
              <ChevronRight
                className={cn(
                  "size-3.5 shrink-0",
                  isLight ? "text-neutral-400" : "text-white/35"
                )}
                aria-hidden="true"
              />
            )}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className={cn(
                  "transition-colors hover:text-[#D70E1D]",
                  isLight ? "text-neutral-500" : "text-white/65"
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current={isLast ? "page" : undefined}
                className={cn(
                  "truncate max-w-[260px] sm:max-w-md",
                  isLast
                    ? "text-[#D70E1D]"
                    : isLight
                      ? "text-neutral-500"
                      : "text-white/65"
                )}
              >
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

