"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";
import { WIZ_VIDEOS, type VideoItem } from "@src/constants/videos";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@src/components/ui/dialog";

export default function VideosGrid() {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  return (
    <section
      id="music-videos"
      className="relative bg-[#111111] py-20 lg:py-28 border-t border-white/10"
    >
      <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D70E1D]">
              Official Visuals
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-wide text-white">
              MUSIC VIDEOS
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://www.youtube.com/@wiz_ofuasia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/30 px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-[#D70E1D] hover:bg-[#D70E1D]"
            >
              @WIZ_OFUASIA <ExternalLink className="size-3.5" />
            </a>
            <a
              href="https://www.youtube.com/@wizboyyVEVO"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/30 px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-[#D70E1D] hover:bg-[#D70E1D]"
            >
              @WIZBOYYVEVO <ExternalLink className="size-3.5" />
            </a>
          </div>
        </motion.div>

        {/* 2-Column YouTube Cover Thumbnail Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {WIZ_VIDEOS.map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group border border-white/10 bg-[#1A1A1A] transition-colors hover:border-[#D70E1D]/70"
            >
              <button
                type="button"
                onClick={() => setActiveVideo(video)}
                className="relative aspect-video w-full overflow-hidden bg-[#222222] block text-left"
              >
                <Image
                  src={video.thumbnailUrl}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-colors flex items-center justify-center">
                  <span className="inline-flex size-16 items-center justify-center rounded-full border border-white/60 bg-black/60 text-white transition-all duration-300 group-hover:scale-110 group-hover:border-[#D70E1D] group-hover:bg-[#D70E1D]">
                    <Play className="size-6 ml-0.5" />
                  </span>
                </div>
              </button>

              <div className="p-5 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D70E1D]">
                    {video.channel}
                  </p>
                  <h3 className="mt-1 truncate font-display text-base sm:text-lg font-extrabold uppercase tracking-wide text-white">
                    {video.title}
                  </h3>
                </div>
                <a
                  href={video.watchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Watch ${video.title} on YouTube`}
                  className="shrink-0 inline-flex items-center gap-1.5 border border-white/25 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80 hover:border-[#D70E1D] hover:bg-[#D70E1D] hover:text-white transition-colors"
                >
                  YouTube <ExternalLink className="size-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Player Modal */}
      <Dialog
        open={Boolean(activeVideo)}
        onOpenChange={(open) => !open && setActiveVideo(null)}
      >
        <DialogContent className="sm:max-w-[820px] p-0 overflow-hidden bg-[#111111] border-white/15">
          {activeVideo && (
            <>
              <DialogHeader className="p-5 pb-3 border-b border-white/10">
                <DialogTitle className="text-lg">
                  {activeVideo.title}
                </DialogTitle>
                <DialogDescription>{activeVideo.channel}</DialogDescription>
              </DialogHeader>
              <div className="aspect-video w-full bg-black">
                <iframe
                  title={activeVideo.title}
                  src={activeVideo.embedUrl}
                  width="100%"
                  height="100%"
                  allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

