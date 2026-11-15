"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const PLACEHOLDER_POSTS = [
  {
    tag: "NEWS",
    date: "2026",
    title: "Latest Update Title 01",
    href: "/news",
    image: "/images/gallery/wizolingo6.jpg",
  },
  {
    tag: "BIOGRAPHY",
    date: "STORY",
    title: "Artist Biography & Journey",
    href: "/biography",
    image: "/images/gallery/wizolingo7.jpg",
  },
  {
    tag: "VIDEOS",
    date: "WATCH",
    title: "Music Videos & Sessions",
    href: "/videos",
    image: "/images/gallery/wizolingo8.jpg",
  },
];

export default function HomeNewsHighlights() {
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
          {PLACEHOLDER_POSTS.map((post) => (
            <Link
              key={post.title}
              href={post.href}
              className="group block border border-white/10 bg-[#333132]/50 backdrop-blur-sm transition-colors hover:border-[#D70E1D]/60"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#222222]/80 border-b border-white/10">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover object-[center_20%] transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em]">
                  <span className="text-[#D70E1D]">{post.tag}</span>
                  <span className="text-white/40">/</span>
                  <span className="text-white/60">{post.date}</span>
                </div>
                <h3 className="font-display text-lg font-bold uppercase tracking-wide text-white group-hover:text-[#D70E1D] transition-colors">
                  {post.title}
                </h3>
                <span className="inline-block pt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70 group-hover:text-white">
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
