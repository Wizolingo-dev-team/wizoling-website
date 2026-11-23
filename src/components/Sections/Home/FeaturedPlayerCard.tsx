"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, Pause, Heart, Repeat2, Share2, ExternalLink } from "lucide-react";
import { cn } from "@src/lib/utils";

const MORE_BILLIONAIRES_COVER =
  "https://i.ffmcdn.com/v1/ffm-delivery-1/E_-P7DRsPbDl5sFEs9AcA42RPxQpXjlj/w_1108,h_1108,c_lfill,f_jpg/link/b0f643a4b9d44101797f7fac6c2bc8fc.jpeg.img";

const MORE_BILLIONAIRES_SMART_LINK =
  "https://orcd.co/wiz_ofuasia-more_billionaires?utm_source=ig&utm_medium=social&utm_content=link_in_bio";

export default function HomeFeaturedPlayerCard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Wiz Ofuasia (Wizboyy) featuring Zoro - More Billionaires (Single)",
          url: MORE_BILLIONAIRES_SMART_LINK,
        });
        return;
      } catch {
        // fallback below
      }
    }
    window.open(MORE_BILLIONAIRES_SMART_LINK, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[540px] overflow-hidden border border-white/15 bg-[#181818] shadow-2xl">
          {/* Top Cover Image with Single Overlay */}
          <div className="relative aspect-[4/4.3] w-full overflow-hidden bg-[#222222]">
            <Image
              src={MORE_BILLIONAIRES_COVER}
              alt="Wiz Ofuasia ft. Zoro - More Billionaires"
              fill
              className="object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/15 to-black/85" />

            {/* Top-left Micdrop Editorial Overlay */}
            <div className="relative z-10 p-6 sm:p-8 space-y-1.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D70E1D]">
                [SINGLE]
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-white">
                MORE BILLIONAIRES
              </h3>
              <p className="text-xs text-white/80">
                by <span className="underline underline-offset-4">Wiz Ofuasia</span> ft. Zoro{" "}
                <span className="mx-1.5 text-white/40">|</span> Single
              </p>
            </div>

            {/* Hidden Audio/Video Embed when Playing */}
            {isPlaying && (
              <iframe
                title="Wiz Ofuasia ft. Zoro - More Billionaires"
                src="https://www.youtube-nocookie.com/embed/UnwB2NGrU1I?autoplay=1&rel=0"
                allow="autoplay; encrypted-media"
                className="sr-only"
              />
            )}
          </div>

          {/* Bottom Attached Audio Player Bar (Micdrop / Mixcloud style) */}
          <div className="border-t border-white/10 bg-[#181818] px-4 py-3.5 sm:px-5 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative size-11 shrink-0 overflow-hidden border border-white/15 bg-[#333132]">
                  <Image
                    src={MORE_BILLIONAIRES_COVER}
                    alt="Wiz Ofuasia ft. Zoro - More Billionaires Cover"
                    fill
                    className="object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setIsPlaying((prev) => !prev)}
                  aria-label={isPlaying ? "Pause More Billionaires" : "Play More Billionaires"}
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
                    More Billionaires (feat. Zoro)
                  </p>
                  <div className="mt-0.5 flex items-center gap-2 text-[11px] text-white/60">
                    <span className="truncate">by Wiz Ofuasia ft. Zoro</span>
                    <a
                      href={MORE_BILLIONAIRES_SMART_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 border border-white/25 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white/85 transition-colors hover:border-[#D70E1D] hover:bg-[#D70E1D] hover:text-white"
                    >
                      <span>STREAM</span>
                      <ExternalLink className="size-2.5" />
                    </a>
                  </div>
                </div>
              </div>

              <span className="hidden sm:inline-block shrink-0 text-[10px] font-bold uppercase tracking-[0.25em] text-white/45">
                SINGLE
              </span>
            </div>

            {/* Scrub Bar & Controls */}
            <div className="flex items-center gap-3 text-[10px] text-white/50">
              <span>{isPlaying ? "PLAYING" : "00:00"}</span>
              <div className="relative h-1 flex-1 bg-white/15 overflow-hidden">
                <div
                  className={cn(
                    "h-full bg-[#D70E1D] transition-all duration-500",
                    isPlaying ? "w-1/2 animate-pulse" : "w-1/12"
                  )}
                />
              </div>
              <span>MORE BILLIONAIRES</span>
              <div className="flex items-center gap-2.5 pl-1">
                <a
                  href={MORE_BILLIONAIRES_SMART_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open More Billionaires on streaming platforms"
                  className="hover:text-white transition-colors"
                >
                  <Repeat2 className="size-3.5" />
                </a>
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
                  onClick={handleShare}
                  aria-label="Share More Billionaires"
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
