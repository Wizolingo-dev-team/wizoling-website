import * as yup from "yup";

export const toggleWishlistSchema = yup.object({
  productId: yup.string().required("Product ID is required"),
});

