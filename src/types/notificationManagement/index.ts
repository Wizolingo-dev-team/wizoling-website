import type { MongoEntity } from "@src/types/common";

export type NotificationType =
  | "order"
  | "download"
  | "event"
  | "newsletter"
  | "auth"
  | "system";

export type NotificationItem = MongoEntity & {
  user: string;
  title: string;
  description: string;
  type: NotificationType;
  onClick: string;
  read: boolean;
};

export type AddNotificationPayload = {
  title: string;
  description: string;
  type?: NotificationType;
  onClick?: string;
};

