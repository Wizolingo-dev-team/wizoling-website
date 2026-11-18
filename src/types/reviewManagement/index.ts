import type { CloudinaryAsset, MongoEntity } from "@src/types/common";

export type ReviewUser = {
  _id: string;
  firstName: string;
  lastName: string;
  avatar?: CloudinaryAsset;
};

export type Review = MongoEntity & {
  user: string | ReviewUser;
  product: string;
  review: string;
  rating: number;
};

export type AddReviewPayload = {
  productId: string;
  review: string;
  rating: number;
};

export type GetReviewsParams = {
  productId?: string;
};

