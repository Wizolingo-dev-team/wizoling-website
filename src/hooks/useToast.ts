"use client";

import type { ExternalToast } from "sonner";
import { appToast } from "@src/components/Toast";

export function useToast() {
  return {
    success: (message: string, options?: ExternalToast) =>
      appToast.success(message, options),

    error: (message: string, options?: ExternalToast) =>
      appToast.error(message, options),

    info: (message: string, options?: ExternalToast) =>
      appToast.info(message, options),

    warning: (message: string, options?: ExternalToast) =>
      appToast.warning(message, options),
  };
}
