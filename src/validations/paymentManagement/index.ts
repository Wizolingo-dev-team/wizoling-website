import * as yup from "yup";

export const createPayPalOrderSchema = yup.object({
  orderId: yup.string().required("Order ID is required"),
});

export const capturePayPalOrderSchema = yup.object({
  orderId: yup.string().required("Order ID is required"),
  paypalOrderId: yup.string().optional(),
  transactionId: yup.string().optional(),
});

