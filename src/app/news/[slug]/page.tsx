import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SingleNewsPost from "@src/components/Sections/News/SinglePost";
import { NEWS_POSTS, getNewsPostBySlug, type NewsPost } from "@src/constants/news";
import env from "@src/env";
import type { BlogPost } from "@src/types/blogManagement";
import type { ApiDataResponse } from "@src/types/common";
import { normalizeBlogPost } from "@src/utils/normalizeBlogPost";

const SITE_URL = "https://www.wizofuasia.com";

export const dynamic = "force-dynamic";

// Pre-render known static slugs at build time; new API slugs render on-demand
export function generateStaticParams() {
  return NEWS_POSTS.map((post) => ({ slug: post.slug }));
}

/** Attempts server-safe API fetch first, then falls back to static NEWS_POSTS data */
async function resolvePost(slug: string): Promise<NewsPost | undefined> {
  try {
    const baseUrl = env.NEXT_PUBLIC_API_BASE_URL.replace(/\/+$/, "");
    const res = await fetch(`${baseUrl}/blogs/${encodeURIComponent(slug)}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const json = (await res.json()) as ApiDataResponse<BlogPost>;
      if (json?.data) return normalizeBlogPost(json.data);
    }
  } catch {
    // API unavailable — fall back to static
  }
  return getNewsPostBySlug(slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await resolvePost(slug);
  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/news/${post.slug}` },
    openGraph: {
      type: "article",
      title: `${post.title} | Wiz Ofuasia (Wizboyy)`,
      description: post.excerpt,
      url: `/news/${post.slug}`,
      publishedTime: post.isoDate,
      authors: [post.author],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 800,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function SingleNewsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await resolvePost(slug);
  if (!post) notFound();

  const imageUrl = post.coverImage.startsWith("http")
    ? post.coverImage
    : `${SITE_URL}${post.coverImage}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: imageUrl,
    datePublished: post.isoDate,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Wiz Ofuasia (Wizboyy)",
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}/news/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <SingleNewsPost post={post} />
    </>
  );
}
