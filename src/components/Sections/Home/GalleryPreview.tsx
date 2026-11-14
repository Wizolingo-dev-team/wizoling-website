"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";

const GALLERY_THUMBS = [
  { src: "/images/wizolingo2.JPG", alt: "Wiz Ofuasia gallery 1" },
  { src: "/images/wizolingo3.JPG", alt: "Wiz Ofuasia gallery 2" },
  { src: "/images/wizolingo4.JPG", alt: "Wiz Ofuasia gallery 3" },
  { src: "/images/wizolingo5.JPG", alt: "Wiz Ofuasia gallery 4" },
];

export default function HomeGalleryPreview() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D70E1D]">
              Media &amp; Visuals
            </p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-white">
              VIDEO &amp; GALLERY
            </h2>
          </div>
          <Link
            href="/gallery"
            className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/75 hover:text-[#D70E1D] transition-colors"
          >
            VIEW ALL
          </Link>
        </div>

        {/* Micdrop-style Full-Width Video / Stage Frame */}
        <div className="relative aspect-video w-full overflow-hidden border border-white/15 bg-[#333132]/70 flex items-center justify-center group">
          <Image
            src="/images/wiz_event.JPG"
            alt="Wiz Ofuasia Live Stage"
            fill
            className="object-cover object-[center_36%] opacity-80 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 text-center space-y-4">
            <Link
              href="/gallery"
              aria-label="Open media gallery"
              className="mx-auto inline-flex size-20 items-center justify-center rounded-full border border-white/50 bg-black/50 text-white transition-all duration-300 group-hover:scale-105 group-hover:border-[#D70E1D] group-hover:bg-[#D70E1D]"
            >
              <Play className="size-7 ml-1" />
            </Link>
          </div>
        </div>

        {/* 4-Column Photo Strip */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {GALLERY_THUMBS.map((item) => (
            <Link
              key={item.src}
              href="/gallery"
              className="group relative aspect-square overflow-hidden border border-white/10 bg-[#333132]"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover object-[center_20%] grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
