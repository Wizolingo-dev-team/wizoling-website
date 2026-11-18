import { apiClient } from "@src/lib/apiClient";
import type { ApiDataResponse } from "@src/types/common";
import type {
  Category,
  GetAllCategoriesParams,
} from "@src/types/categoryManagement";

const BASE_URL = "/categories";

export const categoryService = {
  getAllCategories: async (params?: GetAllCategoriesParams) => {
    return apiClient.get<ApiDataResponse<Category[]>>(
      `${BASE_URL}/get-all-categories`,
      "Failed to fetch categories",
      { params }
    );
  },
};

