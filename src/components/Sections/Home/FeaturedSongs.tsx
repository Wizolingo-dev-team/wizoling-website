"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const HIGH_VIBRATION_COVER = "/images/high_vibration_wiz_ofuasia.png";

const HIGH_VIBRATION_LINK = "https://orcd.co/wiz_ofuasia-high_vibration";

type PlatformLink = {
  id: string;
  name: string;
  href: string;
  icon: React.ReactNode;
};

const STREAMING_PLATFORMS: PlatformLink[] = [
  {
    id: "spotify",
    name: "Spotify",
    href: HIGH_VIBRATION_LINK,
    icon: (
      <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true">
        <path d="M12 1.5C6.2 1.5 1.5 6.2 1.5 12S6.2 22.5 12 22.5 22.5 17.8 22.5 12 17.8 1.5 12 1.5zm4.82 15.15a.75.75 0 0 1-1.03.25c-2.82-1.72-6.37-2.11-10.55-1.15a.75.75 0 1 1-.33-1.46c4.57-1.05 8.49-.6 11.66 1.33a.75.75 0 0 1 .25 1.03zm1.47-3.27a.94.94 0 0 1-1.29.31c-3.23-1.99-8.15-2.56-11.97-1.4a.94.94 0 1 1-.55-1.8c4.36-1.32 9.78-.68 13.5 1.6a.94.94 0 0 1 .31 1.29zm.13-3.4c-3.87-2.3-10.26-2.51-13.96-1.39a1.12 1.12 0 1 1-.65-2.15c4.24-1.29 11.3-1.04 15.76 1.6a1.12 1.12 0 0 1-1.15 1.94z" />
      </svg>
    ),
  },
  {
    id: "apple",
    name: "Apple Music",
    href: HIGH_VIBRATION_LINK,
    icon: (
      <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true">
        <path d="M17.05 3.12c-.18.02-2.01.36-3.93.75l-4.26.86a1.1 1.1 0 0 0-.86 1.08v8.86a3.48 3.48 0 0 0-1.66-.42c-1.85 0-3.34 1.35-3.34 3.01s1.49 3.01 3.34 3.01c1.82 0 3.31-1.31 3.34-2.94V8.8l6.15-1.24v5.75a3.48 3.48 0 0 0-1.66-.42c-1.85 0-3.34 1.35-3.34 3.01s1.49 3.01 3.34 3.01c1.84 0 3.34-1.35 3.34-3.01V4.19a1.08 1.08 0 0 0-1.46-1.07z" />
      </svg>
    ),
  },
  {
    id: "youtube",
    name: "YouTube",
    href: "https://youtu.be/KzcfyMPy0WA",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true">
        <path d="M21.58 7.19a2.75 2.75 0 0 0-1.94-1.95C17.93 4.78 12 4.78 12 4.78s-5.93 0-7.64.46a2.75 2.75 0 0 0-1.94 1.95A28.7 28.7 0 0 0 2 12a28.7 28.7 0 0 0 .42 4.81 2.75 2.75 0 0 0 1.94 1.95c1.71.46 7.64.46 7.64.46s5.93 0 7.64-.46a2.75 2.75 0 0 0 1.94-1.95A28.7 28.7 0 0 0 22 12a28.7 28.7 0 0 0-.42-4.81zM10 15V9l5.2 3-5.2 3z" />
      </svg>
    ),
  },
  {
    id: "tidal",
    name: "TIDAL",
    href: HIGH_VIBRATION_LINK,
    icon: (
      <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true">
        <path d="M4.5 7.5 8 11 4.5 14.5 1 11 4.5 7.5zm7.5 0L15.5 11 12 14.5 8.5 11 12 7.5zm7.5 0L23 11l-3.5 3.5L16 11l3.5-3.5zM12 15l3.5 3.5L12 22l-3.5-3.5L12 15z" />
      </svg>
    ),
  },
  {
    id: "deezer",
    name: "Deezer",
    href: HIGH_VIBRATION_LINK,
    icon: (
      <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true">
        <path d="M18.5 5h3.5v2.2h-3.5V5zm0 3.3h3.5v2.2h-3.5V8.3zm0 3.3h3.5v2.2h-3.5v-2.2zm0 3.3h3.5v2.2h-3.5v-2.2zm-4.5-6.6h3.5v2.2H14V8.3zm0 3.3h3.5v2.2H14v-2.2zm0 3.3h3.5v2.2H14v-2.2zm-4.5 0H13v2.2H9.5v-2.2zM5 14.9h3.5v2.2H5v-2.2z" />
      </svg>
    ),
  },
  {
    id: "amazon",
    name: "Amazon Music",
    href: HIGH_VIBRATION_LINK,
    icon: (
      <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true">
        <path d="M12 3a9 9 0 1 0 9 9 9.01 9.01 0 0 0-9-9zm3.95 12.78c-1.85 1.15-4.4 1.66-6.95 1.07-1.46-.34-2.75-.96-3.79-1.76-.26-.2-.04-.51.25-.35 1.38.75 3.09 1.24 4.89 1.36 1.85.13 3.81-.17 5.39-.86.4-.18.71.24.21.54zm.92-1.45c-.15-.19-.97-.09-1.35-.04-.11.01-.13-.08-.03-.16.66-.46 1.74-.33 1.87-.17.13.16-.03 1.25-.66 1.77-.1.08-.19.04-.15-.07.14-.35.46-1.14.32-1.33zM8.5 8.5h1.6v5.2H8.5V8.5zm3.1 0h1.6v5.2h-1.6V8.5zm3.1 0h1.6v5.2h-1.6V8.5z" />
      </svg>
    ),
  },
  {
    id: "soundcloud",
    name: "SoundCloud",
    href: HIGH_VIBRATION_LINK,
    icon: (
      <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true">
        <path d="M11.5 8.2v8.8h6.9a2.85 2.85 0 0 0 .3-5.68 4.45 4.45 0 0 0-7.2-3.12zM9.2 9.4v7.6h1.3V8.7a4.6 4.6 0 0 0-1.3.7zm-2.3 1.9V17h1.3v-6.4a4.2 4.2 0 0 0-1.3.7zm-2.3 1.6V17h1.3v-4.5c-.47.06-.9.2-1.3.4zm-2.3 1.4a2.3 2.3 0 0 0 0 2.7h1.3v-2.7H2.3z" />
      </svg>
    ),
  },
];

