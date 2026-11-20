import * as yup from "yup";

export const subscribeNewsletterSchema = yup.object({
  email: yup
    .string()
    .trim()
    .lowercase()
    .email("Please provide a valid email address")
    .required("Email address is required"),
  name: yup.string().trim().optional().default(""),
  source: yup
    .string()
    .oneOf(["popup", "footer", "checkout", "admin", "other"])
    .optional()
    .default("popup"),
});

export const unsubscribeNewsletterSchema = yup.object({
  email: yup
    .string()
    .trim()
    .lowercase()
    .email("Please provide a valid email address")
    .optional(),
  token: yup.string().trim().optional(),
});

