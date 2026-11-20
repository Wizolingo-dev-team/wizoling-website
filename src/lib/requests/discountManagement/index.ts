import { apiClient } from "@src/lib/apiClient";
import type { ApiDataResponse } from "@src/types/common";
import type {
  PopulatedDiscount,
  ValidateDiscountPayload,
  ValidateDiscountResponse,
} from "@src/types/discountManagement";

const BASE_URL = "/discounts";

export const discountService = {
  getActiveDiscounts: async () => {
    return apiClient.get<ApiDataResponse<PopulatedDiscount[]>>(
      `${BASE_URL}/active`,
      "Failed to fetch active deals"
    );
  },

  validateDiscount: async (payload: ValidateDiscountPayload) => {
    return apiClient.post<ApiDataResponse<ValidateDiscountResponse>>(
      `${BASE_URL}/validate`,
      payload,
      "Failed to validate discount code"
    );
  },
};
