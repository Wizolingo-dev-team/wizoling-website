import * as yup from "yup";

export const registerSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(32, "First name cannot exceed 32 characters"),
  lastName: yup
    .string()
    .trim()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(32, "Last name cannot exceed 32 characters"),
  email: yup
    .string()
    .trim()
    .lowercase()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(64, "Password cannot exceed 64 characters"),
  phoneNumber: yup.string().trim().optional().default(""),
  address: yup.string().trim().optional().default(""),
  avatar: yup.mixed().nullable().optional(),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .lowercase()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const verifyOtpSchema = yup.object({
  email: yup
    .string()
    .trim()
    .lowercase()
    .email("Please enter a valid email address")
    .required("Email is required"),
  otp: yup
    .string()
    .trim()
    .required("Verification OTP is required")
    .matches(/^[0-9]+$/, "OTP must contain only digits")
    .length(6, "OTP must be exactly 6 digits"),
});

export const resendOtpSchema = yup.object({
  email: yup
    .string()
    .trim()
    .lowercase()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .trim()
    .lowercase()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .required("New password is required")
    .min(6, "Password must be at least 6 characters")
    .max(64, "Password cannot exceed 64 characters"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

