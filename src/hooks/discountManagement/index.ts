"use client";

import { useMutation } from "@tanstack/react-query";
import { discountService } from "@src/lib/requests/discountManagement";
import { useToast } from "@src/hooks/useToast";
import type { ValidateDiscountPayload } from "@src/types/discountManagement";

export const useValidateDiscount = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: (payload: ValidateDiscountPayload) =>
      discountService.validateDiscount(payload),
    onSuccess: (response) => {
      toast.success(
        `Discount ${response.data.discountCode} (${response.data.discountPercentage}% off) applied!`
      );
    },
    onError: (error: Error) => {
      toast.error(error.message || "Invalid or expired discount code");
    },
  });
};

