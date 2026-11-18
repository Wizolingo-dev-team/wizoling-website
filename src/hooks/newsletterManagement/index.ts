"use client";

import { useMutation } from "@tanstack/react-query";
import { newsletterService } from "@src/lib/requests/newsletterManagement";
import { useToast } from "@src/hooks/useToast";
import type {
  SubscribeNewsletterPayload,
  UnsubscribeNewsletterPayload,
} from "@src/types/newsletterManagement";

export const useSubscribeNewsletter = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: (payload: SubscribeNewsletterPayload) =>
      newsletterService.subscribe(payload),
    onSuccess: (response) => {
      toast.success(
        response.message ||
          "Welcome to Wiz Ofuasia's inner circle! You're subscribed."
      );
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to subscribe to newsletter");
    },
  });
};

export const useUnsubscribeNewsletter = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: (payload: UnsubscribeNewsletterPayload) =>
      newsletterService.unsubscribe(payload),
    onSuccess: (response) => {
      toast.success(response.message || "Unsubscribed successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to unsubscribe");
    },
  });
};

