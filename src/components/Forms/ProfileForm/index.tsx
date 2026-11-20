"use client";

import React, { useEffect, useState } from "react";
import { useUpdateProfile } from "@src/hooks/profileManagement";
import { useToast } from "@src/hooks/useToast";
import { updateProfileSchema } from "@src/validations/profileManagement";
import type { User } from "@src/types/authManagement";

export default function ProfileForm({ user }: { user: User | null | undefined }) {
  const toast = useToast();
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const [formData, setFormData] = useState({
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    phoneNumber: user?.phoneNumber ?? "",
    address: user?.address ?? "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        phoneNumber: user.phoneNumber ?? "",
        address: user.address ?? "",
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const validated = await updateProfileSchema.validate(formData, {
        abortEarly: true,
      });
      const data = new FormData();
      data.append("firstName", validated.firstName);
      data.append("lastName", validated.lastName);
      data.append("phoneNumber", validated.phoneNumber ?? "");
      data.append("address", validated.address ?? "");
      updateProfile(data);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-8 border-b border-neutral-200 py-8 md:flex-row"
    >
      <div className="w-full space-y-2 md:w-1/3">
        <h2 className="font-display text-lg font-extrabold uppercase tracking-wide text-[#111111]">
          Basic Information
        </h2>
        <p className="max-w-[260px] text-xs leading-relaxed text-neutral-500">
          View and update your personal account details and delivery address.
        </p>
      </div>

      <div className="w-full space-y-5 md:max-w-[550px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label
              htmlFor="profile-firstName"
              className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[#111111]"
            >
              First Name
            </label>
            <input
              id="profile-firstName"
              type="text"
              required
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              className="w-full border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-[#111111] focus:border-[#D70E1D] focus:outline-none"
            />
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="profile-lastName"
              className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[#111111]"
            >
              Last Name
            </label>
            <input
              id="profile-lastName"
              type="text"
              required
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              className="w-full border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-[#111111] focus:border-[#D70E1D] focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="profile-phone"
            className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[#111111]"
          >
            Phone Number
          </label>
          <input
            id="profile-phone"
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
            className="w-full border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-[#111111] focus:border-[#D70E1D] focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="profile-email"
            className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[#111111]"
          >
            Email Address (Read Only)
          </label>
          <input
            id="profile-email"
            type="email"
            value={user?.email ?? ""}
            disabled
            className="w-full border border-neutral-200 bg-neutral-100 px-4 py-3 text-sm text-neutral-500"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="profile-address"
            className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[#111111]"
          >
            Address
          </label>
          <textarea
            id="profile-address"
            rows={3}
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="w-full border border-neutral-300 bg-neutral-50 p-3.5 text-sm text-[#111111] focus:border-[#D70E1D] focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-[#D70E1D] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#111111] disabled:opacity-50"
        >
          {isPending ? "SAVING..." : "SAVE CHANGES"}
        </button>
      </div>
    </form>
  );
}

