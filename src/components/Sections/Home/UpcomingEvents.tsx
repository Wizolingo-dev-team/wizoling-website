"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { HOME_UPCOMING_TOURS } from "@src/constants/events";

export default function HomeUpcomingEvents() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D70E1D]">
              Live Shows
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-wide text-white">
              TOUR &amp; EVENTS
            </h2>
          </div>
          <Link
            href="/events"
            className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/75 hover:text-[#D70E1D] transition-colors"
          >
            ALL DATES
          </Link>
        </div>

        {/* Upcoming Wiz Ofuasia Tours (from wizofuasia.com/events) */}
        <div className="border-t border-white/10">
          {HOME_UPCOMING_TOURS.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="grid grid-cols-1 md:grid-cols-12 items-center gap-6 py-6 border-b border-white/10 transition-colors hover:bg-white/[0.03] px-2 group"
            >
              {/* Flyer Thumbnail */}
              <div className="md:col-span-2 flex justify-start">
                <Link
                  href="/events"
                  className="relative size-24 sm:size-28 shrink-0 overflow-hidden border border-white/15 bg-[#181818] shadow-lg"
                >
                  <Image
                    src={event.flyerUrl}
                    alt={`${event.title} - ${event.date}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
              </div>

              {/* Date */}
              <div className="md:col-span-3 font-display text-sm font-bold uppercase tracking-widest text-[#D70E1D]">
                {event.date}
              </div>

              {/* Event Title & Location */}
              <div className="md:col-span-5 space-y-1">
                <h3 className="font-display text-lg sm:text-xl font-extrabold uppercase tracking-wide text-white">
                  {event.title}
                </h3>
                <p className="text-xs uppercase tracking-widest text-white/65">
                  {event.location}
                </p>
              </div>

              {/* Status Badge */}
              <div className="md:col-span-2 flex md:justify-end">
                <Link
                  href="/events"
                  className="inline-flex items-center justify-center bg-[#D70E1D] px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white transition-all hover:bg-white hover:text-[#111111]"
                >
                  {event.status}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
