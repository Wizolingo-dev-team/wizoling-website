import * as yup from "yup";

export const purchaseTicketSelectionSchema = yup.object({
  tierId: yup.string().required("Ticket tier ID is required"),
  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .required("Ticket quantity is required")
    .min(1, "Ticket quantity must be at least 1"),
});

export const purchaseTicketSchema = yup.object({
  eventId: yup.string().required("Event ID is required"),
  tickets: yup
    .array()
    .of(purchaseTicketSelectionSchema)
    .min(1, "Please select at least one ticket")
    .required("Ticket selection is required"),
  attendeeName: yup
    .string()
    .trim()
    .required("Attendee full name is required")
    .min(2, "Attendee name must be at least 2 characters"),
  email: yup
    .string()
    .trim()
    .lowercase()
    .email("Please enter a valid email address")
    .required("Email address is required"),
  phone: yup.string().trim().optional().default(""),
});

export const confirmTicketPaymentSchema = yup.object({
  ticketOrderId: yup.string().required("Ticket order ID is required"),
  paypalOrderId: yup.string().optional(),
  transactionId: yup.string().optional(),
});

