"use client";

import React, { useEffect, useState } from "react";
import { useUpdateProfile } from "@src/hooks/profileManagement";
import { updateProfileSchema } from "@src/validations/profileManagement";
import { validateWithSchema } from "@src/utils/validation";
import FieldError from "@src/components/_atoms/FieldError";
import type { User } from "@src/types/authManagement";

export default function ProfileForm({ user }: { user: User | null | undefined }) {
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const [formData, setFormData] = useState({
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    phoneNumber: user?.phoneNumber ?? "",
    address: user?.address ?? "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

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

  const clearError = (field: string) => {
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await validateWithSchema(updateProfileSchema, formData);
    if (!result.success) {
      setFieldErrors(result.errors);
      return;
    }
    setFieldErrors({});
    const data = new FormData();
    data.append("firstName", result.data.firstName);
    data.append("lastName", result.data.lastName);
    data.append("phoneNumber", result.data.phoneNumber ?? "");
    data.append("address", result.data.address ?? "");
    updateProfile(data);
  };

  return (
    <form
      noValidate
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
              onChange={(e) => {
                setFormData({ ...formData, firstName: e.target.value });
                clearError("firstName");
              }}
              className={`w-full border bg-neutral-50 px-4 py-3 text-sm text-[#111111] focus:border-[#D70E1D] focus:outline-none ${
                fieldErrors.firstName
                  ? "border-[#D70E1D]"
                  : "border-neutral-300"
              }`}
            />
            <FieldError message={fieldErrors.firstName} />
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
              onChange={(e) => {
                setFormData({ ...formData, lastName: e.target.value });
                clearError("lastName");
              }}
              className={`w-full border bg-neutral-50 px-4 py-3 text-sm text-[#111111] focus:border-[#D70E1D] focus:outline-none ${
                fieldErrors.lastName ? "border-[#D70E1D]" : "border-neutral-300"
              }`}
            />
            <FieldError message={fieldErrors.lastName} />
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
            onChange={(e) => {
              setFormData({ ...formData, phoneNumber: e.target.value });
              clearError("phoneNumber");
            }}
            className={`w-full border bg-neutral-50 px-4 py-3 text-sm text-[#111111] focus:border-[#D70E1D] focus:outline-none ${
              fieldErrors.phoneNumber
                ? "border-[#D70E1D]"
                : "border-neutral-300"
            }`}
          />
          <FieldError message={fieldErrors.phoneNumber} />
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
            onChange={(e) => {
              setFormData({ ...formData, address: e.target.value });
              clearError("address");
            }}
            className={`w-full border bg-neutral-50 p-3.5 text-sm text-[#111111] focus:border-[#D70E1D] focus:outline-none ${
              fieldErrors.address ? "border-[#D70E1D]" : "border-neutral-300"
            }`}
          />
          <FieldError message={fieldErrors.address} />
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

