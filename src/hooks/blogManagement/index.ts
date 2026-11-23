"use client";

import { useQuery } from "@tanstack/react-query";
import { blogService } from "@src/lib/requests/blogManagement";
import type { GetAllBlogPostsParams } from "@src/types/blogManagement";

export const useGetAllBlogPosts = (params?: GetAllBlogPostsParams) => {
  return useQuery({
    queryKey: ["blogPosts", params],
    queryFn: async () => {
      const response = await blogService.getAllPosts(params);
      return {
        posts: response?.data ?? [],
        total: response?.total ?? 0,
        currentPage: response?.currentPage ?? 1,
        totalPages: response?.totalPages ?? 1,
      };
    },
  });
};

export const useGetBlogPostBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["blogPost", slug],
    queryFn: async () => {
      const response = await blogService.getPostBySlug(slug);
      return response.data;
    },
    enabled: Boolean(slug),
  });
};

export const useGetBlogCategories = () => {
  return useQuery({
    queryKey: ["blogCategories"],
    queryFn: async () => {
      const response = await blogService.getCategories();
      return response.data ?? [];
    },
  });
};

export const useGetBlogTags = () => {
  return useQuery({
    queryKey: ["blogTags"],
    queryFn: async () => {
      const response = await blogService.getTags();
      return response.data ?? [];
    },
  });
};
