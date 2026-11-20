"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import { toJpeg, toPng } from "html-to-image";
import {
  Check,
  Clock,
  Download,
  ExternalLink,
  MapPin,
  Calendar,
  ShieldCheck,
  Ticket,
  User,
  X,
} from "lucide-react";
import { useToast } from "@src/hooks/useToast";
import { getTicketStatusConfig } from "@src/utils/ticketStatus";
import type { TicketOrder } from "@src/types/eventManagement";

function TicketStatusIcon({
  iconName,
  className = "size-3.5 text-white",
}: {
  iconName: "check" | "checked-in" | "processing" | "cancelled";
  className?: string;
}) {
  switch (iconName) {
    case "check":
      return <Check className={className} strokeWidth={3} />;
    case "checked-in":
      return <ShieldCheck className={className} strokeWidth={2.5} />;
    case "cancelled":
      return <X className={className} strokeWidth={3} />;
    case "processing":
    default:
      return <Clock className={className} strokeWidth={2.5} />;
  }
}

function buildLinearBarcodeBars(code: string): number[] {
  const bars: number[] = [];
  for (let i = 0; i < code.length; i += 1) {
    const charCode = code.charCodeAt(i);
    bars.push((charCode % 3) + 1);
    bars.push(((charCode >> 2) % 2) + 1);
    bars.push(((charCode >> 4) % 3) + 1);
  }
  return bars;
}

