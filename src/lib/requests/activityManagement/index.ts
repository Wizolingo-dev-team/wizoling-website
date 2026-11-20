import { apiClient } from "@src/lib/apiClient";
import type { ApiDataResponse, ApiResponse } from "@src/types/common";
import type {
  ActivityLog,
  ActivityType,
} from "@src/types/activityManagement";

const BASE_URL = "/activity";

export const activityService = {
  getMyActivities: async () => {
    return apiClient.get<ApiDataResponse<ActivityLog[]>>(
      `${BASE_URL}/my-activities`,
      "Failed to fetch activity logs"
    );
  },

  getUserLogs: async () => {
    return apiClient.get<ApiDataResponse<ActivityLog[]>>(
      `${BASE_URL}/my-logs`,
      "Failed to fetch activity logs"
    );
  },

  logActivity: async (action: ActivityType, details: string) => {
    return apiClient.post<ApiResponse<ActivityLog>>(
      `${BASE_URL}/log`,
      { action, details },
      "Failed to log activity"
    );
  },

  deleteLog: async (id: string) => {
    return apiClient.delete<ApiResponse>(
      `${BASE_URL}/delete/${id}`,
      "Failed to delete activity log"
    );
  },

  deleteAllLogs: async () => {
    return apiClient.delete<ApiResponse>(
      `${BASE_URL}/delete-all`,
      "Failed to clear activity logs"
    );
  },
};
