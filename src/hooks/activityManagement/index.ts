"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { activityService } from "@src/lib/requests/activityManagement";
import { useToast } from "@src/hooks/useToast";
import { getAuthToken } from "@src/utils/auth";

export const useGetMyActivities = () => {
  return useQuery({
    queryKey: ["userActivity", "logs"],
    queryFn: async () => {
      const response = await activityService.getMyActivities();
      return response.data ?? [];
    },
    enabled: Boolean(getAuthToken()),
  });
};

export const useGetUserLogs = useGetMyActivities;

export const useDeleteActivityLog = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (id: string) => activityService.deleteLog(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["userActivity", "logs"] });
      toast.success(response.message || "Log entry deleted");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete log entry");
    },
  });
};

export const useClearAllActivityLogs = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: () => activityService.deleteAllLogs(),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["userActivity", "logs"] });
      toast.success(response.message || "Activity history cleared");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to clear activity history");
    },
  });
};
