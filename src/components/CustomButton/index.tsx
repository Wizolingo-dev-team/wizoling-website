"use client";

import React, { forwardRef } from "react";
import { ArrowRight, ArrowUpRight, Loader2 } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@src/lib/utils";
import type { CustomButtonProps } from "@src/types/button";

const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "default",
      rounded = "xl",
      leftIcon,
      rightIcon,
      withArrow = false,
      arrowType = "right",
      loading = false,
      disabled = false,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const variantStyles = {
      primary:
        "bg-[#D70E1D] text-white font-bold shadow-md shadow-[#D70E1D]/20 hover:bg-[#B50B18] hover:shadow-lg hover:shadow-[#D70E1D]/30 active:scale-[0.98]",
      dark:
        "bg-[#222222] text-white font-semibold shadow-md shadow-black/15 hover:bg-[#333132] hover:shadow-lg active:scale-[0.98] dark:bg-white dark:text-[#222222] dark:hover:bg-slate-200",
      outline:
        "border border-border bg-white text-foreground font-semibold shadow-sm hover:bg-black/5 hover:border-[#D70E1D] active:scale-[0.98] dark:bg-transparent dark:hover:bg-white/5",
      "outline-light":
        "border border-white/30 bg-transparent text-white font-semibold hover:bg-white/10 hover:border-white active:scale-[0.98]",
      secondary:
        "bg-[#D70E1D]/10 text-[#D70E1D] font-bold hover:bg-[#D70E1D]/20 active:scale-[0.98]",
      ghost:
        "bg-transparent text-foreground font-semibold hover:bg-black/5 hover:text-[#D70E1D] active:scale-[0.98] dark:hover:bg-white/5",
      link:
        "bg-transparent text-[#D70E1D] font-semibold underline-offset-4 hover:underline p-0 h-auto",
    };

    const sizeStyles = {
      xs: "h-7 px-2.5 text-xs gap-1.5",
      sm: "h-9 px-3.5 text-xs gap-2",
      default: "h-11 px-5 text-sm gap-2.5",
      md: "h-12 px-6 text-sm gap-2.5",
      lg: "h-14 px-8 text-base gap-3",
      xl: "h-16 px-10 text-lg gap-3.5",
      icon: "size-10 p-0 flex items-center justify-center",
    };

    const roundedStyles = {
      default: "rounded-md",
      md: "rounded-lg",
      lg: "rounded-xl",
      xl: "rounded-2xl",
      "2xl": "rounded-3xl",
      full: "rounded-full",
    };

    return (
      <Comp
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "group inline-flex items-center justify-center whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D70E1D] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none",
          variantStyles[variant],
          variant !== "link" && sizeStyles[size],
          roundedStyles[rounded],
          className
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="size-4 animate-spin shrink-0" />
        ) : (
          leftIcon && (
            <span className="shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5">
              {leftIcon}
            </span>
          )
        )}

        <span className="truncate">{children}</span>

        {!loading && (
          <>
            {rightIcon && (
              <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
                {rightIcon}
              </span>
            )}
            {withArrow &&
              (arrowType === "right" ? (
                <ArrowRight className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
              ) : (
                <ArrowUpRight className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              ))}
          </>
        )}
      </Comp>
    );
  }
);

CustomButton.displayName = "CustomButton";

export default CustomButton;
export { CustomButton };

