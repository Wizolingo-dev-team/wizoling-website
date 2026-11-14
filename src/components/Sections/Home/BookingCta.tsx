"use client";

import React from "react";
import BookingModal from "@src/components/BookingModal";

export default function HomeBookingCta() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8 text-center">
        <div className="border border-white/10 bg-[#333132]/50 backdrop-blur-sm px-6 py-16 sm:px-12 space-y-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D70E1D]">
            Bookings &amp; Management
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-wide text-white">
            BOOK WIZ OFUASIA
          </h2>
          <p className="mx-auto max-w-lg text-sm text-white/65">
            For live performances, tours, press, and collaborations.
          </p>
          <div className="pt-2">
            <BookingModal
              trigger={
                <button
                  type="button"
                  className="inline-flex items-center justify-center bg-[#D70E1D] px-9 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-all hover:bg-[#B50B18]"
                >
                  BOOKING INQUIRY
                </button>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
