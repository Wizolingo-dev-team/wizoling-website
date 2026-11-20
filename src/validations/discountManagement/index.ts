import * as yup from "yup";

export const validateDiscountSchema = yup.object({
  code: yup
    .string()
    .trim()
    .uppercase()
    .required("Please enter a discount code")
    .min(3, "Discount code must be at least 3 characters"),
  productId: yup.string().optional(),
});

