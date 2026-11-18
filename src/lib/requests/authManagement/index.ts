import { apiClient } from "@src/lib/apiClient";
import type {
  AuthResponse,
  ForgotPasswordPayload,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  ResendOtpPayload,
  ResetPasswordPayload,
  User,
  VerifyOtpPayload,
} from "@src/types/authManagement";

const BASE_URL = "/users";

export const authService = {
  register: async (payload: RegisterPayload) => {
    return apiClient.post<AuthResponse>(
      `${BASE_URL}/register`,
      payload,
      "Failed to register"
    );
  },

  verifyOtp: async (payload: VerifyOtpPayload) => {
    return apiClient.post<AuthResponse>(
      `${BASE_URL}/verify-email`,
      payload,
      "Failed to verify email"
    );
  },

  resendOtp: async (payload: ResendOtpPayload) => {
    return apiClient.post<AuthResponse>(
      `${BASE_URL}/resend-otp`,
      payload,
      "Failed to resend OTP"
    );
  },

  login: async (payload: LoginPayload) => {
    return apiClient.post<LoginResponse>(
      `${BASE_URL}/login`,
      payload,
      "Failed to login"
    );
  },

  forgotPassword: async (payload: ForgotPasswordPayload) => {
    return apiClient.post<AuthResponse>(
      `${BASE_URL}/forgot-password`,
      payload,
      "Failed to send reset email"
    );
  },

  resetPassword: async ({ password, token }: ResetPasswordPayload) => {
    return apiClient.post<AuthResponse>(
      `${BASE_URL}/reset-password/${token}`,
      { password },
      "Failed to reset password"
    );
  },

  getLoggedInUser: async () => {
    return apiClient.get<AuthResponse<User>>(
      `${BASE_URL}/get-logged-in-user`,
      "Failed to fetch session"
    );
  },
};

