import type { MongoEntity } from "@src/types/common";

export type Discount = MongoEntity & {
  discountCode: string;
  discountPercentage: number;
  products: string[];
  expiryDate: string;
  isActive: boolean;
};

export type ValidateDiscountPayload = {
  code: string;
  productId?: string;
};

export type ValidateDiscountResponse = {
  discountCode: string;
  discountPercentage: number;
  products: string[];
  expiryDate: string;
};

