import type { MongoEntity } from "@src/types/common";
import type { Product } from "@src/types/productManagement";

export type Wishlist = MongoEntity & {
  user: string;
  products: Product[];
};

export type ToggleWishlistPayload = {
  productId: string;
};

export type ToggleWishlistData = {
  wishlist: Wishlist;
  isAdded: boolean;
};

