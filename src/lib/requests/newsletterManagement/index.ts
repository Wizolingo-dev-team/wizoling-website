import { apiClient } from "@src/lib/apiClient";
import type { ApiResponse } from "@src/types/common";
import type {
  NewsletterSubscriber,
  SubscribeNewsletterPayload,
  UnsubscribeNewsletterPayload,
} from "@src/types/newsletterManagement";

const BASE_URL = "/newsletter";

export const newsletterService = {
  subscribe: async (payload: SubscribeNewsletterPayload) => {
    return apiClient.post<ApiResponse<NewsletterSubscriber>>(
      `${BASE_URL}/subscribe`,
      payload,
      "Failed to subscribe to newsletter"
    );
  },

  unsubscribe: async (payload: UnsubscribeNewsletterPayload) => {
    return apiClient.post<ApiResponse>(
      `${BASE_URL}/unsubscribe`,
      payload,
      "Failed to unsubscribe from newsletter"
    );
  },
};

