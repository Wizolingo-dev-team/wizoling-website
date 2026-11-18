"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { reviewService } from "@src/lib/requests/reviewManagement";
import { useToast } from "@src/hooks/useToast";
import type {
  AddReviewPayload,
  GetReviewsParams,
} from "@src/types/reviewManagement";

export const useGetReviews = (params?: GetReviewsParams) => {
  return useQuery({
    queryKey: ["reviews", params],
    queryFn: async () => {
      const response = await reviewService.getReviews(params);
      return response.data ?? [];
    },
  });
};

export const useAddReview = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (payload: AddReviewPayload) => reviewService.addReview(payload),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", { productId: variables.productId }],
      });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      toast.success(response.message || "Review submitted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to submit review");
    },
  });
};

