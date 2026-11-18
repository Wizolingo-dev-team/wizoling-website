"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "@src/lib/requests/authManagement";
import { useToast } from "@src/hooks/useToast";
import { clearAuth, getAuthToken, setAuthToken } from "@src/utils/auth";
import type {
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResendOtpPayload,
  ResetPasswordPayload,
  VerifyOtpPayload,
} from "@src/types/authManagement";

export const useRegisterCustomer = () => {
  const toast = useToast();
  return useMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
    onSuccess: (data) => {
      toast.success(
        data.message || "Registration successful! Please verify your email."
      );
    },
    onError: (error: Error) => {
      toast.error(error.message || "Registration failed.");
    },
  });
};

export const useVerifyCustomerOtp = () => {
  const toast = useToast();
  const router = useRouter();
  return useMutation({
    mutationFn: (payload: VerifyOtpPayload) => authService.verifyOtp(payload),
    onSuccess: (data) => {
      toast.success(data.message || "Email verified successfully.");
      router.push("/login");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Verification failed.");
    },
  });
};

export const useResendOtp = () => {
  const toast = useToast();
  return useMutation({
    mutationFn: (payload: ResendOtpPayload) => authService.resendOtp(payload),
    onSuccess: (data) => {
      toast.success(data.message || "New OTP sent successfully.");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to resend OTP.");
    },
  });
};

export const useCustomerLogin = (redirectTo = "/shop") => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: (response, variables) => {
      if (!response.success) {
        toast.error(response.message || "Login failed.");
        if (response.message?.toLowerCase().includes("verify your email")) {
          router.push(
            `/verify-email?email=${encodeURIComponent(variables.email)}`
          );
        }
        return;
      }

      if (response.data) {
        setAuthToken(response.data);
        queryClient.invalidateQueries({ queryKey: ["loggedInUser"] });
        toast.success(response.message || "Welcome back!");
        router.push(redirectTo);
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "An unexpected error occurred.");
    },
  });
};

export const useForgotPassword = () => {
  const toast = useToast();
  return useMutation({
    mutationFn: (payload: ForgotPasswordPayload) =>
      authService.forgotPassword(payload),
    onSuccess: (data) => {
      toast.success(data.message || "Password reset link sent.");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to send reset email.");
    },
  });
};

export const useResetPassword = () => {
  const toast = useToast();
  const router = useRouter();
  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) =>
      authService.resetPassword(payload),
    onSuccess: (data) => {
      toast.success(data.message || "Password updated successfully.");
      router.push("/login");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update password.");
    },
  });
};

export const useLogoutCustomer = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toast = useToast();

  return () => {
    clearAuth();
    queryClient.removeQueries({ queryKey: ["loggedInUser"] });
    queryClient.removeQueries({ queryKey: ["wishlist"] });
    toast.success("Logged out successfully");
    router.push("/login");
  };
};

export const useGetLoggedInUser = () => {
  return useQuery({
    queryKey: ["loggedInUser"],
    queryFn: async () => {
      const response = await authService.getLoggedInUser();
      return response.data ?? null;
    },
    enabled: Boolean(getAuthToken()),
    retry: 1,
  });
};

