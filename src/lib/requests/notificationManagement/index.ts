import { apiClient } from "@src/lib/apiClient";
import type { ApiDataResponse, ApiResponse } from "@src/types/common";
import type {
  AddNotificationPayload,
  NotificationItem,
} from "@src/types/notificationManagement";

const BASE_URL = "/notifications";

export const notificationService = {
  getAllNotifications: async () => {
    return apiClient.get<ApiDataResponse<NotificationItem[]>>(
      `${BASE_URL}/get-all-notifications`,
      "Failed to fetch notifications"
    );
  },

  addNotification: async (payload: AddNotificationPayload) => {
    return apiClient.post<ApiResponse<NotificationItem>>(
      `${BASE_URL}/add-notification`,
      payload,
      "Failed to create notification"
    );
  },

  markAllAsRead: async () => {
    return apiClient.post<ApiResponse>(
      `${BASE_URL}/mark-as-read`,
      {},
      "Failed to mark notifications as read"
    );
  },

  markAsRead: async (id: string) => {
    return apiClient.post<ApiResponse<NotificationItem>>(
      `${BASE_URL}/mark-as-read/${id}`,
      {},
      "Failed to mark notification as read"
    );
  },

  deleteNotification: async (id: string) => {
    return apiClient.delete<ApiResponse>(
      `${BASE_URL}/delete-notification/${id}`,
      "Failed to delete notification"
    );
  },

  deleteAllNotifications: async () => {
    return apiClient.delete<ApiResponse>(
      `${BASE_URL}/delete-all-notifications`,
      "Failed to clear notifications"
    );
  },
};

