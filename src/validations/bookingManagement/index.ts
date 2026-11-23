import * as yup from "yup";

export const bookingInquirySchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .required("Full name is required")
    .min(2, "Name must be at least 2 characters")
    .max(64, "Name cannot exceed 64 characters"),
  email: yup
    .string()
    .trim()
    .lowercase()
    .email("Please enter a valid email address")
    .required("Email is required"),
  phone: yup.string().trim().optional().default(""),
  eventType: yup
    .string()
    .required("Please select an event type")
    .oneOf(
      ["concert", "festival", "private", "corporate", "tv-radio", "other"],
      "Invalid event type"
    ),
  eventDate: yup.string().trim().optional().default(""),
  country: yup.string().trim().optional().default(""),
  message: yup
    .string()
    .trim()
    .required("Please describe your booking inquiry")
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message cannot exceed 1000 characters"),
});

export type BookingInquiryFields = yup.InferType<typeof bookingInquirySchema>;

