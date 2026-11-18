import { apiClient } from "@src/lib/apiClient";
import type { ApiDataResponse } from "@src/types/common";
import type { ActivityLog } from "@src/types/activityManagement";

const BASE_URL = "/activity";

export const activityService = {
  getMyActivities: async () => {
    return apiClient.get<ApiDataResponse<ActivityLog[]>>(
      `${BASE_URL}/my-activities`,
      "Failed to fetch activity logs"
    );
  },
};

