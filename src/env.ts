const apiBaseUrl =
  process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:6000/api";

export const env = {
  NODE_ENV:
    (process.env.NODE_ENV as "development" | "test" | "production") ??
    "development",
  NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? "http://localhost:3000",
  NEXTAUTH_SECRET:
    process.env.NEXTAUTH_SECRET ??
    "9f4c8e2a7b1d6f3e5a0c9b8d4e7f2a1c6b5d8e3f9a2c4b7e1d5f8a3c6b9e2d4f",
  NEXT_PUBLIC_ADMIN_API_BASE_URL: apiBaseUrl,
  NEXT_PUBLIC_API_BASE_URL: apiBaseUrl,
} as const;

export default env;
