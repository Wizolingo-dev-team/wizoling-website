"use client";

import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@src/lib/requests/categoryManagement";
import type { GetAllCategoriesParams } from "@src/types/categoryManagement";

export const useGetAllCategories = (params?: GetAllCategoriesParams) => {
  return useQuery({
    queryKey: ["categories", params],
    queryFn: async () => {
      const response = await categoryService.getAllCategories(params);
      return response.data ?? [];
    },
  });
};

