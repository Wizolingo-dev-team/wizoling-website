"use client";

import React, { useState, type ReactNode, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@src/components/ui/dialog";
import FieldError from "@src/components/_atoms/FieldError";
import { DatePicker } from "@src/components/ui/date-picker";
import {
  bookingInquirySchema,
  type BookingInquiryFields,
} from "@src/validations/bookingManagement";
import { useCreateBooking } from "@src/hooks/bookingManagement";
import { useToast } from "@src/hooks/useToast";
import type { BookingEventType } from "@src/types/bookingManagement";

type BookingModalProps = {
  trigger: ReactNode;
};

const EVENT_TYPES: { value: BookingInquiryFields["eventType"]; label: string }[] = [
  { value: "concert", label: "Concert / Live Show" },
  { value: "festival", label: "Festival Appearance" },
  { value: "private", label: "Private Event" },
  { value: "corporate", label: "Corporate Event" },
  { value: "tv-radio", label: "TV / Radio Appearance" },
  { value: "Work-with-me", label: "Work with Wiz Ofuasia" },
  { value: "other", label: "Other" },
];

const EMPTY: BookingInquiryFields = {
  fullName: "",
  email: "",
  phone: "",
  eventType: "" as BookingInquiryFields["eventType"],
  eventDate: "",
  country: "",
  message: "",
};

export default function BookingModal({ trigger }: BookingModalProps) {
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState<BookingInquiryFields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof BookingInquiryFields, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const createBooking = useCreateBooking();
  const toast = useToast();

  const set = (key: keyof BookingInquiryFields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFields((prev) => ({ ...prev, [key]: e.target.value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  /** Opens the user's email client with form data as mailto fallback */
  const openMailtoFallback = (validated: BookingInquiryFields) => {
    const subject = encodeURIComponent(
      `Booking Inquiry — ${validated.eventType.replace("-", "/")} — ${validated.fullName}`
    );
    const body = encodeURIComponent(
      [
        `Name: ${validated.fullName}`,
        `Email: ${validated.email}`,
        validated.phone ? `Phone: ${validated.phone}` : null,
        `Event Type: ${EVENT_TYPES.find((t) => t.value === validated.eventType)?.label ?? validated.eventType}`,
        validated.eventDate ? `Preferred Date: ${validated.eventDate}` : null,
        validated.country ? `Country/City: ${validated.country}` : null,
        ``,
        `Message:`,
        validated.message,
      ]
        .filter((line): line is string => line !== null)
        .join("\n")
    );
    window.location.href = `mailto:wizofuasia@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    let validated: BookingInquiryFields;
    try {
      validated = await bookingInquirySchema.validate(fields, { abortEarly: false });
    } catch (err: unknown) {
      if (err instanceof Error && "inner" in err) {
        const yupErr = err as { inner: { path: string; message: string }[] };
        const map: Partial<Record<keyof BookingInquiryFields, string>> = {};
        yupErr.inner.forEach(({ path, message }) => {
          if (path) map[path as keyof BookingInquiryFields] = message;
        });
        setErrors(map);
      }
      return;
    }

    setStatus("submitting");

    try {
      await createBooking.mutateAsync({
        fullName: validated.fullName,
        name: validated.fullName,
        email: validated.email,
        phone: validated.phone || undefined,
        phoneNumber: validated.phone || undefined,
        eventType: validated.eventType as BookingEventType,
        eventDate: validated.eventDate || undefined,
        country: validated.country || undefined,
        message: validated.message,
      });
      toast.success(
        "Booking inquiry submitted! We'll be in touch within 2–3 business days."
      );
      setStatus("success");
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : "Failed to submit booking inquiry to the server. Please try again.";
      toast.error(errorMsg);
      setStatus("idle");
    }
  };

  const handleClose = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      // Reset form when closed
      setTimeout(() => {
        setFields(EMPTY);
        setErrors({});
        setStatus("idle");
      }, 300);
    }
  };

  const inputCls =
    "w-full border border-white/15 bg-[#1a1a1a] px-3.5 py-2.5 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-[#D70E1D] focus:ring-0";
  const labelCls = "block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 mb-1.5";

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[520px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D70E1D]">
            Bookings &amp; Management
          </p>
          <DialogTitle>Booking Inquiry</DialogTitle>
          <DialogDescription>
            Fill in the form below and we&apos;ll get back to you within 2–3
            business days.
          </DialogDescription>
        </DialogHeader>

        {status === "success" ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <CheckCircle2 className="size-12 text-emerald-500" />
            <p className="font-display text-lg font-bold uppercase tracking-wide text-white">
              Inquiry Sent!
            </p>
            <p className="max-w-xs text-sm leading-relaxed text-white/65">
              Thank you for your interest. Our bookings team will review your
              inquiry and respond within 2–3 business days.
            </p>
            <button
              type="button"
              onClick={() => handleClose(false)}
              className="mt-2 bg-[#D70E1D] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#B50B18]"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 pt-2" noValidate>
            {/* Row 1: Full Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="bk-fullName" className={labelCls}>
                  Full Name <span className="text-[#D70E1D]">*</span>
                </label>
                <input
                  id="bk-fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  value={fields.fullName}
                  onChange={set("fullName")}
                  className={inputCls}
                />
                <FieldError message={errors.fullName} />
              </div>

              <div>
                <label htmlFor="bk-email" className={labelCls}>
                  Email <span className="text-[#D70E1D]">*</span>
                </label>
                <input
                  id="bk-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={fields.email}
                  onChange={set("email")}
                  className={inputCls}
                />
                <FieldError message={errors.email} />
              </div>
            </div>

            {/* Row 2: Phone + Country */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="bk-phone" className={labelCls}>
                  Phone Number
                </label>
                <input
                  id="bk-phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+1 234 567 8900"
                  value={fields.phone}
                  onChange={set("phone")}
                  className={inputCls}
                />
                <FieldError message={errors.phone} />
              </div>

              <div>
                <label htmlFor="bk-country" className={labelCls}>
                  Country / City
                </label>
                <input
                  id="bk-country"
                  type="text"
                  placeholder="e.g. London, UK"
                  value={fields.country}
                  onChange={set("country")}
                  className={inputCls}
                />
                <FieldError message={errors.country} />
              </div>
            </div>

            {/* Row 3: Event Type + Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="bk-eventType" className={labelCls}>
                  Event Type <span className="text-[#D70E1D]">*</span>
                </label>
                <select
                  id="bk-eventType"
                  value={fields.eventType}
                  onChange={set("eventType")}
                  className={`${inputCls} appearance-none`}
                >
                  <option value="" disabled>
                    Select event type
                  </option>
                  {EVENT_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
                <FieldError message={errors.eventType} />
              </div>

              <div>
                <label htmlFor="bk-eventDate" className={labelCls}>
                  Preferred Date
                </label>
                <DatePicker
                  id="bk-eventDate"
                  placeholder="Select preferred date"
                  value={fields.eventDate}
                  onChange={(dateStr) => {
                    setFields((prev) => ({ ...prev, eventDate: dateStr }));
                    if (errors.eventDate) {
                      setErrors((prev) => ({ ...prev, eventDate: undefined }));
                    }
                  }}
                  minDate={new Date()}
                />
                <FieldError message={errors.eventDate} />
              </div>
            </div>

            {/* Row 4: Message */}
            <div>
              <label htmlFor="bk-message" className={labelCls}>
                Message / Details <span className="text-[#D70E1D]">*</span>
              </label>
              <textarea
                id="bk-message"
                rows={4}
                placeholder="Tell us about your event — venue, expected audience size, performance duration, any special requirements…"
                value={fields.message}
                onChange={set("message")}
                className={`${inputCls} resize-none`}
              />
              <div className="flex items-start justify-between gap-2 mt-1">
                <FieldError message={errors.message} />
                <span className="ml-auto text-[10px] text-white/35 shrink-0">
                  {fields.message.length}/1000
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-3 pt-2 border-t border-white/10">
              <p className="text-[10px] text-white/40 leading-relaxed">
                Your booking inquiry will be submitted to our management team.
              </p>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex shrink-0 items-center gap-2 bg-[#D70E1D] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#B50B18] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="size-3.5 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    <Send className="size-3.5" />
                    Send Inquiry
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
