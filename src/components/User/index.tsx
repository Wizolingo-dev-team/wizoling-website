"use client";

import React from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import ProfileForm from "@src/components/Forms/ProfileForm";
import ChangePasswordForm from "@src/components/Forms/ChangePasswordForm";
import { useGetLoggedInUser } from "@src/hooks/authManagement";
import { useUpdateProfile } from "@src/hooks/profileManagement";
import UserSettingsSkeleton from "@src/components/Skeletons/UserSettingsSkeleton";

export default function User() {
  const { data: user, isLoading } = useGetLoggedInUser();
  const { mutate: updateProfile, isPending: isUpdatingAvatar } =
    useUpdateProfile();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);
      updateProfile(formData);
    }
  };

  if (isLoading) {
    return <UserSettingsSkeleton />;
  }

  const initials =
    `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase() ||
    "W";

  return (
    <div className="flex w-full flex-col items-start gap-10 lg:flex-row">
      {/* Left: Avatar Section */}
      <div className="flex w-full flex-col items-center gap-4 border border-neutral-200 bg-white p-6 shadow-sm lg:sticky lg:top-28 lg:w-64">
        <div className="group relative">
          <div
            className={`relative size-32 overflow-hidden rounded-full border-4 border-white shadow-lg ring-1 ring-neutral-200 ${
              isUpdatingAvatar ? "opacity-50" : ""
            }`}
          >
            {user?.avatar?.url ? (
              <Image
                src={user.avatar.url}
                alt={user.firstName}
                fill
                sizes="128px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#111111] font-display text-3xl font-extrabold text-white">
                {initials}
              </div>
            )}
          </div>
          <label
            title="Upload new profile photo"
            className="absolute bottom-0 right-0 flex size-10 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-[#D70E1D] text-white shadow-md transition-transform hover:scale-105"
          >
            <Camera className="size-4" />
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleAvatarChange}
              disabled={isUpdatingAvatar}
            />
          </label>
        </div>

        <div className="space-y-1 text-center">
          <h3 className="font-display text-base font-extrabold uppercase tracking-wide text-[#111111]">
            {user?.firstName} {user?.lastName}
          </h3>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D70E1D]">
            {user?.role} Member
          </p>
        </div>
      </div>

      {/* Right: Forms */}
      <div className="flex-1 w-full border border-neutral-200 bg-white p-6 sm:p-10 shadow-sm">
        <ProfileForm user={user} />
        <ChangePasswordForm />
      </div>
    </div>
  );
}

