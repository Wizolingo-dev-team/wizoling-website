"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Play,
  X,
} from "lucide-react";
import { LIVE_PERFORMANCE_VIDEOS } from "@src/constants/events";
import { useGetAllEvents } from "@src/hooks/eventManagement";
import Empty from "@src/components/_atoms/Empty";
import { SkeletonBox } from "@src/components/Skeletons/SkeletonBox";

export default function EventsList() {
  const [startIndex, setStartIndex] = useState(0);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const { data: events = [], isLoading } = useGetAllEvents();
  const visibleCount = 4;
  const canSlide = events.length > visibleCount;

  const handlePrev = () => {
    if (!canSlide) return;
    setStartIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const handleNext = () => {
    if (!canSlide) return;
    setStartIndex((prev) => (prev + 1) % events.length);
  };

  const displayedEvents = canSlide
    ? Array.from({ length: visibleCount }, (_, i) => {
        const index = (startIndex + i) % events.length;
        return events[index];
      }).filter((ev): ev is NonNullable<typeof ev> => Boolean(ev))
    : events;

  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-24 space-y-16 lg:space-y-24">
      {/* 1. Micdrop Event-Slider Upcoming Events Section (Dynamic from Backend) */}
      <section aria-label="Upcoming Events" className="space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/15 pb-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D70E1D]">
              Live Dates &amp; Tickets
            </p>
            <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold uppercase tracking-wide text-white">
              UPCOMING EVENTS
            </h2>
          </div>

          {events.length > 0 && (
            <div className="flex items-center">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous events"
                className="inline-flex size-11 items-center justify-center border border-white/25 bg-black/40 text-white transition-colors hover:border-[#D70E1D] hover:bg-[#D70E1D]"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next events"
                className="inline-flex size-11 items-center justify-center border-y border-r border-white/25 bg-black/40 text-white transition-colors hover:border-[#D70E1D] hover:bg-[#D70E1D]"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <SkeletonBox
                key={n}
                className="aspect-[3/4] w-full bg-white/[0.06]"
              />
            ))}
          </div>
        ) : events.length === 0 ? (
          <Empty
            title="No upcoming events announced yet"
            description="New tour dates, festival appearances, and live concert tickets will appear here once published."
            icon={<Calendar className="size-6" />}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedEvents.map((ev, idx) => {
              const flyerSrc =
                ev.flyerUrl || "/images/gallery/wiz_event-scaled.jpg";
              const formattedShowTimes =
                ev.showTimes && ev.showTimes.length > 0
                  ? ev.showTimes
                      .map((st) =>
                        [
                          st.label ? `${st.label}:` : "",
                          st.time,
                          st.timezone,
                        ]
                          .filter(Boolean)
                          .join(" ")
                      )
                      .join(" • ")
                  : ev.time;
              const subtitle = [ev.venue, formattedShowTimes || ev.dateLabel]
                .filter(Boolean)
                .join(" / ");

              return (
                <motion.div
                  key={ev._id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                >
                  <Link
                    href={`/events/${ev.slug}`}
                    className="group relative block aspect-[3/4] w-full overflow-hidden border border-white/15 bg-[#141414]"
                  >
                    <Image
                      src={flyerSrc}
                      alt={ev.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/20 to-black/75 transition-opacity group-hover:opacity-90" />

                    {/* Top-Left Title & Stage/Time (Micdrop Event-Slider card layout) */}
                    <div className="absolute top-6 left-6 right-6 space-y-1">
                      <h3 className="font-display text-lg sm:text-xl font-extrabold uppercase tracking-wide text-white transition-colors group-hover:text-[#D70E1D]">
                        {ev.title}
                      </h3>
                      <p className="text-xs font-medium text-white/80">
                        {subtitle || ev.location}
                      </p>
                    </div>

                    {/* Bottom Status Badge */}
                    <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between">
                      <span className="bg-[#D70E1D] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white">
                        {ev.status}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/85 group-hover:text-white">
                        VIEW EVENT &rarr;
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* 2. Watch Wiz Ofuasia Live Performance (YouTube Cinema Grid — Untouched) */}
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
  );
}
