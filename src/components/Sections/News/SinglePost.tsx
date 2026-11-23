"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Breadcrumb from "@src/components/Breadcrumb";
import type { NewsPost } from "@src/constants/news";
import { useGetAllBlogPosts } from "@src/hooks/blogManagement";
import { normalizeBlogPost } from "@src/utils/normalizeBlogPost";
import NewsSidebar from "./NewsSidebar";

type SinglePostProps = {
  post: NewsPost;
};

export default function SingleNewsPost({ post }: SinglePostProps) {
  const { data: blogData } = useGetAllBlogPosts();

  const allPosts = useMemo(() => {
    if (blogData?.posts && Array.isArray(blogData.posts)) {
      return blogData.posts.map(normalizeBlogPost);
    }
    return [];
  }, [blogData]);

  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : undefined;
  const nextPost =
    currentIndex >= 0 && currentIndex < allPosts.length - 1
      ? allPosts[currentIndex + 1]
      : undefined;

  return (
    <div className="pb-20">
      {/* Header + Breadcrumbs */}
      <section className="border-b border-white/10 pt-24 pb-10 sm:pt-28 sm:pb-12 lg:pt-36 lg:pb-14">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 space-y-5">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "News", href: "/news" },
              { label: post.title },
            ]}
          />

          <div className="space-y-3 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em]">
              <span className="bg-[#D70E1D] px-3 py-1 text-white">
                {post.category}
              </span>
              <span className="text-white/65">{post.date}</span>
              <span className="text-white/30">&bull;</span>
              <span className="text-white/65">{post.readTime}</span>
            </div>

            <h1 className="font-display text-[clamp(1.75rem,4vw,3.25rem)] font-extrabold uppercase tracking-wide leading-[1.08] text-white break-words">
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Micdrop Party-Time Single Post + Right Sidebar */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Article Content */}
            <article className="lg:col-span-8 min-w-0 space-y-8 border border-white/15 bg-black/55 backdrop-blur-sm p-6 sm:p-10 shadow-2xl">
              <div className="relative w-full overflow-hidden border border-white/10 bg-[#121212]">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  width={1200}
                  height={800}
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="mx-auto block h-auto max-h-[640px] w-full object-contain"
                />
              </div>

              {/* Author byline */}
              <div className="flex items-center gap-3 border-y border-white/10 py-4 text-xs uppercase tracking-[0.16em] text-white/60">
                <span>By <strong className="text-white">{post.author}</strong></span>
                <span>&bull;</span>
                <span>{post.date}</span>
              </div>

              {/* Body paragraphs */}
              <div className="space-y-5 text-sm sm:text-base leading-relaxed text-white/85">
                {post.content.map((paragraph, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="border-t border-white/10 pt-6 space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50">
                    Tagged
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/news?tag=${encodeURIComponent(tag)}`}
                        className="border border-white/20 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/75 transition-colors hover:border-[#D70E1D] hover:text-white"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Prev / Next Article Navigation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-6">
                <div>
                  {prevPost && (
                    <Link
                      href={`/news/${prevPost.slug}`}
                      className="group flex items-start gap-3 border border-white/15 p-4 transition-colors hover:border-[#D70E1D]"
                    >
                      <ChevronLeft className="mt-0.5 size-4 shrink-0 text-[#D70E1D]" />
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                          Previous Article
                        </p>
                        <p className="mt-1 line-clamp-1 font-display text-xs font-bold uppercase tracking-wide text-white group-hover:text-[#D70E1D]">
                          {prevPost.title}
                        </p>
                      </div>
                    </Link>
                  )}
                </div>
                <div>
                  {nextPost && (
                    <Link
                      href={`/news/${nextPost.slug}`}
                      className="group flex items-start justify-end gap-3 border border-white/15 p-4 text-right transition-colors hover:border-[#D70E1D]"
                    >
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                          Next Article
                        </p>
                        <p className="mt-1 line-clamp-1 font-display text-xs font-bold uppercase tracking-wide text-white group-hover:text-[#D70E1D]">
                          {nextPost.title}
                        </p>
                      </div>
                      <ChevronRight className="mt-0.5 size-4 shrink-0 text-[#D70E1D]" />
                    </Link>
                  )}
                </div>
              </div>
            </article>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 min-w-0">
              <NewsSidebar currentSlug={post.slug} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
