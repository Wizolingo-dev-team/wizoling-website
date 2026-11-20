import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import LoginForm from "./LoginForm";

const mockLoginMutate = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock("@src/hooks/authManagement", () => ({
  useCustomerLogin: () => ({
    mutate: mockLoginMutate,
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

describe("LoginForm integration", () => {
  beforeEach(() => {
    mockLoginMutate.mockReset();
  });

  it("shows inline red validation errors under inputs when submitted empty", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.click(screen.getByRole("button", { name: /log in/i }));

    expect(await screen.findByText("Email is required")).toBeVisible();
    expect(await screen.findByText("Password is required")).toBeVisible();
    expect(mockLoginMutate).not.toHaveBeenCalled();
  });

  it("submits valid credentials immediately without delay", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(
      screen.getByLabelText(/email address/i),
      "it.dannybizman@gmail.com"
    );
    await user.type(screen.getByLabelText(/password \*/i), "Anticode@93");
    await user.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => {
      expect(mockLoginMutate).toHaveBeenCalledWith(
        {
          email: "it.dannybizman@gmail.com",
          password: "Anticode@93",
        },
        expect.any(Object)
      );
    });
  });
});

