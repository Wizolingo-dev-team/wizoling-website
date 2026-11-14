"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  HERO_BACKGROUND_VIDEO_ID,
  HERO_BACKGROUND_VIDEO_SRC,
} from "@src/constants/videos";

export default function VideosHero() {
  const scrollToVideos = () => {
    const el = document.getElementById("music-videos");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#111111] pt-24 pb-12">
      {/* Full-Screen Muted Looping 20s MP4 Video Background (Micdrop Video-Home style) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={`https://i.ytimg.com/vi/${HERO_BACKGROUND_VIDEO_ID}/hqdefault.jpg`}
          className="h-full w-full object-cover opacity-75"
        >
          <source src={HERO_BACKGROUND_VIDEO_SRC} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[#111111]" />
      </div>

      {/* Spacer for top balance */}
      <div className="h-8" />

      {/* Bottom-Left Featured Cover + Peeking Vinyl + CTA (Micdrop Video-Home layout) */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.65, delay: 0.15 }}
        className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-10"
      >
        <div className="inline-flex flex-col items-start gap-5">
          <div className="relative h-28 w-28 sm:h-32 sm:w-32">
            {/* Peeking Vinyl */}
            <div
              aria-hidden="true"
              className="absolute top-1.5 -right-7 size-24 sm:size-28 rounded-full bg-gradient-to-br from-[#2a2a2a] via-[#111111] to-[#222222] border border-white/15 shadow-2xl flex items-center justify-center"
            >
              <div className="size-8 rounded-full bg-[#D70E1D] flex items-center justify-center">
                <div className="size-2 rounded-full bg-[#111111]" />
              </div>
            </div>
            {/* Video Cover Thumbnail */}
            <div className="relative z-10 h-full w-full overflow-hidden border border-white/25 bg-[#222222] shadow-2xl">
              <Image
                src={`https://i.ytimg.com/vi/${HERO_BACKGROUND_VIDEO_ID}/hqdefault.jpg`}
                alt="Wiz Ofuasia - More Billionaires"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={scrollToVideos}
              className="inline-flex items-center justify-center border border-white/55 bg-black/35 backdrop-blur-sm px-6 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white transition-all hover:border-[#D70E1D] hover:bg-[#D70E1D]"
            >
              WATCH MUSIC VIDEOS
            </button>
            <Link
              href="/songs"
              className="inline-flex items-center justify-center bg-[#D70E1D] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white transition-all hover:bg-[#B50B18]"
            >
              LISTEN TO SONGS
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

