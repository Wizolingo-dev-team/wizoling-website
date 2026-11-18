import { apiClient } from "@src/lib/apiClient";
import type { ApiDataResponse } from "@src/types/common";
import type {
  ValidateDiscountPayload,
  ValidateDiscountResponse,
} from "@src/types/discountManagement";

const BASE_URL = "/discounts";

export const discountService = {
  validateDiscount: async (payload: ValidateDiscountPayload) => {
    return apiClient.post<ApiDataResponse<ValidateDiscountResponse>>(
      `${BASE_URL}/validate`,
      payload,
      "Failed to validate discount code"
    );
  },
};

