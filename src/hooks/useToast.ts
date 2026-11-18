"use client";

import { toast, type ExternalToast } from "sonner";

export function useToast() {
  return {
    success: (message: string, options?: ExternalToast) =>
      toast.success(message, options),

    error: (message: string, options?: ExternalToast) =>
      toast.error(message, options),

    info: (message: string, options?: ExternalToast) =>
      toast(message, options),

    warning: (message: string, options?: ExternalToast) =>
      toast.warning(message, options),
  };
}

