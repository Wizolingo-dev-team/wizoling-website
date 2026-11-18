import type { MongoEntity } from "@src/types/common";
import type { Category } from "@src/types/categoryManagement";
import type { Discount } from "@src/types/discountManagement";

export type ProductType = "merch" | "digital_music";

export type DigitalReleaseType =
  | "single"
  | "album"
  | "ep"
  | "instrumental"
  | "stem_pack"
  | "";

export type DigitalFileFormat = "mp3" | "wav" | "flac" | "aac" | "zip" | "pdf";

export type DigitalFile = {
  _id: string;
  fileName: string;
  fileUrl?: string; // Excluded on public GET endpoints, present on /products/download/:productId
  publicId?: string;
  fileFormat: DigitalFileFormat;
  fileSize: number;
};

export type TracklistItem = {
  trackNumber: number;
  title: string;
  duration: string;
  featuredArtists: string;
};

export type Product = MongoEntity & {
  productName: string;
  slug: string;
  productType: ProductType;
  description: string;
  price: number;
  categories: Category[];
  subcategoryId?: string | null;
  discounts?: Discount | null;
  // Merch fields
  quantity: number;
  color: string[];
  size: string[];
  shipping: boolean;
  // Digital music fields
  digitalReleaseType: DigitalReleaseType;
  artist: string;
  releaseDate?: string;
  duration: string;
  previewUrl: string;
  digitalFiles: DigitalFile[];
  tracklist: TracklistItem[];
  downloadCount: number;
  // Shared metadata
  sold: number;
  attachments: string[];
  isFeatured: boolean;
  isActive: boolean;
};

export type GetAllProductsParams = {
  productType?: ProductType;
  category?: string;
  featured?: boolean;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  color?: string;
  size?: string;
  sort?: string;
};

export type ProductFilterOptions = {
  minPrice: number;
  maxPrice: number;
  colors: string[];
  sizes: string[];
};

export type DigitalDownloadData = {
  productId: string;
  productName: string;
  artist: string;
  digitalReleaseType: DigitalReleaseType;
  digitalFiles: DigitalFile[];
};

