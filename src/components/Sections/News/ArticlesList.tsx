"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { NEWS_POSTS } from "@src/constants/news";
import NewsSidebar from "./NewsSidebar";

export default function NewsArticlesList() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const initialCategory = searchParams.get("category");
  const initialTag = searchParams.get("tag");

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<string | null>(
    initialCategory
  );
  const [activeTag, setActiveTag] = useState<string | null>(initialTag);

  useEffect(() => {
    setSearchQuery(initialQuery);
    setActiveCategory(initialCategory);
    setActiveTag(initialTag);
  }, [initialQuery, initialCategory, initialTag]);

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return NEWS_POSTS.filter((post) => {
      if (activeCategory && post.category !== activeCategory) return false;
      if (activeTag && !post.tags.includes(activeTag)) return false;
      if (!q) return true;
      return (
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q)) ||
        post.content.some((p) => p.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, activeCategory, activeTag]);

  const hasActiveFilter = Boolean(
    searchQuery.trim() || activeCategory || activeTag
  );

  const resetFilters = () => {
    setSearchQuery("");
    setActiveCategory(null);
    setActiveTag(null);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        {/* Micdrop Right-Sidebar 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Main Feed */}
          <div className="lg:col-span-8 min-w-0 space-y-12">
            {hasActiveFilter && (
              <div className="flex flex-wrap items-center justify-between gap-3 border border-white/15 bg-black/50 px-5 py-3.5 text-xs text-white/75">
                <span>
                  Showing <strong className="text-white">{filteredPosts.length}</strong>{" "}
                  {filteredPosts.length === 1 ? "article" : "articles"}
                  {searchQuery.trim() ? ` matching "${searchQuery.trim()}"` : ""}
                  {activeCategory ? ` in ${activeCategory}` : ""}
                  {activeTag ? ` tagged #${activeTag}` : ""}
                </span>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D70E1D] hover:text-white"
                >
                  CLEAR FILTERS
                </button>
              </div>
            )}

            {filteredPosts.length === 0 ? (
              <div className="border border-white/15 bg-black/50 p-10 text-center space-y-4">
                <p className="font-display text-lg font-bold uppercase tracking-wide text-white">
                  No articles match your filter
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center justify-center bg-[#D70E1D] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-white hover:text-[#111111]"
                >
                  SHOW ALL ARTICLES
                </button>
              </div>
            ) : (
              filteredPosts.map((post, idx) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: 0.45, delay: idx * 0.06 }}
                  className="group overflow-hidden border border-white/15 bg-black/50 backdrop-blur-sm shadow-2xl"
                >
                  <Link
                    href={`/news/${post.slug}`}
                    className="relative block w-full overflow-hidden bg-[#121212]"
                  >
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      width={1200}
                      height={1800}
                      priority={idx === 0}
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="mx-auto block h-auto max-h-[680px] w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    <span className="absolute top-4 left-4 bg-[#D70E1D] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white">
                      {post.category}
                    </span>
                  </Link>

                  <div className="p-6 sm:p-8 lg:p-10 space-y-4">
                    <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
                      <span>{post.date}</span>
                      <span className="text-white/25">&bull;</span>
                      <span>{post.author}</span>
                      <span className="text-white/25">&bull;</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h2 className="font-display text-[clamp(1.4rem,2.6vw,2.1rem)] font-extrabold uppercase tracking-wide leading-tight text-white break-words">
                      <Link
                        href={`/news/${post.slug}`}
                        className="transition-colors hover:text-[#D70E1D]"
                      >
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-sm sm:text-base leading-relaxed text-white/75">
                      {post.excerpt}
                    </p>

                    <div className="pt-2">
                      <Link
                        href={`/news/${post.slug}`}
                        className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white transition-all hover:border-[#D70E1D] hover:bg-[#D70E1D]"
                      >
                        <span>READ MORE</span>
                        <ArrowRight className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 min-w-0">
            <NewsSidebar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              activeTag={activeTag}
              onTagChange={setActiveTag}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
