import * as yup from "yup";

export const createOrderProductItemSchema = yup.object({
  _id: yup.string().required("Product ID is required"),
  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .required("Quantity is required")
    .min(1, "Quantity must be at least 1"),
  size: yup.string().optional(),
  color: yup.string().optional(),
});

export const createOrderSchema = yup.object({
  products: yup
    .array()
    .of(createOrderProductItemSchema)
    .min(1, "Your cart must contain at least one product")
    .required("Order products are required"),
  includesMerch: yup.boolean().default(false),
  email: yup
    .string()
    .trim()
    .lowercase()
    .email("Please enter a valid email address")
    .required("Email address is required"),
  phone: yup.string().when("includesMerch", {
    is: true,
    then: (schema) =>
      schema.trim().required("Phone number is required for physical delivery"),
    otherwise: (schema) => schema.optional(),
  }),
  address: yup.string().when("includesMerch", {
    is: true,
    then: (schema) =>
      schema
        .trim()
        .required("Street address is required for physical delivery"),
    otherwise: (schema) => schema.optional(),
  }),
  city: yup.string().when("includesMerch", {
    is: true,
    then: (schema) =>
      schema.trim().required("City is required for physical delivery"),
    otherwise: (schema) => schema.optional(),
  }),
  state: yup.string().when("includesMerch", {
    is: true,
    then: (schema) =>
      schema
        .trim()
        .required("State / Province is required for physical delivery"),
    otherwise: (schema) => schema.optional(),
  }),
  country: yup.string().when("includesMerch", {
    is: true,
    then: (schema) =>
      schema.trim().required("Country is required for physical delivery"),
    otherwise: (schema) => schema.optional(),
  }),
  postalCode: yup.string().trim().optional(),
  additionalInfo: yup.string().trim().optional(),
  discountCode: yup.string().trim().optional(),
  deliveryFee: yup.number().min(0).optional().default(0),
  paymentMethod: yup
    .string()
    .oneOf(["paypal", "manual"])
    .optional()
    .default("manual"),
});

