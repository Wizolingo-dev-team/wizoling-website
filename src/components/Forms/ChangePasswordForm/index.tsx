"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@src/hooks/useToast";
import { useChangePassword } from "@src/hooks/profileManagement";

export default function ChangePasswordForm() {
  const toast = useToast();
  const { mutate: changePassword, isPending } = useChangePassword();
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const toggleVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwords.new.length < 6) {
      toast.error("New password must be at least 6 characters long");
      return;
    }
    if (passwords.new !== passwords.confirm) {
      toast.error("New passwords do not match");
      return;
    }
    changePassword(
      {
        currentPassword: passwords.current,
        newPassword: passwords.new,
      },
      {
        onSuccess: () => {
          setPasswords({ current: "", new: "", confirm: "" });
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleUpdate}
      className="flex flex-col gap-8 py-8 md:flex-row"
    >
      <div className="w-full space-y-2 md:w-1/3">
        <h2 className="font-display text-lg font-extrabold uppercase tracking-wide text-[#111111]">
          Change Password
        </h2>
        <p className="max-w-[260px] text-xs leading-relaxed text-neutral-500">
          Update your password regularly to keep your Wizolingo account secure.
        </p>
      </div>

      <div className="w-full space-y-5 md:max-w-[550px]">
        {/* Current Password */}
        <div className="space-y-1.5">
          <label
            htmlFor="pw-current"
            className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[#111111]"
          >
            Current Password
          </label>
          <div className="relative">
            <input
              id="pw-current"
              type={showPasswords.current ? "text" : "password"}
              required
              value={passwords.current}
              onChange={(e) =>
                setPasswords({ ...passwords, current: e.target.value })
              }
              className="w-full border border-neutral-300 bg-neutral-50 px-4 py-3 pr-11 text-sm text-[#111111] focus:border-[#D70E1D] focus:outline-none"
            />
            <button
              type="button"
              onClick={() => toggleVisibility("current")}
              aria-label="Toggle current password visibility"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#111111]"
            >
              {showPasswords.current ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="space-y-1.5">
          <label
            htmlFor="pw-new"
            className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[#111111]"
          >
            New Password
          </label>
          <div className="relative">
            <input
              id="pw-new"
              type={showPasswords.new ? "text" : "password"}
              required
              minLength={6}
              value={passwords.new}
              onChange={(e) =>
                setPasswords({ ...passwords, new: e.target.value })
              }
              className="w-full border border-neutral-300 bg-neutral-50 px-4 py-3 pr-11 text-sm text-[#111111] focus:border-[#D70E1D] focus:outline-none"
            />
            <button
              type="button"
              onClick={() => toggleVisibility("new")}
              aria-label="Toggle new password visibility"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#111111]"
            >
              {showPasswords.new ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label
            htmlFor="pw-confirm"
            className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[#111111]"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="pw-confirm"
              type={showPasswords.confirm ? "text" : "password"}
              required
              minLength={6}
              value={passwords.confirm}
              onChange={(e) =>
                setPasswords({ ...passwords, confirm: e.target.value })
              }
              className="w-full border border-neutral-300 bg-neutral-50 px-4 py-3 pr-11 text-sm text-[#111111] focus:border-[#D70E1D] focus:outline-none"
            />
            <button
              type="button"
              onClick={() => toggleVisibility("confirm")}
              aria-label="Toggle confirm password visibility"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#111111]"
            >
              {showPasswords.confirm ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-[#111111] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#D70E1D] disabled:opacity-50"
        >
          {isPending ? "UPDATING..." : "UPDATE PASSWORD"}
        </button>
      </div>
    </form>
  );
}

