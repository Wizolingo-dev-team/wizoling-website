import { apiClient } from "@src/lib/apiClient";
import type { ApiDataResponse } from "@src/types/common";
import type {
  BlogCategoryItem,
  BlogPost,
  GetAllBlogPostsParams,
} from "@src/types/blogManagement";

const BASE_URL = "/blogs";

export type RawBlogListResponse = {
  success: boolean;
  data: BlogPost[];
  total: number;
  currentPage: number;
  totalPages: number;
};

export const blogService = {
  getAllPosts: async (params?: GetAllBlogPostsParams) => {
    return apiClient.get<RawBlogListResponse>(
      BASE_URL,
      "Failed to fetch blog posts",
      { params }
    );
  },

  getPostBySlug: async (slug: string) => {
    return apiClient.get<ApiDataResponse<BlogPost>>(
      `${BASE_URL}/${slug}`,
      "Failed to fetch blog post"
    );
  },

  getCategories: async () => {
    return apiClient.get<ApiDataResponse<BlogCategoryItem[]>>(
      `${BASE_URL}/categories`,
      "Failed to fetch blog categories"
    );
  },

  getTags: async () => {
    return apiClient.get<ApiDataResponse<string[]>>(
      `${BASE_URL}/tags`,
      "Failed to fetch blog tags"
    );
  },
};
