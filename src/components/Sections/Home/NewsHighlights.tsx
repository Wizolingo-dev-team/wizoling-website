"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NEWS_POSTS } from "@src/constants/news";

export default function HomeNewsHighlights() {
  const featuredPosts = NEWS_POSTS.slice(0, 3);

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D70E1D]">
              Editorial
            </p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-white">
              NEWS &amp; STORIES
            </h2>
          </div>
          <Link
            href="/news"
            className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/75 hover:text-[#D70E1D] transition-colors"
          >
            ALL NEWS
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/news/${post.slug}`}
              className="group flex flex-col border border-white/10 bg-[#333132]/50 backdrop-blur-sm transition-colors hover:border-[#D70E1D]/60"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#181818] border-b border-white/10">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-6 space-y-3">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em]">
                    <span className="text-[#D70E1D]">{post.category}</span>
                    <span className="text-white/40">/</span>
                    <span className="text-white/60">{post.date}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide text-white group-hover:text-[#D70E1D] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-white/65 line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
                <span className="inline-block pt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70 group-hover:text-white">
                  READ MORE &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
