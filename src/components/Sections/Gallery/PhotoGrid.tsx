"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@src/components/ui/dialog";

type GalleryPhoto = {
  id: string;
  src: string;
  title: string;
  category: string;
};

const GALLERY_PHOTOS: GalleryPhoto[] = [
  { id: "01", src: "/images/gallery/wizolingo1.jpg", title: "Studio Portrait I", category: "Editorial" },
  { id: "02", src: "/images/gallery/wizolingo2.jpg", title: "Monochrome Session", category: "Editorial" },
  { id: "03", src: "/images/gallery/wizolingo3.jpg", title: "Classic Suit Frame", category: "Press" },
  { id: "04", src: "/images/gallery/wizolingo4.jpg", title: "Stage Spotlight", category: "Live" },
  { id: "05", src: "/images/gallery/wizolingo5.jpg", title: "Studio Portrait II", category: "Editorial" },
  { id: "06", src: "/images/gallery/wizolingo6.jpg", title: "Press Shoot", category: "Press" },
  { id: "07", src: "/images/gallery/wizolingo7.jpg", title: "Live Vibes", category: "Live" },
  { id: "08", src: "/images/gallery/wizolingo8.jpg", title: "Behind The Scenes", category: "Studio" },
  { id: "09", src: "/images/gallery/wiz_event.jpg", title: "Vinyl & Guitar Session", category: "Studio" },
  { id: "10", src: "/images/gallery/img_1548-scaled.jpg", title: "Live Performance I", category: "Tour" },
  { id: "11", src: "/images/gallery/img_1551-scaled.jpg", title: "Live Performance II", category: "Tour" },
  { id: "12", src: "/images/gallery/img_1553-scaled.jpg", title: "Live Performance III", category: "Tour" },
  { id: "13", src: "/images/gallery/wiznew-scaled.jpg", title: "New Era Shoot I", category: "Editorial" },
  { id: "14", src: "/images/gallery/wiznew1-scaled.jpg", title: "New Era Shoot II", category: "Editorial" },
  { id: "15", src: "/images/gallery/wiznew2-scaled.jpg", title: "New Era Shoot III", category: "Editorial" },
  { id: "16", src: "/images/gallery/wizboyypic.jpg", title: "Wiz Ofuasia (Wizboyy)", category: "Portrait" },
];

export default function GalleryPhotoGrid() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length
    );
  }, []);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev + 1) % GALLERY_PHOTOS.length
    );
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedIndex, handlePrev, handleNext]);

  const activePhoto =
    selectedIndex !== null ? GALLERY_PHOTOS[selectedIndex] ?? null : null;

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      {/* Micdrop 4-Columns Wide Layout */}
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {GALLERY_PHOTOS.map((photo, idx) => (
            <motion.button
              key={photo.id}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.45, delay: (idx % 4) * 0.06 }}
              aria-label={`View ${photo.title}`}
              className="group relative aspect-square w-full overflow-hidden border border-white/10 bg-[#181818] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D70E1D]"
            >
              <Image
                src={photo.src}
                alt={`Wiz Ofuasia — ${photo.title}`}
                fill
                loading={idx < 4 ? "eager" : "lazy"}
                decoding="async"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-[center_20%] grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
              />

              {/* Subtle Hover Overlay + Title (no external link or music platform icons) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <span className="absolute top-4 right-4 inline-flex size-9 items-center justify-center border border-white/30 bg-black/55 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:border-[#D70E1D] group-hover:bg-[#D70E1D]">
                <Maximize2 className="size-4" />
              </span>

              <div className="absolute inset-x-0 bottom-0 p-5 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#D70E1D]">
                  {photo.category}
                </p>
                <h2 className="mt-1 font-display text-base font-extrabold uppercase tracking-wide text-white truncate">
                  {photo.title}
                </h2>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* In-Page Lightbox Modal (does not open a new page) */}
      <Dialog
        open={selectedIndex !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedIndex(null);
        }}
      >
        <DialogContent className="max-w-4xl border border-white/15 bg-[#111111]/95 p-4 sm:p-6 text-white backdrop-blur-xl [&>button]:hidden">
          <DialogTitle className="sr-only">
            {activePhoto ? activePhoto.title : "Gallery Image"}
          </DialogTitle>

          {activePhoto && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#D70E1D]">
                    {activePhoto.category} &bull;{" "}
                    {String((selectedIndex ?? 0) + 1).padStart(2, "0")} /{" "}
                    {String(GALLERY_PHOTOS.length).padStart(2, "0")}
                  </p>
                  <h3 className="mt-0.5 truncate font-display text-lg font-extrabold uppercase tracking-wide text-white">
                    {activePhoto.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous photo"
                    className="inline-flex size-9 items-center justify-center border border-white/20 text-white transition-colors hover:border-[#D70E1D] hover:bg-[#D70E1D]"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next photo"
                    className="inline-flex size-9 items-center justify-center border border-white/20 text-white transition-colors hover:border-[#D70E1D] hover:bg-[#D70E1D]"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedIndex(null)}
                    aria-label="Close lightbox"
                    className="inline-flex size-9 items-center justify-center border border-white/20 text-white transition-colors hover:border-[#D70E1D] hover:bg-[#D70E1D]"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </div>

              <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden border border-white/10 bg-black">
                <Image
                  src={activePhoto.src}
                  alt={`Wiz Ofuasia — ${activePhoto.title}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 900px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
