import { apiClient } from "@src/lib/apiClient";
import type { ApiDataResponse } from "@src/types/common";
import type {
  DigitalDownloadData,
  GetAllProductsParams,
  Product,
  ProductFilterOptions,
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

  getFilterOptions: async (productType?: string) => {
    return apiClient.get<ApiDataResponse<ProductFilterOptions>>(
      `${BASE_URL}/filter-options`,
      "Failed to fetch store filter options",
      { params: productType && productType !== "all" ? { productType } : undefined }
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