export default function HomeFeaturedSongs() {
  return (
    <section className="overflow-x-clip py-14 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
        {/* Micdrop Split: High Vibration Cover + Vinyl Peek (Left) & New Music (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
          {/* Album Cover + Peeking Vinyl */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex justify-center lg:justify-start pr-8 sm:pr-12 lg:pr-0"
          >
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
              {/* Peeking Vinyl Disc */}
              <div
                aria-hidden="true"
                className="absolute top-3 -right-8 sm:-right-12 lg:-right-16 size-[200px] sm:size-[260px] lg:size-[290px] rounded-full bg-gradient-to-br from-[#2a2a2a] via-[#111111] to-[#222222] border border-white/10 shadow-2xl flex items-center justify-center"
              >
                <div className="size-[65%] rounded-full border border-white/5 flex items-center justify-center">
                  <div className="size-14 sm:size-16 lg:size-20 rounded-full bg-[#D70E1D] flex items-center justify-center shadow-inner">
                    <div className="size-3 rounded-full bg-[#111111]" />
                  </div>
                </div>
              </div>

              {/* High Vibration Cover Artwork */}
              <div className="relative z-10 w-full h-full overflow-hidden bg-[#181818] border border-white/15 shadow-2xl">
                <Image
                  src={HIGH_VIBRATION_COVER}
                  alt="Wiz Ofuasia - High Vibration Cover"
                  fill
                  priority
                  sizes="(max-width: 640px) 224px, (max-width: 1024px) 288px, 320px"
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Right: New Music + Sharp Micdrop Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 min-w-0 lg:pl-8 space-y-6 text-left"
          >
            <div className="space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D70E1D]">
                High Vibration
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-[0.04em] leading-[1.08] text-white">
                NEW MUSIC
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-white/70">
                Stream the latest release from Wiz Ofuasia (Wizboyy) on your preferred music platform.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={HIGH_VIBRATION_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/40 bg-transparent px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-all hover:border-[#D70E1D] hover:bg-[#D70E1D]"
              >
                <span>STREAM SINGLE</span>
                <ExternalLink className="size-3.5" />
              </a>
              <Link
                href="/songs"
                className="inline-flex items-center gap-2 bg-[#D70E1D] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-[#111111]"
              >
                DISCOGRAPHY
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom Horizontal Brand Streaming Grid */}
        <div className="mt-14 sm:mt-16 lg:mt-20 border-t border-white/10 pt-10">
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-white/45 mb-6">
            Available On All Major Streaming Platforms
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
            {STREAMING_PLATFORMS.map((platform) => (
              <a
                key={platform.id}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center gap-2.5 border border-white/10 bg-[#333132]/40 backdrop-blur-sm p-4 text-center transition-all duration-300 hover:border-[#D70E1D] hover:bg-[#D70E1D]"
              >
                <div className="text-white/75 transition-colors group-hover:text-white">
                  {platform.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/80 transition-colors group-hover:text-white">
                  {platform.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
