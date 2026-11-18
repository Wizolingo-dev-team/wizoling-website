import type { MongoEntity } from "@src/types/common";

export type ActivityType =
  | "LOGIN"
  | "ADMIN_LOGIN"
  | "ORDER_CREATED"
  | "PAYMENT_COMPLETED"
  | "DIGITAL_DOWNLOADED"
  | "WISHLIST_UPDATED"
  | "LOGOUT"
  | "PROFILE_UPDATED"
  | "PASSWORD_CHANGED"
  | "NEWSLETTER_SENT";

export type ActivityLog = MongoEntity & {
  user: string;
  action: ActivityType;
  details: string;
  ipAddress?: string;
};

