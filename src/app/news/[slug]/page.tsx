import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SingleNewsPost from "@src/components/Sections/News/SinglePost";
import { NEWS_POSTS, getNewsPostBySlug } from "@src/constants/news";

const SITE_URL = "https://www.wizofuasia.com";

export function generateStaticParams() {
  return NEWS_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getNewsPostBySlug(slug);
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
  const post = getNewsPostBySlug(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${SITE_URL}${post.coverImage}`,
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

