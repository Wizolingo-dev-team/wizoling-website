import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant =
  | "primary"
  | "dark"
  | "outline"
  | "outline-light"
  | "secondary"
  | "ghost"
  | "link";

export type ButtonSize = "xs" | "sm" | "default" | "md" | "lg" | "xl" | "icon";

export type CustomButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: "default" | "md" | "lg" | "xl" | "2xl" | "full";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  withArrow?: boolean;
  arrowType?: "right" | "up-right";
  loading?: boolean;
  asChild?: boolean;
};

