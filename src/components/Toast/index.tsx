"use client";

import React from "react";
import { Toaster as SonnerToaster, toast, type ExternalToast } from "sonner";

export function AppToaster() {
  return (
    <SonnerToaster
      position="bottom-left"
      richColors
      toastOptions={{
        style: {
          borderRadius: "0px",
          fontSize: "13px",
        },
        classNames: {
          toast: "font-sans shadow-2xl border",
          title: "font-semibold tracking-wide",
          description: "text-xs opacity-90",
          success: "!bg-emerald-700 !text-white !border-emerald-500",
          error: "!bg-[#D70E1D] !text-white !border-red-400",
          info: "!bg-blue-700 !text-white !border-blue-500",
          warning: "!bg-amber-600 !text-white !border-amber-400",
          actionButton: "!bg-white !text-[#111111] !rounded-none",
          cancelButton: "!bg-black/20 !text-white !rounded-none",
        },
      }}
    />
  );
}

export const appToast = {
  success: (message: string, options?: ExternalToast) =>
    toast.success(message, options),
  error: (message: string, options?: ExternalToast) =>
    toast.error(message, options),
  info: (message: string, options?: ExternalToast) =>
    toast.info(message, options),
  warning: (message: string, options?: ExternalToast) =>
    toast.warning(message, options),
};
