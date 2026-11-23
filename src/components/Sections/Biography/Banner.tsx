"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import BookingModal from "@src/components/BookingModal";

const CAREER_STATS = [
  { value: "20+", label: "Years of Excellence" },
  { value: "25+", label: "Countries Performed" },
  { value: "200M+", label: "YouTube Views" },
];

export default function BiographyBanner() {
  return (
    <section className="border-b border-white/10 pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        {/* Micdrop About-Me Split Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: Portrait Image */}
          <div className="lg:col-span-5">
            <div className="group relative aspect-[4/5] w-full overflow-hidden border border-white/15 bg-[#181818] shadow-2xl">
              <Image
                src="/images/gallery/wizolingo2.jpg"
                alt="Wiz Ofuasia (Wizboyy) — Portrait"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-[center_20%] grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between border-t border-white/20 pt-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/85">
                  Artist &bull; Producer &bull; Multi-Instrumentalist
                </span>
              </div>
            </div>
          </div>

          {/* Right: Editorial Intro */}
          <div className="lg:col-span-7 min-w-0 space-y-6">
            <div className="space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D70E1D]">
                Artist Biography
              </p>
              <h1 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-extrabold uppercase tracking-wide leading-[1.04] text-white break-words">
                WIZ OFUASIA (WIZBOYY)
              </h1>
              <p className="font-display text-base sm:text-lg font-bold uppercase tracking-[0.14em] text-white/85">
                Afrobeats. Highlife. A Legacy of Sound.
              </p>
            </div>

            <p className="text-sm sm:text-base leading-relaxed text-white/75 max-w-2xl">
              Wiz Ofuasia is an internationally acclaimed Nigerian artist,
              producer, and multi-instrumentalist whose music blends the soul of
              African Highlife with contemporary Afrobeats. With two decades of
              musical excellence, performances across 25+ countries, and a
              catalog of timeless fan favorites, Wiz continues to connect
              generations through music while exploring new dimensions of his
              artistry.
            </p>

            {/* Key Career Stats */}
            <div className="grid grid-cols-3 gap-4 border-y border-white/10 py-5 max-w-xl">
              {CAREER_STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#D70E1D]">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
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
              <Link
                href="/songs"
                className="inline-flex items-center justify-center border border-white/35 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-all hover:border-[#D70E1D] hover:bg-[#D70E1D]"
              >
                EXPLORE DISCOGRAPHY
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