export default function TicketPassCard({ ticket }: { ticket: TicketOrder }) {
  const toast = useToast();
  const passRef = useRef<HTMLDivElement | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [downloadingFormat, setDownloadingFormat] = useState<
    "png" | "jpg" | null
  >(null);

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

  const statusConfig = getTicketStatusConfig(ticket.status);
  const verifyPath = `/tickets/verify/${encodeURIComponent(ticket.ticketCode)}`;

  const barcodeBars = useMemo(
    () => buildLinearBarcodeBars(ticket.ticketCode),
    [ticket.ticketCode]
  );

  useEffect(() => {
    let active = true;
    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://www.wizofuasia.com";
    const verifyUrl = `${origin}${verifyPath}`;

    QRCode.toDataURL(verifyUrl, {
      width: 240,
      margin: 1,
      color: {
        dark: "#111111",
        light: "#FFFFFF",
      },
    })
      .then((url: string) => {
        if (active) setQrDataUrl(url);
      })
      .catch(() => {
        if (active) setQrDataUrl("");
      });

    return () => {
      active = false;
    };
  }, [verifyPath]);

  const handleDownloadImage = async (format: "png" | "jpg") => {
    if (!passRef.current) return;
    setDownloadingFormat(format);
    try {
      const options = {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#FFFFFF",
      };
      const dataUrl =
        format === "png"
          ? await toPng(passRef.current, options)
          : await toJpeg(passRef.current, { ...options, quality: 0.95 });

      const link = document.createElement("a");
      link.download = `${ticket.ticketCode}.${format}`;
      link.href = dataUrl;
      link.click();
      toast.success(`Ticket downloaded as ${format.toUpperCase()}`);
    } catch {
      toast.error("Failed to download ticket image. Please try again.");
    } finally {
      setDownloadingFormat(null);
    }
  };

  const totalQty = ticket.tickets.reduce((sum, item) => sum + item.quantity, 0);
  const tierSummary = ticket.tickets
    .map((item) => `${item.quantity}x ${item.tierName}`)
    .join(", ");

  return (
    <div className="space-y-3">
      {/* Downloadable Branded Ticket Pass */}
      <div
        ref={passRef}
        className="relative overflow-hidden border border-neutral-300 bg-white text-[#111111] shadow-sm"
      >
        {/* Top Branded Header */}
        <div className="flex items-center justify-between gap-3 bg-[#111111] px-5 py-3.5 text-white border-b-4 border-[#D70E1D]">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="flex size-7 shrink-0 items-center justify-center bg-[#D70E1D] text-white">
              <Ticket className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="text-[9px] font-bold uppercase tracking-[0.26em] text-[#D70E1D]">
                Wiz Ofuasia Official
              </p>
              <p className="truncate font-display text-xs font-extrabold uppercase tracking-wider text-white">
                ADMIT {totalQty} &bull; EVENT PASS
              </p>
            </div>
          </div>

          {/* Status Pill with Icon */}
          <div
            className={`inline-flex shrink-0 items-center gap-1.5 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] ${statusConfig.bgClass} ${statusConfig.badgeTextClass}`}
          >
            <TicketStatusIcon iconName={statusConfig.iconName} />
            <span>{statusConfig.label}</span>
          </div>
        </div>

        {/* Ticket Body + Perforated Stub */}
        <div className="grid grid-cols-1 sm:grid-cols-12">
          {/* Left Event & Holder Details */}
          <div className="sm:col-span-8 p-5 space-y-4">
            <div>
              <h4 className="font-display text-base sm:text-lg font-extrabold uppercase tracking-wide text-[#111111] leading-snug">
                {eventTitle}
              </h4>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#D70E1D]">
                {tierSummary || "General Admission"}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-neutral-600">
              <div className="flex items-start gap-2">
                <Calendar className="size-3.5 text-[#D70E1D] shrink-0 mt-0.5" />
                <span className="font-medium text-[#111111]">{eventDate}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="size-3.5 text-[#D70E1D] shrink-0 mt-0.5" />
                <span className="font-medium text-[#111111]">
                  {eventVenue}
                  {eventLocation ? `, ${eventLocation}` : ""}
                </span>
              </div>
              <div className="flex items-start gap-2 sm:col-span-2">
                <User className="size-3.5 text-[#D70E1D] shrink-0 mt-0.5" />
                <span>
                  Pass Holder:{" "}
                  <strong className="text-[#111111]">
                    {ticket.attendeeName}
                  </strong>
                </span>
              </div>
            </div>

            {/* Linear Barcode + Preserved Ticket Code */}
            <div className="border-t border-neutral-200 pt-3 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-neutral-400">
                  Ticket Code
                </p>
                <p className="font-display text-sm font-extrabold tracking-widest text-[#D70E1D]">
                  {ticket.ticketCode}
                </p>
              </div>

              <div
                aria-hidden="true"
                className="flex items-stretch h-7 gap-[1.5px]"
              >
                {barcodeBars.map((w, idx) => (
                  <span
                    key={idx}
                    className={idx % 2 === 0 ? "bg-[#111111]" : "bg-transparent"}
                    style={{ width: `${w * 1.5}px` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Perforated QR Verification Stub */}
          <div className="sm:col-span-4 border-t sm:border-t-0 sm:border-l border-dashed border-neutral-300 bg-neutral-50 p-4 flex flex-col items-center justify-center text-center gap-2">
            {qrDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={qrDataUrl}
                alt={`Scan QR code to verify ${ticket.ticketCode}`}
                className="size-24 border border-neutral-200 bg-white p-1"
              />
            ) : (
              <div className="size-24 border border-neutral-200 bg-white flex items-center justify-center text-[10px] text-neutral-400">
                QR
              </div>
            )}
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-neutral-500">
              Scan to Verify Status
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons (Outside Captured Image) */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={downloadingFormat !== null}
            onClick={() => handleDownloadImage("png")}
            className="inline-flex items-center gap-1.5 bg-[#D70E1D] px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#111111] disabled:opacity-50"
          >
            <Download className="size-3.5" />
            <span>
              {downloadingFormat === "png" ? "Saving..." : "Download PNG"}
            </span>
          </button>

          <button
            type="button"
            disabled={downloadingFormat !== null}
            onClick={() => handleDownloadImage("jpg")}
            className="inline-flex items-center gap-1.5 border border-[#111111] bg-white px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#111111] transition-colors hover:bg-[#111111] hover:text-white disabled:opacity-50"
          >
            <Download className="size-3.5" />
            <span>
              {downloadingFormat === "jpg" ? "Saving..." : "Download JPG"}
            </span>
          </button>
        </div>

        <Link
          href={verifyPath}
          target="_blank"
          className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-600 hover:text-[#D70E1D]"
        >
          <span>Verify Status</span>
          <ExternalLink className="size-3" />
        </Link>
      </div>
    </div>
  );
}

