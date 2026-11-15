import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const SIGNATURE_RELEASES = [
  { number: "01", title: "Infinity", note: "Fan Favorite Classic" },
  { number: "02", title: "Owu Sa Gi", note: "Highlife Anthem" },
  { number: "03", title: "Salambala", note: "feat. Phyno" },
  { number: "04", title: "One Plus One", note: "Chart Hit" },
  { number: "05", title: "Lovinjitis", note: "feat. Teeyah" },
];

export default function BiographyDiscography() {
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D70E1D]">
              Catalog Highlights
            </p>
            <h2 className="mt-2 font-display text-[clamp(1.65rem,3.2vw,2.5rem)] font-extrabold uppercase tracking-wide text-white">
              SIGNATURE SONGS
            </h2>
          </div>

          <Link
            href="/songs"
            className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white transition-colors hover:border-[#D70E1D] hover:bg-[#D70E1D]"
          >
            <span>VIEW FULL CATALOG</span>
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>

        <div className="border-t border-white/10">
          {SIGNATURE_RELEASES.map((item) => (
            <Link
              key={item.number}
              href="/songs"
              className="group flex items-center justify-between gap-4 border-b border-white/10 py-4 px-2 transition-colors hover:bg-white/[0.03]"
            >
              <div className="flex items-center gap-5 min-w-0">
                <span className="font-display text-xs font-bold tracking-[0.22em] text-[#D70E1D]">
                  {item.number}
                </span>
                <span className="font-display text-base sm:text-lg font-extrabold uppercase tracking-wide text-white group-hover:text-[#D70E1D] transition-colors truncate">
                  {item.title}
                </span>
              </div>
              <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
                {item.note}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
