import { apiClient } from "@src/lib/apiClient";
import type { ApiDataResponse } from "@src/types/common";
import type {
  ToggleWishlistData,
  ToggleWishlistPayload,
  Wishlist,
} from "@src/types/wishlistManagement";

const BASE_URL = "/wishlists";

export const wishlistService = {
  getWishlist: async () => {
    return apiClient.get<ApiDataResponse<Wishlist>>(
      `${BASE_URL}/`,
      "Failed to fetch wishlist"
    );
  },

  toggleWishlist: async (payload: ToggleWishlistPayload) => {
    return apiClient.post<ApiDataResponse<ToggleWishlistData>>(
      `${BASE_URL}/toggle`,
      payload,
      "Failed to update wishlist"
    );
  },
};

