import { describe, expect, it } from "vitest";
import * as yup from "yup";
import { validateWithSchema } from "./validation";

const sampleSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Min 6 chars")
    .required("Password is required"),
});

describe("validateWithSchema", () => {
  it("returns success and parsed data for valid input", async () => {
    const result = await validateWithSchema(sampleSchema, {
      email: "fan@wizofuasia.com",
      password: "password123",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("fan@wizofuasia.com");
      expect(result.errors).toEqual({});
    }
  });

  it("collects all field errors when abortEarly is false", async () => {
    const result = await validateWithSchema(sampleSchema, {
      email: "",
      password: "123",
    });

    expect(result.success).toBe(false);
    expect(result.errors.email).toBe("Email is required");
    expect(result.errors.password).toBe("Min 6 chars");
  });

  it("rethrows non-Yup errors", async () => {
    const brokenSchema = {
      validate: async () => {
        throw new Error("Unexpected failure");
      },
    } as unknown as yup.Schema<unknown>;

    await expect(validateWithSchema(brokenSchema, {})).rejects.toThrow(
      "Unexpected failure"
    );
  });
});

