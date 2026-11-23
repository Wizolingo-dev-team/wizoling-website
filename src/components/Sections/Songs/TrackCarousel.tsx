"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Disc3,
  ExternalLink,
  Pause,
  Play,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { WIZ_SONGS } from "@src/constants/songs";
import { cn } from "@src/lib/utils";

export default function SongsTrackCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const activeSong = WIZ_SONGS[selectedIndex] ?? WIZ_SONGS[0];

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-center pt-24 pb-16 lg:pt-28 lg:pb-24">
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-12 mb-10 flex flex-wrap items-end justify-between gap-4"
      >
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D70E1D]">
            Discography, Singles &amp; Albums
          </p>
          <h1 className="mt-1 font-display text-[clamp(2rem,5vw,3.75rem)] font-extrabold uppercase tracking-wide text-white break-words">
            SONGS &amp; ALBUMS
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-display text-xs font-bold tracking-[0.25em] text-white/60">
            {String(selectedIndex + 1).padStart(2, "0")} /{" "}
            {String(WIZ_SONGS.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous track"
            className="inline-flex size-11 items-center justify-center border border-white/25 text-white transition-colors hover:border-[#D70E1D] hover:bg-[#D70E1D]"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next track"
            className="inline-flex size-11 items-center justify-center border border-white/25 text-white transition-colors hover:border-[#D70E1D] hover:bg-[#D70E1D]"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </motion.div>

      {/* Micdrop 3-Column Centered Track Carousel (Enlarged) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="overflow-hidden w-full"
        ref={emblaRef}
      >
        <div className="flex items-center">
          {WIZ_SONGS.map((song, idx) => {
            const isCenter = idx === selectedIndex;
            const isPlaying = playingId === song.id;
            const isAlbum = song.releaseType === "ALBUM / EP";

            return (
              <div
                key={song.id}
                className="min-w-0 shrink-0 grow-0 basis-full md:basis-1/2 lg:basis-1/3 px-4 sm:px-6"
              >
                <div
                  className={cn(
                    "mx-auto max-w-[440px] transition-all duration-500",
                    isCenter
                      ? "opacity-100 scale-100"
                      : "opacity-45 scale-90 hover:opacity-75"
                  )}
                >
                  {/* Slide Header: Release Type Badge + Artist + Title */}
                  <div className="mb-6 text-center space-y-1.5">
                    <div className="flex items-center justify-center gap-2">
                      {isAlbum && (
                        <span className="inline-flex items-center gap-1 bg-[#D70E1D] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white">
                          <Disc3 className="size-3" />
                          ALBUM / EP
                        </span>
                      )}
                      <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/70">
                        {song.artist}
                      </p>
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-wide text-white truncate">
                      {song.title}
                    </h2>
                  </div>

                  {/* Larger Cover Image + Peeking Vinyl Disc */}
                  <div className="relative mx-auto aspect-square w-[228px] sm:w-[300px] lg:w-[350px]">
                    {/* Vinyl Disc */}
                    <div
                      aria-hidden="true"
                      className={cn(
                        "absolute top-3 size-[206px] sm:size-[276px] lg:size-[326px] rounded-full bg-gradient-to-br from-[#2a2a2a] via-[#111111] to-[#222222] border border-white/15 shadow-2xl flex items-center justify-center transition-all duration-700",
                        isCenter ? "-right-7 sm:-right-12" : "right-0",
                        isPlaying && "animate-[spin_6s_linear_infinite]"
                      )}
                    >
                      <div className="size-[62%] rounded-full border border-white/10 flex items-center justify-center">
                        <div className="size-20 sm:size-24 rounded-full bg-[#D70E1D] flex items-center justify-center">
                          <div className="size-3.5 rounded-full bg-[#111111]" />
                        </div>
                      </div>
                    </div>

                    {/* Cover Artwork */}
                    <button
                      type="button"
                      onClick={() => {
                        if (!isCenter) {
                          emblaApi?.scrollTo(idx);
                        } else {
                          setPlayingId((prev) =>
                            prev === song.id ? null : song.id
                          );
                        }
                      }}
                      className="relative z-10 block w-full h-full overflow-hidden border border-white/15 bg-[#222222] shadow-2xl group"
                    >
                      <Image
                        src={song.coverUrl}
                        alt={song.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <span
                          className={cn(
                            "inline-flex size-14 items-center justify-center rounded-full border border-white/60 bg-black/60 text-white transition-all",
                            isCenter ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                            isPlaying && "border-[#D70E1D] bg-[#D70E1D]"
                          )}
                        >
                          {isPlaying ? (
                            <Pause className="size-6" />
                          ) : (
                            <Play className="size-6 ml-0.5" />
                          )}
                        </span>
                      </div>
                    </button>
                  </div>

                  {/* Larger Micdrop Player Controls Bar */}
                  <div className="mt-7 border border-white/15 bg-[#181818]/90 backdrop-blur-sm px-5 py-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate font-display text-sm font-bold uppercase tracking-wider text-white">
                        {song.title}
                      </p>
                      <div className="flex items-center gap-3.5 shrink-0">
                        <button
                          type="button"
                          onClick={scrollPrev}
                          aria-label="Previous song"
                          className="text-white/75 hover:text-[#D70E1D] transition-colors"
                        >
                          <SkipBack className="size-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setPlayingId((prev) =>
                              prev === song.id ? null : song.id
                            )
                          }
                          aria-label={isPlaying ? "Pause" : "Play"}
                          className="text-white hover:text-[#D70E1D] transition-colors"
                        >
                          {isPlaying ? (
                            <Pause className="size-5 text-[#D70E1D]" />
                          ) : (
                            <Play className="size-5" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={scrollNext}
                          aria-label="Next song"
                          className="text-white/75 hover:text-[#D70E1D] transition-colors"
                        >
                          <SkipForward className="size-4" />
                        </button>
                      </div>
                    </div>

                    {/* Platform Links */}
                    <div className="mt-3.5 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/65">
                      {song.smartLink && (
                        <a
                          href={song.smartLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#D70E1D] hover:text-white transition-colors"
                        >
                          Smart Link <ExternalLink className="size-3" />
                        </a>
                      )}
                      <a
                        href={song.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 hover:text-[#D70E1D] transition-colors"
                      >
                        Spotify <ExternalLink className="size-3" />
                      </a>
                      <a
                        href={song.appleMusicUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 hover:text-[#D70E1D] transition-colors"
                      >
                        Apple <ExternalLink className="size-3" />
                      </a>
                      <a
                        href={song.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 hover:text-[#D70E1D] transition-colors"
                      >
                        YouTube <ExternalLink className="size-3" />
                      </a>
                      <a
                        href={song.deezerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 hover:text-[#D70E1D] transition-colors"
                      >
                        Deezer <ExternalLink className="size-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Inline Spotify Embed Player when Play is toggled */}
      {playingId && activeSong && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-8 w-full max-w-[600px] px-4"
        >
          <div className="border border-white/15 bg-[#181818] p-2">
            <iframe
              title={`${activeSong.title} Spotify Player`}
              src={activeSong.embedUrl}
              width="100%"
              height={activeSong.releaseType === "ALBUM / EP" ? "152" : "80"}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-none"
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
