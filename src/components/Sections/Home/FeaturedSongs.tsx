"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Play, Pause, Disc3 } from "lucide-react";
import { cn } from "@src/lib/utils";

const PLACEHOLDER_TRACKS = [
  { id: "01", title: "Track Title 01", duration: "03:42" },
  { id: "02", title: "Track Title 02", duration: "04:15" },
  { id: "03", title: "Track Title 03", duration: "03:58" },
  { id: "04", title: "Track Title 04", duration: "04:21" },
];

export default function HomeFeaturedSongs() {
  const [activeTrack, setActiveTrack] = useState<string | null>(null);

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
        {/* Micdrop Split: Album Cover + Vinyl Peek (Left) & New Album Out Now (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Album Cover + Peeking Vinyl */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80">
              {/* Peeking Vinyl Disc */}
              <div
                aria-hidden="true"
                className="absolute top-3 -right-12 sm:-right-16 size-[230px] sm:size-[290px] rounded-full bg-gradient-to-br from-[#2a2a2a] via-[#111111] to-[#222222] border border-white/10 shadow-2xl flex items-center justify-center"
              >
                <div className="size-[65%] rounded-full border border-white/5 flex items-center justify-center">
                  <div className="size-16 sm:size-20 rounded-full bg-[#D70E1D] flex items-center justify-center shadow-inner">
                    <div className="size-3 rounded-full bg-[#111111]" />
                  </div>
                </div>
              </div>

              {/* Square Album Cover Placeholder */}
              <div className="relative z-10 w-full h-full bg-[#333132] border border-white/15 shadow-2xl flex flex-col items-center justify-center p-6 text-center">
                <Disc3 className="size-12 text-[#D70E1D] mb-3" />
                <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-white">
                  Album Artwork
                </span>
                <span className="mt-1 text-[11px] uppercase tracking-widest text-white/50">
                  public/images/
                </span>
              </div>
            </div>
          </div>

          {/* Right: New Album Out Now + Sharp Micdrop Buttons */}
          <div className="lg:col-span-7 lg:pl-8 space-y-6 text-left">
            <div className="space-y-3">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-[0.04em] leading-[1.08] text-white">
                NEW ALBUM
                <br />
                OUT NOW
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-white/65">
                Featured release showcase. Replace with album description and streaming links once assets are ready.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/songs"
                className="inline-flex items-center justify-center border border-white/40 bg-transparent px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-all hover:border-[#D70E1D] hover:bg-[#D70E1D]"
              >
                LISTEN TO THE ALBUM
              </Link>
              <Link
                href="/songs"
                className="inline-flex items-center justify-center bg-white px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#222222] transition-all hover:bg-[#D70E1D] hover:text-white"
              >
                BUY
              </Link>
            </div>
          </div>
        </div>

        {/* Micdrop-style Tracklist */}
        <div className="mt-20 border-t border-white/10">
          {PLACEHOLDER_TRACKS.map((track) => {
            const isPlaying = activeTrack === track.id;
            return (
              <button
                key={track.id}
                type="button"
                onClick={() =>
                  setActiveTrack((prev) => (prev === track.id ? null : track.id))
                }
                className="w-full flex items-center justify-between py-4 px-2 border-b border-white/10 text-left transition-colors hover:bg-white/[0.03] group"
              >
                <div className="flex items-center gap-5">
                  <span
                    className={cn(
                      "inline-flex size-8 items-center justify-center border transition-colors",
                      isPlaying
                        ? "border-[#D70E1D] bg-[#D70E1D] text-white"
                        : "border-white/25 text-white/75 group-hover:border-[#D70E1D] group-hover:text-white"
                    )}
                  >
                    {isPlaying ? (
                      <Pause className="size-3.5" />
                    ) : (
                      <Play className="size-3.5 ml-0.5" />
                    )}
                  </span>
                  <span className="text-xs font-semibold tracking-widest text-white/50">
                    {track.id}
                  </span>
                  <span
                    className={cn(
                      "font-display text-sm sm:text-base font-bold uppercase tracking-wider transition-colors",
                      isPlaying ? "text-[#D70E1D]" : "text-white"
                    )}
                  >
                    {track.title}
                  </span>
                </div>

                <span className="text-xs tracking-widest text-white/60">
                  {track.duration}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
