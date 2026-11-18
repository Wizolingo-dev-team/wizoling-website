"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { productService } from "@src/lib/requests/productManagement";
import { useToast } from "@src/hooks/useToast";
import type { GetAllProductsParams } from "@src/types/productManagement";

export const useGetAllProducts = (params?: GetAllProductsParams) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: async () => {
      const response = await productService.getAllProducts(params);
      return response.data ?? [];
    },
  });
};

export const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await productService.getProductById(id);
      return response.data;
    },
    enabled: Boolean(id),
  });
};

export const useDownloadDigitalRelease = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: (productId: string) =>
      productService.downloadDigitalRelease(productId),
    onError: (error: Error) => {
      toast.error(error.message || "Failed to retrieve download links");
    },
  });
};

