"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, X } from "lucide-react";

const GALLERY_THUMBS = [
  { src: "/images/wizolingo2.JPG", alt: "Wiz Ofuasia gallery 1" },
  { src: "/images/wizolingo3.JPG", alt: "Wiz Ofuasia gallery 2" },
  { src: "/images/wizolingo4.JPG", alt: "Wiz Ofuasia gallery 3" },
  { src: "/images/wizolingo5.JPG", alt: "Wiz Ofuasia gallery 4" },
];

export default function HomeGalleryPreview() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

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
            href="/videos"
            className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/75 hover:text-[#D70E1D] transition-colors"
          >
            VIEW ALL
          </Link>
        </div>

        {/* Seamless Cinema Video Frame (maintains existing cover image until played) */}
        <div className="relative aspect-video w-full overflow-hidden border border-white/15 bg-[#111111] shadow-2xl group">
          {!isVideoOpen ? (
            <>
              <Image
                src="/images/wiz_event.JPG"
                alt="WIZBOYY - Gimme Ur Love (Official Video)"
                fill
                className="object-cover object-[center_36%] opacity-85 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/40" />

              <div className="relative z-10 flex h-full w-full flex-col items-center justify-center p-6">
                <button
                  type="button"
                  onClick={() => setIsVideoOpen(true)}
                  aria-label="Play WIZBOYY - Gimme Ur Love Official Video"
                  className="inline-flex size-20 items-center justify-center rounded-full border border-white/55 bg-black/50 text-white backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-[#D70E1D] group-hover:bg-[#D70E1D]"
                >
                  <Play className="size-7 ml-1" />
                </button>
              </div>
            </>
          ) : (
            <div className="relative h-full w-full bg-[#111111]">
              <iframe
                title="WIZBOYY - Gimme Ur Love (Official Video)"
                src="https://www.youtube-nocookie.com/embed/-2hUHF0Sz08?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&color=white"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="h-full w-full border-0"
              />
              {/* Subtle top vignette + close control to blend with site UI */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-black/60 to-transparent" />
              <button
                type="button"
                onClick={() => setIsVideoOpen(false)}
                aria-label="Close video player"
                className="absolute top-3 right-3 z-20 inline-flex items-center gap-1.5 border border-white/25 bg-[#111111]/85 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md transition-colors hover:border-[#D70E1D] hover:bg-[#D70E1D]"
              >
                <X className="size-3.5" />
                <span>CLOSE</span>
              </button>
            </div>
          )}
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
