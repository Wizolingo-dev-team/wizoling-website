import { apiClient } from "@src/lib/apiClient";
import type { ApiDataResponse } from "@src/types/common";
import type {
  DigitalDownloadData,
  GetAllProductsParams,
  Product,
} from "@src/types/productManagement";

const BASE_URL = "/products";

export const productService = {
  getAllProducts: async (params?: GetAllProductsParams) => {
    return apiClient.get<ApiDataResponse<Product[]>>(
      `${BASE_URL}/get-all-products`,
      "Failed to fetch products",
      { params }
    );
  },

  getProductById: async (id: string) => {
    return apiClient.get<ApiDataResponse<Product>>(
      `${BASE_URL}/get-product/${id}`,
      "Failed to fetch product details"
    );
  },

  downloadDigitalRelease: async (productId: string) => {
    return apiClient.get<ApiDataResponse<DigitalDownloadData>>(
      `${BASE_URL}/download/${productId}`,
      "Failed to retrieve digital download links"
    );
  },
};

