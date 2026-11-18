"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "@src/lib/requests/notificationManagement";
import { useToast } from "@src/hooks/useToast";
import { getAuthToken } from "@src/utils/auth";
import type { AddNotificationPayload } from "@src/types/notificationManagement";

export const useGetAllNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const response = await notificationService.getAllNotifications();
      return response.data ?? [];
    },
    enabled: Boolean(getAuthToken()),
  });
};

export const useAddNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddNotificationPayload) =>
      notificationService.addNotification(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: () => notificationService.markAllAsRead(),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success(response.message || "All notifications marked as read");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to mark notifications as read");
    },
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationService.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (id: string) => notificationService.deleteNotification(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success(response.message || "Notification deleted");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete notification");
    },
  });
};

export const useDeleteAllNotifications = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: () => notificationService.deleteAllNotifications(),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success(response.message || "All notifications cleared");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to clear notifications");
    },
  });
};

