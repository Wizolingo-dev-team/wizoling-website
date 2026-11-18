import { apiClient } from "@src/lib/apiClient";
import type { ApiDataResponse, ApiResponse } from "@src/types/common";
import type {
  AddReviewPayload,
  GetReviewsParams,
  Review,
} from "@src/types/reviewManagement";

const BASE_URL = "/users";

export const reviewService = {
  getReviews: async (params?: GetReviewsParams) => {
    return apiClient.get<ApiDataResponse<Review[]>>(
      `${BASE_URL}/get-reviews`,
      "Failed to fetch reviews",
      { params }
    );
  },

  addReview: async (payload: AddReviewPayload) => {
    return apiClient.post<ApiResponse<Review>>(
      `${BASE_URL}/add-review`,
      payload,
      "Failed to submit review"
    );
  },
};

