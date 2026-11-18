import { apiClient } from "@src/lib/apiClient";
import type { ApiDataResponse, ApiResponse } from "@src/types/common";
import type {
  CreateOrderPayload,
  Order,
  OrderStatus,
} from "@src/types/orderManagement";
import type { Product } from "@src/types/productManagement";

const BASE_URL = "/order";

export const orderService = {
  createOrder: async (payload: CreateOrderPayload) => {
    return apiClient.post<ApiResponse<Order>>(
      `${BASE_URL}/create-order`,
      payload,
      "Failed to create order"
    );
  },

  getUserOrders: async () => {
    return apiClient.get<ApiDataResponse<Order[]>>(
      `${BASE_URL}/get-user-orders`,
      "Failed to fetch your orders"
    );
  },

  getMyDownloads: async () => {
    return apiClient.get<ApiDataResponse<Product[]>>(
      `${BASE_URL}/get-my-downloads`,
      "Failed to fetch your digital downloads"
    );
  },

  getOrderStatuses: async () => {
    return apiClient.get<ApiDataResponse<OrderStatus[]>>(
      `${BASE_URL}/status`,
      "Failed to fetch order statuses"
    );
  },
};

