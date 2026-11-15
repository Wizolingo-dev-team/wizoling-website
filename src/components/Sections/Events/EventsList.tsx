"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Play,
  X,
} from "lucide-react";
import {
  ALL_EVENTS,
  LIVE_PERFORMANCE_VIDEOS,
} from "@src/constants/events";
import { cn } from "@src/lib/utils";
import BookingModal from "@src/components/BookingModal";

export default function EventsList() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const total = ALL_EVENTS.length;
  const activeEvent = ALL_EVENTS[activeIndex] ?? ALL_EVENTS[0];
  if (!activeEvent) return null;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  return (
    <>
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-24 space-y-16 lg:space-y-24">
        {/* 1. Micdrop Event-Slider Hero Showcase */}
        <section
          aria-label="Event Slider"
          className="min-h-[520px] sm:min-h-[600px] lg:min-h-[700px] flex flex-col justify-center"
        >
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="font-display text-sm font-extrabold tracking-[0.2em] text-[#D70E1D]">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="h-px w-8 bg-white/25" />
              <span className="text-xs font-semibold tracking-[0.2em] text-white/50">
                {String(total).padStart(2, "0")}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous event"
                className="inline-flex size-11 items-center justify-center border border-white/25 bg-black/40 text-white transition-all hover:border-[#D70E1D] hover:bg-[#D70E1D]"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next event"
                className="inline-flex size-11 items-center justify-center border border-white/25 bg-black/40 text-white transition-all hover:border-[#D70E1D] hover:bg-[#D70E1D]"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeEvent.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center overflow-hidden border border-white/15 bg-black/45 backdrop-blur-sm p-5 sm:p-10 lg:p-14 min-h-[480px] lg:min-h-[600px] shadow-2xl"
            >
              {/* Left: Event Flyer */}
              <div className="lg:col-span-6 min-w-0">
                <div className="relative aspect-square w-full overflow-hidden border border-white/15 bg-[#181818] shadow-2xl">
                  <Image
                    src={activeEvent.flyerUrl}
                    alt={activeEvent.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                    priority
                  />
                  <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#D70E1D] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white shadow-lg">
                    {activeEvent.status}
                  </span>
                </div>
              </div>

              {/* Right: Event Details (Micdrop Event-Slider Editorial Panel) */}
              <div className="lg:col-span-6 min-w-0 space-y-5 sm:space-y-6">
                <div className="space-y-2.5 sm:space-y-3">
                  <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#D70E1D]">
                    <Calendar className="size-3.5 shrink-0" />
                    <span>{activeEvent.date}</span>
                  </div>
                  <h2 className="font-display text-[clamp(1.65rem,3.1vw,2.75rem)] font-extrabold uppercase tracking-wide leading-[1.08] text-white break-words">
                    {activeEvent.title}
                  </h2>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/70">
                    <MapPin className="size-3.5 text-[#D70E1D]" />
                    <span>
                      {activeEvent.venue} &mdash; {activeEvent.location}
                    </span>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-white/75">
                  {activeEvent.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <BookingModal
                    trigger={
                      <button
                        type="button"
                        className="inline-flex items-center justify-center bg-[#D70E1D] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-all hover:bg-white hover:text-[#111111]"
                      >
                        BOOK WIZ OFUASIA
                      </button>
                    }
                  />
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center justify-center border border-white/35 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-all hover:border-[#D70E1D] hover:bg-[#D70E1D]"
                  >
                    NEXT EVENT
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Pagination Dots */}
          <div className="mt-6 flex items-center justify-center gap-2.5">
            {ALL_EVENTS.map((ev, index) => (
              <button
                key={ev.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Select event ${ev.title}`}
                className={cn(
                  "h-1.5 transition-all duration-300",
                  index === activeIndex
                    ? "w-8 bg-[#D70E1D]"
                    : "w-3 bg-white/25 hover:bg-white/55"
                )}
              />
            ))}
          </div>
        </section>

        {/* 2. Watch Wiz Ofuasia Live Performance (YouTube Cinema Grid) */}
        <section className="space-y-8">
          <div className="border-b border-white/10 pb-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D70E1D]">
              On Stage Worldwide
            </p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-white">
              WATCH WIZ OFUASIA LIVE PERFORMANCE
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
            {LIVE_PERFORMANCE_VIDEOS.map((video, idx) => {
              const isPlaying = activeVideoId === video.youtubeId;
              return (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  className="overflow-hidden border border-white/15 bg-black/50 shadow-xl"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-[#111111] group">
                    {!isPlaying ? (
                      <>
                        <Image
                          src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
                          alt={video.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition-colors" />
                        <button
                          type="button"
                          onClick={() => setActiveVideoId(video.youtubeId)}
                          aria-label={`Play ${video.title}`}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <span className="inline-flex size-14 items-center justify-center rounded-full border border-white/60 bg-black/60 text-white backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-[#D70E1D] group-hover:bg-[#D70E1D]">
                            <Play className="size-5 ml-0.5" />
                          </span>
                        </button>
                      </>
                    ) : (
                      <>
                        <iframe
                          title={video.title}
                          src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&playsinline=1`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                          className="h-full w-full border-0"
                        />
                        <button
                          type="button"
                          onClick={() => setActiveVideoId(null)}
                          aria-label="Close live performance video"
                          className="absolute top-2.5 right-2.5 z-20 inline-flex items-center gap-1 border border-white/25 bg-[#111111]/85 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md hover:border-[#D70E1D] hover:bg-[#D70E1D]"
                        >
                          <X className="size-3" />
                          <span>CLOSE</span>
                        </button>
                      </>
                    )}
                  </div>
                  <div className="p-4 space-y-1">
                    <h3 className="font-display text-sm font-bold uppercase tracking-wide text-white">
                      {video.title}
                    </h3>
                    <p className="text-[11px] text-white/60">{video.subtitle}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
