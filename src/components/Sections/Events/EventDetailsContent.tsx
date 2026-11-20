"use client";

import React from "react";
import Image from "next/image";
import { Calendar, Share2 } from "lucide-react";
import Breadcrumb from "@src/components/Breadcrumb";
import Empty from "@src/components/_atoms/Empty";
import { SkeletonBox } from "@src/components/Skeletons/SkeletonBox";
import TicketPurchaseModal from "@src/components/TicketPurchaseModal";
import { useGetEventByIdOrSlug } from "@src/hooks/eventManagement";

export default function EventDetailsContent({
  idOrSlug,
}: {
  idOrSlug: string;
}) {
  const { data: event, isLoading } = useGetEventByIdOrSlug(idOrSlug);

  if (isLoading) {
    return (
      <div className="pt-28 pb-20 mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 space-y-10">
        <SkeletonBox className="h-10 w-72 bg-white/[0.06]" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <SkeletonBox className="lg:col-span-5 aspect-[3/4] w-full bg-white/[0.06]" />
          <SkeletonBox className="lg:col-span-7 min-h-[420px] w-full bg-white/[0.06]" />
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="pt-28 pb-20 mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <Empty
          title="Event Not Found"
          description="This event may have ended or is no longer available."
          icon={<Calendar className="size-6" />}
          actionLabel="Back to Events"
          actionHref="/events"
        />
      </div>
    );
  }

  const flyerSrc = event.flyerUrl || "/images/gallery/wiz_event-scaled.jpg";
  const formattedDate =
    event.dateLabel ||
    new Date(event.startDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const fallbackMapQuery = encodeURIComponent(
    `${event.venue}, ${event.location}`
  );
  const fallbackEmbedUrl = `https://maps.google.com/maps?q=${fallbackMapQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  const rawMapInput = (event.mapEmbedUrl || "").trim();
  const extractedSrcMatch = rawMapInput.match(/src=["']([^"']+)["']/i);
  const normalizedMapInput = (extractedSrcMatch?.[1] ?? rawMapInput).trim();

  const isEmbeddableGoogleUrl =
    normalizedMapInput.includes("/maps/embed") ||
    normalizedMapInput.includes("output=embed");

  const resolvedMapSrc = isEmbeddableGoogleUrl
    ? normalizedMapInput
    : fallbackEmbedUrl;

  const externalMapLink =
    normalizedMapInput && !isEmbeddableGoogleUrl
      ? normalizedMapInput
      : `https://www.google.com/maps/search/?api=1&query=${fallbackMapQuery}`;

  const shareUrl =
    event.shareUrl ||
    (typeof window !== "undefined" ? window.location.href : "");
  const encodedShareUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(event.title);

  return (
    <div className="pt-24 pb-20 sm:pt-28 lg:pt-36">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 space-y-10">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Events", href: "/events" },
            { label: event.title },
          ]}
        />

        {/* Micdrop Event-Item Header */}
        <div className="border-b border-white/15 pb-6">
          <h1 className="font-display text-[clamp(2rem,5vw,3.75rem)] font-extrabold uppercase tracking-wide text-white">
            {event.title}
          </h1>
        </div>

        {/* Top Row: Left Flyer Portrait + Right Google Map (Micdrop Lord-Heavy layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-4">
            <div className="relative aspect-[3/4] w-full overflow-hidden border border-white/15 bg-[#141414]">
              <Image
                src={flyerSrc}
                alt={event.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="relative lg:col-span-8 min-h-[360px] lg:min-h-full overflow-hidden border border-white/15 bg-[#141414]">
            <iframe
              title={`${event.title} location map`}
              src={resolvedMapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[360px] w-full border-0 grayscale contrast-125"
              allowFullScreen
            />
            <a
              href={externalMapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3 right-3 bg-[#141414]/90 hover:bg-[#D70E1D] text-white border border-white/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors"
            >
              Open in Google Maps &rarr;
            </a>
          </div>
        </div>

        {/* Bottom Row: Left DETAILS + BUY TICKETS, Right ABOUT THE TOUR + SHARE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-4 items-start">
          {/* Left Column: DETAILS + BUY TICKETS */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="font-display text-lg font-extrabold uppercase tracking-wider text-white">
              DETAILS
            </h2>

            <dl className="space-y-3 text-xs">
              <div className="flex flex-wrap gap-1.5">
                <dt className="font-bold text-white/60">Date:</dt>
                <dd className="font-bold uppercase tracking-wider text-white">
                  {formattedDate}
                </dd>
              </div>

              {((event.showTimes && event.showTimes.length > 0) ||
                event.time) && (
                <div className="flex flex-wrap gap-1.5">
                  <dt className="font-bold text-white/60">Time:</dt>
                  <dd className="font-bold uppercase tracking-wider text-white flex flex-wrap gap-x-2 gap-y-1">
                    {event.showTimes && event.showTimes.length > 0 ? (
                      event.showTimes.map((st, idx) => (
                        <span key={st._id || idx}>
                          {st.label ? `${st.label}: ` : ""}
                          {st.time}
                          {st.timezone ? ` ${st.timezone}` : ""}
                          {idx < event.showTimes!.length - 1 ? " •" : ""}
                        </span>
                      ))
                    ) : (
                      <span>{event.time}</span>
                    )}
                  </dd>
                </div>
              )}

              <div className="flex flex-wrap gap-1.5">
                <dt className="font-bold text-white/60">Location:</dt>
                <dd className="font-bold uppercase tracking-wider text-white">
                  {event.venue} &mdash; {event.location}
                </dd>
              </div>

              {event.eventType && (
                <div className="flex flex-wrap gap-1.5">
                  <dt className="font-bold text-white/60">Event Types:</dt>
                  <dd className="font-bold uppercase tracking-wider text-white">
                    {event.eventType}
                  </dd>
                </div>
              )}

              {event.websiteUrl && (
                <div className="flex flex-wrap gap-1.5">
                  <dt className="font-bold text-white/60">Website:</dt>
                  <dd className="font-bold uppercase tracking-wider text-[#D70E1D]">
                    <a
                      href={event.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {event.websiteUrl.replace(/^https?:\/\//, "")}
                    </a>
                  </dd>
                </div>
              )}

              <div className="flex flex-wrap gap-1.5">
                <dt className="font-bold text-white/60">Organized By:</dt>
                <dd className="font-bold uppercase tracking-wider text-white">
                  {event.organizedBy || "Wizolingo Music"}
                </dd>
              </div>
            </dl>

            <div className="pt-2">
              <TicketPurchaseModal event={event} />
            </div>
          </div>

          {/* Right Column: ABOUT THE TOUR + LINEUP + SHARE */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <h2 className="font-display text-lg font-extrabold uppercase tracking-wider text-white">
                ABOUT THE TOUR
              </h2>
              <div className="space-y-4 text-sm leading-relaxed text-white/80 whitespace-pre-line">
                {event.description}
              </div>
            </div>

            {event.artists.length > 0 && (
              <div className="space-y-4 border-t border-white/10 pt-6">
                <h3 className="font-display text-sm font-extrabold uppercase tracking-wider text-white">
                  LINEUP &amp; STAGE TIMES
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {event.artists.map((artist) => {
                    const artistTimes =
                      artist.showTimes && artist.showTimes.length > 0
                        ? artist.showTimes
                        : artist.performanceTime
                        ? [
                            {
                              time: artist.performanceTime,
                              timezone: artist.timezone || "",
                              label: "",
                            },
                          ]
                        : [];
                    return (
                      <div
                        key={artist._id}
                        className="border border-white/15 bg-black/40 p-4 space-y-2.5"
                      >
                        <div className="flex items-center gap-3">
                          {artist.imageUrl ? (
                            <img
                              src={artist.imageUrl}
                              alt={artist.name}
                              className="size-12 rounded-full object-cover border border-white/20 shrink-0"
                            />
                          ) : (
                            <div className="size-12 rounded-full border border-white/15 bg-white/5 flex items-center justify-center shrink-0 font-display text-xs font-extrabold uppercase text-white/60">
                              {artist.name?.charAt(0) || "A"}
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-display text-xs font-bold uppercase tracking-wide text-white truncate">
                              {artist.name}
                            </p>
                            {artist.stage && (
                              <p className="text-[11px] font-semibold uppercase tracking-wider text-white/60 truncate">
                                {artist.stage}
                              </p>
                            )}
                          </div>
                        </div>
                        {artistTimes.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-0.5">
                            {artistTimes.map((st, idx) => (
                              <span
                                key={st._id || idx}
                                className="inline-block border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/85"
                              >
                                {st.label ? `${st.label}: ` : ""}
                                {st.time}
                                {st.timezone ? ` ${st.timezone}` : ""}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="space-y-3 border-t border-white/10 pt-6">
              <h3 className="inline-flex items-center gap-2 font-display text-sm font-extrabold uppercase tracking-wider text-white">
                <Share2 className="size-3.5 text-[#D70E1D]" />
                <span>SHARE</span>
              </h3>
              <div className="flex items-center gap-5 text-xs font-bold uppercase tracking-[0.2em] text-white/75">
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodedShareUrl}&text=${encodedTitle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[#D70E1D]"
                >
                  X / TWITTER
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedShareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[#D70E1D]"
                >
                  LINKEDIN
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[#D70E1D]"
                >
                  FACEBOOK
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
