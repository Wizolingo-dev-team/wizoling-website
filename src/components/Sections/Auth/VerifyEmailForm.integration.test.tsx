import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import VerifyEmailForm from "./VerifyEmailForm";

const mockVerifyMutate = vi.fn();
const mockResendMutate = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
  useSearchParams: () =>
    new URLSearchParams("email=it.dannybizman%40gmail.com"),
}));

vi.mock("@src/hooks/authManagement", () => ({
  useVerifyCustomerOtp: () => ({
    mutate: mockVerifyMutate,
    isPending: false,
  }),
  useResendOtp: () => ({
    mutate: mockResendMutate,
    isPending: false,
  }),
  useGetLoggedInUser: () => ({
    data: null,
    isLoading: false,
  }),
}));

vi.mock("@src/utils/auth", () => ({
  getAuthToken: () => null,
}));

describe("VerifyEmailForm integration", () => {
  beforeEach(() => {
    mockVerifyMutate.mockReset();
    mockResendMutate.mockReset();
  });

  it("renders 6 numeric OTP boxes without an email input field", () => {
    render(<VerifyEmailForm />);

    expect(screen.queryByLabelText(/email address/i)).toBeNull();
    expect(
      screen.getByText(/it\.dannybizman@gmail\.com/i)
    ).toBeVisible();

    for (let i = 1; i <= 6; i += 1) {
      expect(screen.getByLabelText(`OTP digit ${i}`)).toBeVisible();
    }
  });

  it("validates incomplete OTP inline and submits 6-digit OTP", async () => {
    const user = userEvent.setup();
    render(<VerifyEmailForm />);

    await user.click(screen.getByRole("button", { name: /verify account/i }));
    expect(
      await screen.findByText(/verification otp is required/i)
    ).toBeVisible();
    expect(mockVerifyMutate).not.toHaveBeenCalled();

    const digits = ["1", "2", "3", "4", "5", "6"];
    for (let i = 0; i < digits.length; i += 1) {
      const input = screen.getByLabelText(`OTP digit ${i + 1}`);
      await user.type(input, digits[i] ?? "");
    }

    await user.click(screen.getByRole("button", { name: /verify account/i }));

    await waitFor(() => {
      expect(mockVerifyMutate).toHaveBeenCalledWith({
        email: "it.dannybizman@gmail.com",
        otp: "123456",
      });
    });
  });
});

