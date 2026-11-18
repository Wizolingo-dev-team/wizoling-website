"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentService } from "@src/lib/requests/paymentManagement";
import { useToast } from "@src/hooks/useToast";
import type {
  CapturePayPalOrderPayload,
  CreatePayPalOrderPayload,
} from "@src/types/paymentManagement";

export const useCreatePayPalOrder = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: (payload: CreatePayPalOrderPayload) =>
      paymentService.createPayPalOrder(payload),
    onError: (error: Error) => {
      toast.error(error.message || "Failed to initiate PayPal checkout");
    },
  });
};

export const useCapturePayPalOrder = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (payload: CapturePayPalOrderPayload) =>
      paymentService.capturePayPalOrder(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["userOrders"] });
      queryClient.invalidateQueries({ queryKey: ["myDownloads"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success(response.message || "Payment confirmed successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to confirm payment");
    },
  });
};

