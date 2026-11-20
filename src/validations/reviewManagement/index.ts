import * as yup from "yup";

export const addReviewSchema = yup.object({
  productId: yup.string().required("Product ID is required"),
  rating: yup
    .number()
    .typeError("Rating must be a number")
    .required("Rating is required")
    .min(1, "Minimum rating is 1 star")
    .max(5, "Maximum rating is 5 stars"),
  review: yup
    .string()
    .trim()
    .required("Please write a review comment")
    .min(3, "Review must be at least 3 characters"),
});

