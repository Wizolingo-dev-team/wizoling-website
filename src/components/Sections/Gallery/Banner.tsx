import React from "react";

export default function GalleryBanner() {
  return (
    <section className="border-b border-white/10 pt-24 pb-10 sm:pt-28 sm:pb-12 lg:pt-36 lg:pb-14">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D70E1D]">
          Visual Archive
        </p>
        <h1 className="mt-2 font-display text-[clamp(2rem,5vw,3.75rem)] font-extrabold uppercase tracking-wide text-white break-words">
          GALLERY
        </h1>
      </div>
    </section>
  );
}
