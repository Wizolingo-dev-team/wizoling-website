"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Check,
  Clock,
  Loader2,
  MapPin,
  ShieldCheck,
  Ticket,
  User,
  X,
} from "lucide-react";
import { useVerifyTicket } from "@src/hooks/eventManagement";
import { getTicketStatusConfig } from "@src/utils/ticketStatus";
import { ROUTES } from "@src/constants/routes";

function StatusHeroIcon({
  iconName,
}: {
  iconName: "check" | "checked-in" | "processing" | "cancelled";
}) {
  switch (iconName) {
    case "check":
      return <Check className="size-10 text-white" strokeWidth={3} />;
    case "checked-in":
      return <ShieldCheck className="size-10 text-white" strokeWidth={2.5} />;
    case "cancelled":
      return <X className="size-10 text-white" strokeWidth={3} />;
    case "processing":
    default:
      return <Clock className="size-10 text-white" strokeWidth={2.5} />;
  }
}

export default function TicketVerifyContent({ code }: { code: string }) {
  const decodedCode = decodeURIComponent(code).toUpperCase();
  const { data: ticket, isLoading, isError } = useVerifyTicket(decodedCode);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white px-4 py-24 text-[#111111]">
        <Loader2 className="size-10 animate-spin text-[#D70E1D]" />
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.22em] text-neutral-600">
          Verifying Ticket {decodedCode}...
        </p>
      </div>
    );
  }

  if (isError || !ticket) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-white px-4 py-24 text-[#111111]">
        <div className="max-w-md w-full border border-neutral-200 bg-white p-8 text-center shadow-lg space-y-5">
          <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#D70E1D] shadow-md">
            <X className="size-10 text-white" strokeWidth={3} />
          </div>
          <div className="space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#D70E1D]">
              Invalid Pass
            </p>
            <h1 className="font-display text-2xl font-extrabold uppercase tracking-wide text-[#111111]">
              TICKET NOT FOUND
            </h1>
            <p className="text-xs text-neutral-600">
              No Wiz Ofuasia event pass matches code{" "}
              <strong className="text-[#111111]">{decodedCode}</strong>.
            </p>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center justify-center bg-[#111111] px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-[#D70E1D] transition-colors"
          >
            Browse Events
          </Link>
        </div>
      </div>
    );
  }

  const statusConfig = getTicketStatusConfig(ticket.status);
  const eventObj = typeof ticket.event === "string" ? null : ticket.event;
  const eventTitle = eventObj?.title ?? "Wiz Ofuasia Live Event";
  const eventVenue = eventObj?.venue ?? "Official Venue";
  const eventLocation = eventObj?.location ?? "";
  const eventDate = eventObj?.dateLabel
    ? `${eventObj.dateLabel}${eventObj.time ? ` • ${eventObj.time}` : ""}`
    : eventObj?.startDate
      ? new Date(eventObj.startDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "Upcoming Date";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 py-12 px-4 sm:px-6 text-[#111111] space-y-6">
      <div className="mx-auto w-full max-w-lg border border-neutral-200 bg-white shadow-xl overflow-hidden">
        {/* Branded Top Bar */}
        <div className="bg-[#111111] px-6 py-4 text-white flex items-center justify-between border-b-4 border-[#D70E1D]">
          <div className="flex items-center gap-2.5">
            <Ticket className="size-4 text-[#D70E1D]" />
            <span className="font-display text-xs font-extrabold uppercase tracking-[0.22em]">
              Wiz Ofuasia Ticket Verification
            </span>
          </div>
        </div>

        {/* Status Hero */}
        <div className="px-6 py-8 text-center border-b border-neutral-200 space-y-4">
          <div
            className={`mx-auto flex size-20 items-center justify-center rounded-full shadow-lg ${statusConfig.bgClass}`}
          >
            <StatusHeroIcon iconName={statusConfig.iconName} />
          </div>

          <div className="space-y-1.5">
            <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-neutral-400">
              Ticket Status
            </p>
            <h1 className="font-display text-3xl font-extrabold uppercase tracking-wide text-[#111111]">
              {statusConfig.label}
            </h1>
            <p className="text-xs text-neutral-600 max-w-sm mx-auto">
              {statusConfig.description}
            </p>
          </div>

          <div className="inline-block border border-neutral-200 bg-neutral-50 px-4 py-2">
            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-neutral-400">
              Ticket Code
            </p>
            <p className="font-display text-base font-extrabold tracking-widest text-[#D70E1D]">
              {ticket.ticketCode}
            </p>
          </div>
        </div>

        {/* Event & Pass Details */}
        <div className="p-6 space-y-4 text-xs">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
              Event
            </p>
            <p className="mt-0.5 font-display text-base font-extrabold uppercase text-[#111111]">
              {eventTitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="flex items-start gap-2">
              <Calendar className="size-4 text-[#D70E1D] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-neutral-400">
                  Date &amp; Time
                </p>
                <p className="font-semibold text-[#111111]">{eventDate}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="size-4 text-[#D70E1D] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-neutral-400">
                  Venue
                </p>
                <p className="font-semibold text-[#111111]">
                  {eventVenue}
                  {eventLocation ? `, ${eventLocation}` : ""}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 border-t border-neutral-100 pt-3">
            <User className="size-4 text-[#D70E1D] shrink-0" />
            <span>
              Pass Holder:{" "}
              <strong className="text-[#111111]">{ticket.attendeeName}</strong>
            </span>
          </div>

          <div className="border-t border-neutral-100 pt-3 space-y-1.5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
              Admitted Tiers
            </p>
            {ticket.tickets.map((item) => (
              <div
                key={item.tierId}
                className="flex items-center justify-between text-xs font-semibold text-[#111111]"
              >
                <span>
                  {item.quantity}x {item.tierName}
                </span>
                <span>${item.subtotal.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Link
        href={ROUTES.DASHBOARD}
        className="inline-flex items-center justify-center gap-2 bg-[#111111] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#D70E1D]"
      >
        <ArrowLeft className="size-4" />
        <span>Go back to your dashboard</span>
      </Link>
    </div>
  );
}

