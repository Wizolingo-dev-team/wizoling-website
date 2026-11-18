import { apiClient } from "@src/lib/apiClient";
import type { ApiDataResponse, ApiResponse } from "@src/types/common";
import type {
  ChangePasswordPayload,
  UpdateProfilePayload,
  User,
} from "@src/types/authManagement";

const BASE_URL = "/profile";

export const profileService = {
  getProfile: async () => {
    return apiClient.get<ApiDataResponse<User>>(
      `${BASE_URL}/`,
      "Failed to fetch profile"
    );
  },

  updateProfile: async (payload: UpdateProfilePayload) => {
    return apiClient.put<ApiDataResponse<User>>(
      `${BASE_URL}/update`,
      payload,
      "Failed to update profile"
    );
  },

  changePassword: async (payload: ChangePasswordPayload) => {
    return apiClient.put<ApiResponse>(
      `${BASE_URL}/change-password`,
      payload,
      "Failed to change password"
    );
  },
};

