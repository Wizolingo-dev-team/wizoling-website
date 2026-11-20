import { describe, expect, it } from "vitest";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verifyOtpSchema,
} from "./index";

describe("authManagement validation schemas", () => {
  it("validates login credentials", async () => {
    await expect(
      loginSchema.validate({ email: "bad-email", password: "" })
    ).rejects.toThrow();
    const valid = await loginSchema.validate({
      email: "USER@Example.com ",
      password: "Password123",
    });
    expect(valid.email).toBe("user@example.com");
  });

  it("validates registration with optional phone/address and max lengths", async () => {
    const valid = await registerSchema.validate({
      firstName: "Daniel",
      lastName: "Effiong",
      email: "it.dannybizman@gmail.com",
      password: "Password123",
    });
    expect(valid.firstName).toBe("Daniel");

    await expect(
      registerSchema.validate({
        firstName: "A".repeat(33),
        lastName: "Effiong",
        email: "it.dannybizman@gmail.com",
        password: "Password123",
      })
    ).rejects.toThrow();
  });

  it("validates 6-digit OTP", async () => {
    await expect(
      verifyOtpSchema.validate({ email: "a@b.com", otp: "123" })
    ).rejects.toThrow();
    const valid = await verifyOtpSchema.validate({
      email: "a@b.com",
      otp: "123456",
    });
    expect(valid.otp).toBe("123456");
  });

  it("validates forgotPassword and resetPassword matching passwords", async () => {
    await expect(
      forgotPasswordSchema.validate({ email: "invalid" })
    ).rejects.toThrow();
    await expect(
      resetPasswordSchema.validate({
        password: "Password1",
        confirmPassword: "Password2",
      })
    ).rejects.toThrow();
  });
});

