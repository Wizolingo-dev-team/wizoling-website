"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGetAllBlogPosts } from "@src/hooks/blogManagement";
import { normalizeBlogPost } from "@src/utils/normalizeBlogPost";
import type { NewsPost } from "@src/constants/news";
import SearchBar from "@src/components/SearchBar";
import { cn } from "@src/lib/utils";

type NewsSidebarProps = {
  /** Pre-fetched posts from parent; if omitted the sidebar fetches its own from API */
  posts?: NewsPost[];
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  activeCategory?: string | null;
  onCategoryChange?: (cat: string | null) => void;
  activeTag?: string | null;
  onTagChange?: (tag: string | null) => void;
  currentSlug?: string;
};

export default function NewsSidebar({
  posts: externalPosts,
  searchQuery,
  onSearchChange,
  activeCategory = null,
  onCategoryChange,
  activeTag = null,
  onTagChange,
  currentSlug,
}: NewsSidebarProps) {
  const router = useRouter();
  const [localQuery, setLocalQuery] = useState("");

  // Fetch exclusively from the backend API
  const { data: blogData } = useGetAllBlogPosts();

  const posts: NewsPost[] = useMemo(() => {
    if (externalPosts && externalPosts.length > 0) return externalPosts;
    if (blogData?.posts && Array.isArray(blogData.posts)) {
      return blogData.posts.map(normalizeBlogPost);
    }
    return [];
  }, [externalPosts, blogData]);

  const categories = useMemo(
    () => Array.from(new Set(posts.map((p) => p.category).filter(Boolean))),
    [posts]
  );

  const tags = useMemo(
    () => Array.from(new Set(posts.flatMap((p) => p.tags).filter(Boolean))),
    [posts]
  );

  const effectiveQuery =
    searchQuery !== undefined ? searchQuery : localQuery;

  const handleSearchChange = (q: string) => {
    if (onSearchChange) {
      onSearchChange(q);
    } else {
      setLocalQuery(q);
    }
  };

  const handleSearchSubmit = (q: string) => {
    if (onSearchChange) {
      onSearchChange(q);
      return;
    }
    const trimmed = q.trim();
    router.push(
      trimmed ? `/news?q=${encodeURIComponent(trimmed)}` : "/news"
    );
  };

  return (
    <aside className="space-y-8 lg:sticky lg:top-28">
      {/* Search Widget */}
      <div className="border border-white/15 bg-black/50 backdrop-blur-sm p-6 space-y-4">
        <h3 className="font-display text-xs font-extrabold uppercase tracking-[0.25em] text-white">
          SEARCH
        </h3>
        <SearchBar
          value={effectiveQuery}
          onChange={handleSearchChange}
          onSubmit={handleSearchSubmit}
          placeholder="Search articles..."
          ariaLabel="Search news articles"
        />
      </div>

      {/* Categories Widget */}
      {categories.length > 0 && (
        <div className="border border-white/15 bg-black/50 backdrop-blur-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xs font-extrabold uppercase tracking-[0.25em] text-white">
              CATEGORIES
            </h3>
            {activeCategory && onCategoryChange && (
              <button
                type="button"
                onClick={() => onCategoryChange(null)}
                className="text-[10px] font-bold uppercase tracking-widest text-[#D70E1D] hover:text-white"
              >
                RESET
              </button>
            )}
          </div>
          <ul className="divide-y divide-white/10">
            {categories.map((cat) => {
              const count = posts.filter((p) => p.category === cat).length;
              const isActive = activeCategory === cat;
              return (
                <li key={cat}>
                  {onCategoryChange ? (
                    <button
                      type="button"
                      onClick={() => onCategoryChange(isActive ? null : cat)}
                      className={cn(
                        "flex w-full items-center justify-between py-2.5 text-left text-xs uppercase tracking-[0.16em] transition-colors",
                        isActive
                          ? "font-bold text-[#D70E1D]"
                          : "text-white/75 hover:text-[#D70E1D]"
                      )}
                    >
                      <span>{cat}</span>
                      <span className="text-white/45">({count})</span>
                    </button>
                  ) : (
                    <Link
                      href={`/news?category=${encodeURIComponent(cat)}`}
                      className="flex w-full items-center justify-between py-2.5 text-xs uppercase tracking-[0.16em] text-white/75 transition-colors hover:text-[#D70E1D]"
                    >
                      <span>{cat}</span>
                      <span className="text-white/45">({count})</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Recent Posts Widget */}
      {posts.length > 0 && (
        <div className="border border-white/15 bg-black/50 backdrop-blur-sm p-6 space-y-4">
          <h3 className="font-display text-xs font-extrabold uppercase tracking-[0.25em] text-white">
            RECENT POSTS
          </h3>
          <div className="space-y-4">
            {posts.slice(0, 5).map((post) => {
              const isCurrent = post.slug === currentSlug;
              return (
                <Link
                  key={post.slug}
                  href={`/news/${post.slug}`}
                  className="group flex items-center gap-3.5"
                >
                  <div className="relative size-16 shrink-0 overflow-hidden border border-white/15 bg-[#181818]">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="64px"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0 space-y-1">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D70E1D]">
                      {post.date}
                    </p>
                    <h4
                      className={cn(
                        "line-clamp-2 font-display text-xs font-bold uppercase tracking-wide transition-colors",
                        isCurrent
                          ? "text-[#D70E1D]"
                          : "text-white group-hover:text-[#D70E1D]"
                      )}
                    >
                      {post.title}
                    </h4>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Tags Widget */}
      {tags.length > 0 && (
        <div className="border border-white/15 bg-black/50 backdrop-blur-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xs font-extrabold uppercase tracking-[0.25em] text-white">
              TAGS
            </h3>
            {activeTag && onTagChange && (
              <button
                type="button"
                onClick={() => onTagChange(null)}
                className="text-[10px] font-bold uppercase tracking-widest text-[#D70E1D] hover:text-white"
              >
                RESET
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => {
              const isActive = activeTag === tag;
              return onTagChange ? (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onTagChange(isActive ? null : tag)}
                  className={cn(
                    "border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors",
                    isActive
                      ? "border-[#D70E1D] bg-[#D70E1D] text-white"
                      : "border-white/20 text-white/75 hover:border-[#D70E1D] hover:text-white"
                  )}
                >
                  {tag}
                </button>
              ) : (
                <Link
                  key={tag}
                  href={`/news?tag=${encodeURIComponent(tag)}`}
                  className="border border-white/20 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/75 transition-colors hover:border-[#D70E1D] hover:text-white"
                >
                  {tag}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
}
