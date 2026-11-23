export type NewsPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  isoDate: string;
  category: string;
  author: string;
  readTime: string;
  coverImage: string;
  tags: string[];
  content: string[];
};

/**
 * Static dummy blog posts removed.
 * Blog articles are now exclusively fetched from the backend API (wizolingo-server).
 */
export const NEWS_POSTS: NewsPost[] = [];

export function getNewsPostBySlug(slug: string): NewsPost | undefined {
  return NEWS_POSTS.find((post) => post.slug === slug);
}

export function getAllNewsCategories(): string[] {
  return Array.from(new Set(NEWS_POSTS.map((p) => p.category)));
}

export function getAllNewsTags(): string[] {
  return Array.from(new Set(NEWS_POSTS.flatMap((p) => p.tags)));
}
