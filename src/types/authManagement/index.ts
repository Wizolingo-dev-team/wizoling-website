import type {
  ApiResponse,
  CloudinaryAsset,
  MongoEntity,
} from "@src/types/common";

export type UserRole = "user" | "admin";

export type RegisterPayload = FormData;

export type EmailPayload = {
  email: string;
};

export type VerifyOtpPayload = EmailPayload & {
  otp: string;
};

export type LoginPayload = EmailPayload & {
  password: string;
};

export type ForgotPasswordPayload = EmailPayload;

export type ResendOtpPayload = EmailPayload;

export type ResetPasswordPayload = {
  password: string;
  token: string;
};

export type UpdateProfilePayload = FormData;

export type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

export type UserWishlistSummary = MongoEntity & {
  user: string;
  products: string[];
};

export type User = MongoEntity & {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  avatar: CloudinaryAsset;
  role: UserRole;
  isVerified: boolean;
  wishlists?: UserWishlistSummary | null;
  orders?: Array<{ _id: string; status: string; amount: number; createdAt: string }>;
  id: string;
};

export type AuthResponse<T = unknown> = ApiResponse<T>;

export type LoginResponse = {
  success: boolean;
  message: string;
  data: string; // JWT token string
};

