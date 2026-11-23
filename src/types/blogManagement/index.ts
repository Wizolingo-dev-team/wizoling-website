// Blog / News post types — aligned with wizolingo-server blog schema
import type { MongoEntity } from "@src/types/common";

export type BlogInlineImage = {
  url: string;
  public_id?: string;
  uploadedAt?: string;
};

export type BlogPost = MongoEntity & {
  title: string;
  slug: string;
  excerpt: string;
  /** Rich-text content stored as string (markdown/HTML/plain text) or array of paragraphs */
  content: string | string[];
  coverImage: string;
  coverImagePublicId?: string;
  inlineImages?: BlogInlineImage[];
  category: string;
  author: string;
  readTime: string;
  tags: string[];
  status: "Draft" | "Published";
  isPublished: boolean;
  views?: number;
  date?: string;
  isoDate?: string;
};

export type GetAllBlogPostsParams = {
  category?: string;
  tag?: string;
  search?: string;
  page?: number;
  limit?: number;
  status?: string;
};

export type BlogCategoryItem = {
  name: string;
  count: number;
};

export type BlogListResponse = {
  success: boolean;
  data: BlogPost[];
  total: number;
  currentPage: number;
  totalPages: number;
};
