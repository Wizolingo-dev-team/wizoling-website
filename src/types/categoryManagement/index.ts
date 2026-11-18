import type { MongoEntity } from "@src/types/common";

export type CategoryType = "merch" | "digital_music" | "general";

export type Subcategory = MongoEntity & {
  subcategoryName: string;
};

export type Category = MongoEntity & {
  categoryName: string;
  categoryType: CategoryType;
  subcategories: Subcategory[];
};

export type GetAllCategoriesParams = {
  categoryType?: CategoryType;
};

