"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, Pause, Heart, Repeat2, Share2 } from "lucide-react";
import { cn } from "@src/lib/utils";

export default function HomeFeaturedPlayerCard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[540px] overflow-hidden border border-white/15 bg-[#181818] shadow-2xl">
          {/* Top Portrait Image with Overlay Title */}
          <div className="relative aspect-[4/4.3] w-full overflow-hidden bg-[#222222]">
            <Image
              src="/images/wizolingo2.JPG"
              alt="Wiz Ofuasia Featured Track"
              fill
              className="object-cover object-[center_20%] grayscale contrast-115"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/15 to-black/80" />

            {/* Top-left Micdrop Editorial Overlay */}
            <div className="relative z-10 p-6 sm:p-8 space-y-1.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D70E1D]">
                [MUSIC]
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-white">
                FEATURED SESSION
              </h3>
              <p className="text-xs text-white/75">
                by <span className="underline underline-offset-4">Wiz Ofuasia</span>{" "}
                <span className="mx-1.5 text-white/40">|</span> 2026
              </p>
            </div>
          </div>

          {/* Bottom Attached Audio Player Bar (Micdrop / Mixcloud style) */}
          <div className="border-t border-white/10 bg-[#181818] px-4 py-3.5 sm:px-5 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative size-11 shrink-0 overflow-hidden border border-white/15 bg-[#333132]">
                  <Image
                    src="/images/wiz_event.JPG"
                    alt="Track Thumbnail"
                    fill
                    className="object-cover object-[center_36%]"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setIsPlaying((prev) => !prev)}
                  aria-label={isPlaying ? "Pause track" : "Play track"}
                  className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#D70E1D]"
                >
                  {isPlaying ? (
                    <Pause className="size-4" />
                  ) : (
                    <Play className="size-4 ml-0.5" />
                  )}
                </button>
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold text-white">
                    Wiz Ofuasia — Live Session Vol. 1
                  </p>
                  <div className="mt-0.5 flex items-center gap-2 text-[11px] text-white/60">
                    <span className="truncate">by Wiz Ofuasia</span>
                    <span className="border border-white/25 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white/80">
                      FOLLOW
                    </span>
                  </div>
                </div>
              </div>

              <span className="hidden sm:inline-block shrink-0 text-[10px] font-bold uppercase tracking-[0.25em] text-white/45">
                AUDIO
              </span>
            </div>

            {/* Scrub Bar & Controls */}
            <div className="flex items-center gap-3 text-[10px] text-white/50">
              <span>00:00</span>
              <div className="relative h-1 flex-1 bg-white/15 overflow-hidden">
                <div
                  className={cn(
                    "h-full bg-[#D70E1D] transition-all duration-300",
                    isPlaying ? "w-1/3" : "w-1/12"
                  )}
                />
              </div>
              <span>-03:45</span>
              <div className="flex items-center gap-2.5 pl-1">
                <button
                  type="button"
                  aria-label="Repeat"
                  className="hover:text-white transition-colors"
                >
                  <Repeat2 className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setLiked((prev) => !prev)}
                  aria-label="Like track"
                  className={cn(
                    "transition-colors",
                    liked ? "text-[#D70E1D]" : "hover:text-white"
                  )}
                >
                  <Heart className="size-3.5" />
                </button>
                <button
                  type="button"
                  aria-label="Share track"
                  className="hover:text-white transition-colors"
                >
                  <Share2 className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

