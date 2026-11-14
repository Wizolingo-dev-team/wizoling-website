"use client";

import React, { useState, type ReactNode } from "react";
import { toast } from "sonner";
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Booking inquiry submitted.");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D70E1D]">
            Bookings &amp; Management
          </p>
          <DialogTitle>BOOK WIZ OFUASIA</DialogTitle>
          <DialogDescription>
            Submit your event, tour, or collaboration details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="booking-name"
                className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75"
              >
                Full Name
              </label>
              <input
                id="booking-name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                className="w-full border border-white/15 bg-[#333132] px-3.5 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-[#D70E1D] focus:outline-none focus:ring-1 focus:ring-[#D70E1D]"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="booking-email"
                className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75"
              >
                Email Address
              </label>
              <input
                id="booking-email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full border border-white/15 bg-[#333132] px-3.5 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-[#D70E1D] focus:outline-none focus:ring-1 focus:ring-[#D70E1D]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="booking-type"
                className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75"
              >
                Event Type
              </label>
              <select
                id="booking-type"
                name="eventType"
                className="w-full border border-white/15 bg-[#333132] px-3.5 py-2.5 text-sm text-white focus:border-[#D70E1D] focus:outline-none focus:ring-1 focus:ring-[#D70E1D]"
              >
                <option value="concert">Live Concert / Festival</option>
                <option value="private">Private / Corporate Event</option>
                <option value="collaboration">Music Collaboration</option>
                <option value="press">Press / Media</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="booking-date"
                className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75"
              >
                Preferred Date
              </label>
              <input
                id="booking-date"
                name="date"
                type="date"
                className="w-full border border-white/15 bg-[#333132] px-3.5 py-2.5 text-sm text-white focus:border-[#D70E1D] focus:outline-none focus:ring-1 focus:ring-[#D70E1D]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="booking-details"
              className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75"
            >
              Details / Venue &amp; Location
            </label>
            <textarea
              id="booking-details"
              name="details"
              rows={3}
              required
              placeholder="Share event location, venue, and inquiry details..."
              className="w-full border border-white/15 bg-[#333132] px-3.5 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-[#D70E1D] focus:outline-none focus:ring-1 focus:ring-[#D70E1D]"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="border border-white/25 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80 hover:border-white hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#D70E1D] px-7 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white hover:bg-[#B50B18] transition-colors"
            >
              Send Inquiry
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

