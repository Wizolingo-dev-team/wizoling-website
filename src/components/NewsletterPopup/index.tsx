"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Mail, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@src/components/ui/dialog";
import {
  isNewsletterSubscribed,
  subscribeToNewsletter,
} from "@src/utils/subscribeNewsletter";
import { subscribeNewsletterSchema } from "@src/validations/newsletterManagement";

export default function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isNewsletterSubscribed()) {
      return;
    }

    const timer = window.setTimeout(() => {
      if (!isNewsletterSubscribed()) {
        setOpen(true);
      }
    }, 4500);

    return () => window.clearTimeout(timer);
  }, []);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitting(true);
    try {
      const validated = await subscribeNewsletterSchema.validate(
        { email, source: "popup" },
        { abortEarly: true }
      );
      await subscribeToNewsletter(validated.email);
      toast.success("Welcome to Wiz Ofuasia's inner circle! You're subscribed.");
      setEmail("");
      setOpen(false);
    } catch (err) {
      if (err instanceof Error && err.name === "ValidationError") {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-xl overflow-hidden border border-white/15 bg-[#141414] p-0 text-white shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-12">
          {/* Left Editorial Portrait */}
          <div className="relative hidden sm:block sm:col-span-5 bg-[#181818]">
            <Image
              src="/images/gallery/wizolingo1.jpg"
              alt="Wiz Ofuasia (Wizboyy)"
              fill
              sizes="240px"
              className="object-cover object-[center_20%] grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <span className="absolute bottom-4 left-4 bg-[#D70E1D] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.22em] text-white">
              WIZOLINGO VIP
            </span>
          </div>

          {/* Right Branded Form */}
          <div className="sm:col-span-7 p-6 sm:p-8 space-y-5">
            <DialogHeader className="space-y-2 text-left">
              <p className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.26em] text-[#D70E1D]">
                <Mail className="size-3.5" />
                <span>Official Newsletter</span>
              </p>
              <DialogTitle className="font-display text-2xl font-extrabold uppercase tracking-wide text-white">
                JOIN THE INNER CIRCLE
              </DialogTitle>
              <DialogDescription className="text-xs leading-relaxed text-white/70">
                Get first access to new Wiz Ofuasia (Wizboyy) music releases,
                exclusive tour dates, coaching sessions, and studio drops.
              </DialogDescription>
            </DialogHeader>

            <form noValidate onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                aria-label="Email address"
                className="w-full border border-white/20 bg-white/[0.04] px-4 py-3 text-xs text-white placeholder:text-white/45 focus:border-[#D70E1D] focus:outline-none"
              />
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center gap-2 bg-[#D70E1D] px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-white hover:text-[#111111] disabled:opacity-60"
              >
                <span>{submitting ? "SUBSCRIBING..." : "SUBSCRIBE NOW"}</span>
                <ArrowRight className="size-3.5" />
              </button>
            </form>

            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              className="block w-full text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45 transition-colors hover:text-white/80"
            >
              No thanks, maybe later
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
