import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@src/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D70E1D] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#D70E1D] text-white font-bold shadow-md shadow-[#D70E1D]/20 hover:bg-[#B50B18] hover:shadow-lg active:scale-[0.98]",
        primary:
          "bg-[#D70E1D] text-white font-bold shadow-md shadow-[#D70E1D]/20 hover:bg-[#B50B18] hover:shadow-lg active:scale-[0.98]",
        dark:
          "bg-[#222222] text-white shadow-md shadow-black/15 hover:bg-[#333132] active:scale-[0.98]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 active:scale-[0.98]",
        outline:
          "border border-border bg-white text-foreground shadow-sm hover:bg-black/5 hover:border-[#D70E1D] active:scale-[0.98] dark:bg-transparent dark:hover:bg-white/5",
        secondary:
          "bg-[#D70E1D]/10 text-[#D70E1D] font-bold hover:bg-[#D70E1D]/20 active:scale-[0.98]",
        ghost:
          "hover:bg-accent hover:text-accent-foreground active:scale-[0.98]",
        link:
          "text-[#D70E1D] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 py-2",
        xs: "h-7 rounded-lg px-2.5 text-xs",
        sm: "h-9 rounded-lg px-3.5 text-xs",
        md: "h-12 rounded-xl px-6 text-sm",
        lg: "h-14 rounded-2xl px-8 text-base",
        icon: "size-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

