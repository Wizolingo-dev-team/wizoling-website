import { apiClient } from "@src/lib/apiClient";
import type { ApiDataResponse, ApiResponse } from "@src/types/common";
import type { Order } from "@src/types/orderManagement";
import type {
  CapturePayPalOrderPayload,
  CreatePayPalOrderPayload,
  PayPalSessionData,
} from "@src/types/paymentManagement";

const BASE_URL = "/payment";

export const paymentService = {
  createPayPalOrder: async (payload: CreatePayPalOrderPayload) => {
    return apiClient.post<ApiDataResponse<PayPalSessionData>>(
      `${BASE_URL}/paypal/create-order`,
      payload,
      "Failed to initiate PayPal checkout"
    );
  },

  capturePayPalOrder: async (payload: CapturePayPalOrderPayload) => {
    return apiClient.post<ApiResponse<Order>>(
      `${BASE_URL}/paypal/capture-order`,
      payload,
      "Failed to capture PayPal payment"
    );
  },
};

