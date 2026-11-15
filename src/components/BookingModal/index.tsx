"use client";

import React, { useState, type ReactNode } from "react";
import { Phone, Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@src/components/ui/dialog";

type BookingModalProps = {
  trigger: ReactNode;
};

export default function BookingModal({ trigger }: BookingModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D70E1D]">
            Bookings &amp; Management
          </p>
          <DialogTitle>Get in Touch</DialogTitle>
          <DialogDescription>For booking and enquires</DialogDescription>
        </DialogHeader>

        <div className="mt-3 space-y-4">
          <a
            href="tel:+18324255604"
            className="group flex items-center gap-4 border border-white/15 bg-[#333132]/70 p-4 transition-colors hover:border-[#D70E1D] hover:bg-[#D70E1D]/10"
          >
            <span className="inline-flex size-11 shrink-0 items-center justify-center border border-white/20 text-[#D70E1D] transition-colors group-hover:border-[#D70E1D] group-hover:bg-[#D70E1D] group-hover:text-white">
              <Phone className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
                Phone
              </p>
              <p className="mt-0.5 font-display text-sm sm:text-base font-bold tracking-wide text-white">
                +1 8324255604
              </p>
            </div>
          </a>

          <a
            href="mailto:wizofuasia@gmail.com"
            className="group flex items-center gap-4 border border-white/15 bg-[#333132]/70 p-4 transition-colors hover:border-[#D70E1D] hover:bg-[#D70E1D]/10"
          >
            <span className="inline-flex size-11 shrink-0 items-center justify-center border border-white/20 text-[#D70E1D] transition-colors group-hover:border-[#D70E1D] group-hover:bg-[#D70E1D] group-hover:text-white">
              <Mail className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
                Email
              </p>
              <p className="mt-0.5 truncate font-display text-sm sm:text-base font-bold tracking-wide text-white">
                wizofuasia@gmail.com
              </p>
            </div>
          </a>
        </div>

        {/* Booking form hidden for now — using direct phone & email links above
        <form onSubmit={handleSubmit} className="mt-2 space-y-4">
          ...
        </form>
        */}
      </DialogContent>
    </Dialog>
  );
}
