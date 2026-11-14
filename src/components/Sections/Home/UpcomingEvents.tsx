"use client";

import React from "react";
import Link from "next/link";

const PLACEHOLDER_EVENTS = [
  { date: "TBA 2026", city: "Lagos, NG", venue: "Venue Name Placeholder" },
  { date: "TBA 2026", city: "London, UK", venue: "Venue Name Placeholder" },
  { date: "TBA 2026", city: "Atlanta, US", venue: "Venue Name Placeholder" },
  { date: "TBA 2026", city: "Toronto, CA", venue: "Venue Name Placeholder" },
];

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

        {/* Micdrop Events List */}
        <div className="border-t border-white/10">
          {PLACEHOLDER_EVENTS.map((event, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 sm:grid-cols-12 items-center gap-4 py-5 border-b border-white/10 transition-colors hover:bg-white/[0.03] px-2"
            >
              <div className="sm:col-span-3 font-display text-sm font-bold uppercase tracking-widest text-[#D70E1D]">
                {event.date}
              </div>
              <div className="sm:col-span-4 font-display text-base font-bold uppercase tracking-wide text-white">
                {event.city}
              </div>
              <div className="sm:col-span-3 text-xs uppercase tracking-widest text-white/65">
                {event.venue}
              </div>
              <div className="sm:col-span-2 flex sm:justify-end">
                <Link
                  href="/events"
                  className="inline-flex items-center justify-center border border-white/35 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition-all hover:border-[#D70E1D] hover:bg-[#D70E1D]"
                >
                  TICKETS
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
