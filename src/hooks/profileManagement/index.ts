"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { profileService } from "@src/lib/requests/profileManagement";
import { useToast } from "@src/hooks/useToast";
import { getAuthToken } from "@src/utils/auth";
import type {
  ChangePasswordPayload,
  UpdateProfilePayload,
} from "@src/types/authManagement";

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const response = await profileService.getProfile();
      return response.data;
    },
    enabled: Boolean(getAuthToken()),
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) =>
      profileService.updateProfile(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["loggedInUser"] });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      toast.success(response.message || "Profile updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update profile");
    },
  });
};

export const useChangePassword = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) =>
      profileService.changePassword(payload),
    onSuccess: (response) => {
      toast.success(response.message || "Password changed successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to change password");
    },
  });
};

