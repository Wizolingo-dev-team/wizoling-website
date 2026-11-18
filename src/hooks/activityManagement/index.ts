"use client";

import { useQuery } from "@tanstack/react-query";
import { activityService } from "@src/lib/requests/activityManagement";
import { getAuthToken } from "@src/utils/auth";

export const useGetMyActivities = () => {
  return useQuery({
    queryKey: ["userActivity", "myActivities"],
    queryFn: async () => {
      const response = await activityService.getMyActivities();
      return response.data ?? [];
    },
    enabled: Boolean(getAuthToken()),
  });
};

