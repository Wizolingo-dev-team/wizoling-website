"use client";

import React from "react";
import { motion } from "framer-motion";

export default function HomeHero() {
  return (
    <section className="relative flex min-h-[48vh] lg:min-h-[54vh] items-start justify-center pt-28 lg:pt-32 pb-8">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[112px] font-extrabold uppercase tracking-[0.04em] leading-none text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
            WIZ OFUASIA
          </h1>
          <p className="font-display text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-[0.28em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
            (WIZBOYY)
          </p>
        </motion.div>
      </div>
    </section>
  );
}
