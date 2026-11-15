import React from "react";
import Image from "next/image";

const BIOGRAPHY_PARAGRAPHS = [
  "Wiz Ofuasia, popularly known as Wizboyy, is a Nigerian-born Afrobeats and Highlife artist, music producer, and multi-instrumentalist whose distinctive sound blends rich African melodies, infectious rhythms, and contemporary musical influences.",
  "His musical journey began in the church, where he developed his passion for music and served as a music director for many years. After graduating with a degree in Statistics from the University of Nigeria, Wiz pursued music professionally in Enugu around 2005, honing his craft in recording studios, producing for other artists, and eventually establishing himself as a recording artist.",
  "Over the years, Wiz has built an impressive catalog of songs, including fan favorites such as Infinity, Owu Sa Gi, Salambala, One Plus One, and Lovinjitis. His work as a producer and collaborator has connected him with some of Africa's notable artists, including Flavour, Phyno, Ice Prince, 9ice, Teeyah, and Toofan.",
  "His music has taken him to stages across more than 25 countries in Africa, Europe, and North America. Among his career highlights are performing at the London 2012 Olympics' River of Music concert alongside celebrated African music icons, co-creating the official theme song for the 2015 Africa Cup of Nations, and participating in UNESCO's Zero-Corona project.",
  "With a career spanning two decades, millions of records sold, and over 200 million YouTube views, Wiz continues to build on a musical legacy defined by creativity, versatility, and an enduring connection with audiences around the world.",
  "Now entering a new chapter of his musical journey, Wiz is bringing his artistry and musicianship to the forefront through an evolving live-performance experience that celebrates the richness of African music. Beyond the stage and studio, he is equally passionate about sharing his experience, nurturing creative talent, and contributing to the next generation of music makers.",
  "For Wiz, music has always been more than a career. It's a lifelong journey of expression, connection, and evolution.",
];

const COLLABORATIONS = [
  "Flavour",
  "Phyno",
  "Ice Prince",
  "9ice",
  "Teeyah",
  "Toofan",
];

const GLOBAL_MILESTONES = [
  "London 2012 Olympics' River of Music Concert",
  "Official Theme Song Co-Creator — 2015 Africa Cup of Nations",
  "UNESCO Zero-Corona Project Participant",
];

export default function BiographyStory() {
  return (
    <section className="border-b border-white/10 py-16 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Sticky Editorial Sidebar */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <div className="group relative aspect-[4/3] w-full overflow-hidden border border-white/15 bg-[#181818]">
              <Image
                src="/images/gallery/wizolingo3.jpg"
                alt="Wiz Ofuasia — Studio & Stage"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-[center_20%] grayscale transition-all duration-700 group-hover:grayscale-0"
              />
            </div>

            <div className="border border-white/10 bg-[#181818] p-6 space-y-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D70E1D]">
                  Notable Collaborations
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {COLLABORATIONS.map((artist) => (
                    <span
                      key={artist}
                      className="border border-white/15 bg-white/[0.03] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/80"
                    >
                      {artist}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/10 pt-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D70E1D]">
                  Global Milestones
                </p>
                <ul className="mt-3 space-y-2.5 text-xs leading-relaxed text-white/75">
                  {GLOBAL_MILESTONES.map((milestone) => (
                    <li key={milestone} className="flex items-start gap-2.5">
                      <span className="mt-1.5 size-1.5 shrink-0 bg-[#D70E1D]" />
                      <span>{milestone}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Full Biography Copy */}
          <div className="lg:col-span-7 min-w-0 space-y-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D70E1D]">
                The Journey
              </p>
              <h2 className="mt-2 font-display text-[clamp(1.65rem,3.2vw,2.5rem)] font-extrabold uppercase tracking-wide text-white break-words">
                THE STORY OF WIZ OFUASIA
              </h2>
            </div>

            <div className="space-y-5 text-sm sm:text-base leading-[1.85] text-white/75">
              {BIOGRAPHY_PARAGRAPHS.map((paragraph, idx) => (
                <p
                  key={idx}
                  className={
                    idx === BIOGRAPHY_PARAGRAPHS.length - 1
                      ? "border-l-2 border-[#D70E1D] pl-5 font-display text-base sm:text-lg font-bold tracking-wide text-white"
                      : undefined
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
