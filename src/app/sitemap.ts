import type { MetadataRoute } from "next";
import { blogService } from "@src/lib/requests/blogManagement";

const SITE_URL = "https://www.wizofuasia.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/songs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/videos`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/events`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/gallery`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/biography`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/news`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  let newsRoutes: MetadataRoute.Sitemap = [];
  try {
    const res = await blogService.getAllPosts({ limit: 100 });
    const posts = Array.isArray(res?.data) ? res.data : [];
    newsRoutes = posts.map((post) => ({
      url: `${SITE_URL}/news/${post.slug}`,
      lastModified: new Date(post.isoDate || post.updatedAt || now),
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch {
    // Backend API offline or unreachable during build
  }

  return [...staticRoutes, ...newsRoutes];
}
