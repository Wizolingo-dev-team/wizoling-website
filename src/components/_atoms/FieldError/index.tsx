import React from "react";

type FieldErrorProps = {
  message?: string;
  className?: string;
};

export default function FieldError({ message, className }: FieldErrorProps) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className={
        className
          ? `text-xs font-medium text-[#D70E1D] ${className}`
          : "text-xs font-medium text-[#D70E1D]"
      }
    >
      {message}
    </p>
  );
}

