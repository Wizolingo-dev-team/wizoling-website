"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { orderService } from "@src/lib/requests/orderManagement";
import { useToast } from "@src/hooks/useToast";
import { getAuthToken } from "@src/utils/auth";
import type { CreateOrderPayload } from "@src/types/orderManagement";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (payload: CreateOrderPayload) =>
      orderService.createOrder(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["userOrders"] });
      queryClient.invalidateQueries({ queryKey: ["myDownloads"] });
      toast.success(response.message || "Order created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create order");
    },
  });
};

export const useGetUserOrders = () => {
  return useQuery({
    queryKey: ["userOrders"],
    queryFn: async () => {
      const response = await orderService.getUserOrders();
      return response.data ?? [];
    },
    enabled: Boolean(getAuthToken()),
  });
};

export const useGetMyDownloads = () => {
  return useQuery({
    queryKey: ["myDownloads"],
    queryFn: async () => {
      const response = await orderService.getMyDownloads();
      return response.data ?? [];
    },
    enabled: Boolean(getAuthToken()),
  });
};

export const useGetOrderStatuses = () => {
  return useQuery({
    queryKey: ["orderStatuses"],
    queryFn: async () => {
      const response = await orderService.getOrderStatuses();
      return response.data ?? [];
    },
  });
};

