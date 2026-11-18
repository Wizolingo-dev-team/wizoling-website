"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { wishlistService } from "@src/lib/requests/wishlistManagement";
import { useToast } from "@src/hooks/useToast";
import { getAuthToken } from "@src/utils/auth";
import type { ToggleWishlistPayload } from "@src/types/wishlistManagement";

export const useGetWishlist = () => {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const response = await wishlistService.getWishlist();
      return response.data;
    },
    enabled: Boolean(getAuthToken()),
  });
};

export const useToggleWishlist = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (payload: ToggleWishlistPayload) =>
      wishlistService.toggleWishlist(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["loggedInUser"] });
      toast.success(
        response.data.isAdded
          ? "Added to your wishlist"
          : "Removed from your wishlist"
      );
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update wishlist");
    },
  });
};

