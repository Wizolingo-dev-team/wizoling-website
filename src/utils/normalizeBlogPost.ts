import type { BlogPost } from "@src/types/blogManagement";
import type { NewsPost } from "@src/constants/news";

/**
 * Normalises a BlogPost from the backend (wizolingo-server) into the NewsPost shape.
 */
export function normalizeBlogPost(post: BlogPost): NewsPost {
  const coverImage =
    typeof post.coverImage === "string" && post.coverImage
      ? post.coverImage
      : "/images/gallery/wizolingo1.jpg";

  const date =
    post.date ||
    (post.createdAt
      ? new Date(post.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "");

  const isoDate = post.isoDate || post.createdAt || "";

  // Content in MongoDB is stored as a string with newlines or already an array
  let contentParagraphs: string[] = [];
  if (Array.isArray(post.content)) {
    contentParagraphs = post.content;
  } else if (typeof post.content === "string") {
    contentParagraphs = post.content
      .split(/\r?\n\r?\n/)
      .map((p) => p.trim())
      .filter(Boolean);
  }

  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt ?? "",
    date,
    isoDate,
    category: post.category ?? "Articles",
    author: post.author ?? "Wiz Ofuasia Editorial",
    readTime: post.readTime ?? "3 min read",
    coverImage,
    tags: Array.isArray(post.tags) ? post.tags : [],
    content: contentParagraphs,
  };
}
