import * as yup from "yup";

export const addNotificationSchema = yup.object({
  title: yup
    .string()
    .trim()
    .required("Notification title is required")
    .min(3, "Title must be at least 3 characters"),
  description: yup
    .string()
    .trim()
    .required("Notification description is required")
    .min(5, "Description must be at least 5 characters"),
  type: yup
    .string()
    .oneOf(["order", "download", "event", "newsletter", "auth", "system"])
    .optional()
    .default("system"),
  onClick: yup.string().optional().default("/"),
});

