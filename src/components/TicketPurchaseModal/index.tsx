"use client";

import React, { useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  Ticket,
  Plus,
  Minus,
  CheckCircle2,
  Loader2,
  Lock,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@src/components/ui/dialog";
import { useGetLoggedInUser } from "@src/hooks/authManagement";
import { usePurchaseTicket } from "@src/hooks/eventManagement";
import { useToast } from "@src/hooks/useToast";
import { getAuthToken } from "@src/utils/auth";
import { purchaseTicketSchema } from "@src/validations/eventManagement";
import type { EventItem, TicketOrder } from "@src/types/eventManagement";

type TicketPurchaseModalProps = {
  event: EventItem;
  trigger?: ReactNode;
};

export default function TicketPurchaseModal({
  event,
  trigger,
}: TicketPurchaseModalProps) {
  const router = useRouter();
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [attendeeName, setAttendeeName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [createdOrder, setCreatedOrder] = useState<TicketOrder | null>(null);

  const { data: user } = useGetLoggedInUser();
  const { mutate: purchaseTicket, isPending } = usePurchaseTicket();

  const activeTiers = useMemo(
    () => event.ticketTiers.filter((t) => t.isActive),
    [event.ticketTiers]
  );

  useEffect(() => {
    if (user) {
      const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();
      setAttendeeName((prev) => prev || fullName);
      setEmail((prev) => prev || user.email || "");
      setPhone((prev) => prev || user.phoneNumber || "");
    }
  }, [user]);

  useEffect(() => {
    if (activeTiers.length > 0 && Object.keys(quantities).length === 0) {
      const firstTier = activeTiers[0];
      if (firstTier) {
        setQuantities({ [firstTier._id]: 1 });
      }
    }
  }, [activeTiers, quantities]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen && !getAuthToken()) {
      toast.info("Please sign in to purchase event tickets.");
      router.push(`/login?redirect=/events/${event.slug}`);
      return;
    }
    if (!nextOpen) {
      setCreatedOrder(null);
    }
    setOpen(nextOpen);
  };

  const updateTierQty = (tierId: string, nextQty: number, maxAvail: number) => {
    setQuantities((prev) => ({
      ...prev,
      [tierId]: Math.max(0, Math.min(maxAvail, nextQty)),
    }));
  };

  const selectedTickets = useMemo(() => {
    return activeTiers
      .map((tier) => ({
        tier,
        quantity: quantities[tier._id] ?? 0,
      }))
      .filter((item) => item.quantity > 0);
  }, [activeTiers, quantities]);

  const totalAmount = useMemo(() => {
    return selectedTickets.reduce(
      (sum, item) => sum + item.tier.price * item.quantity,
      0
    );
  }, [selectedTickets]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!getAuthToken()) {
      toast.info("Please sign in to complete your ticket purchase.");
      router.push(`/login?redirect=/events/${event.slug}`);
      return;
    }

    const payloadCandidate = {
      eventId: event._id,
      tickets: selectedTickets.map((item) => ({
        tierId: item.tier._id,
        quantity: item.quantity,
      })),
      attendeeName: attendeeName.trim(),
      email: email.trim(),
      phone: phone.trim(),
    };

    try {
      const validated = await purchaseTicketSchema.validate(payloadCandidate, {
        abortEarly: true,
      });
      purchaseTicket(validated, {
        onSuccess: (res) => {
          setCreatedOrder(res.data.ticketOrder);
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  const isUnavailable =
    event.status === "SOLD OUT" || event.status === "CANCELLED";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger ?? (
          <button
            type="button"
            disabled={isUnavailable}
            className="inline-flex items-center justify-center border border-white/40 bg-transparent px-7 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:border-[#D70E1D] hover:bg-[#D70E1D] disabled:opacity-50"
          >
            {isUnavailable ? event.status : "BUY TICKETS"}
          </button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[540px] border border-white/15 bg-[#141414] text-white">
        <DialogHeader>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D70E1D]">
            Official Event Tickets
          </p>
          <DialogTitle className="font-display text-xl uppercase tracking-wide text-white">
            {event.title}
          </DialogTitle>
          <DialogDescription className="text-xs text-white/65">
            {event.venue} &mdash; {event.location}
          </DialogDescription>
        </DialogHeader>

        {createdOrder ? (
          <div className="space-y-5 py-4 text-center">
            <div className="mx-auto inline-flex size-14 items-center justify-center border border-emerald-500/40 bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="size-7" />
            </div>
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#D70E1D]">
                Ticket Reserved
              </p>
              <h3 className="font-display text-xl font-extrabold uppercase text-white">
                {createdOrder.ticketCode}
              </h3>
              <p className="text-xs text-white/70">
                Confirmation sent to{" "}
                <strong className="text-white">{createdOrder.email}</strong>
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-full bg-[#D70E1D] px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-[#111111]"
            >
              DONE
            </button>
          </div>
        ) : activeTiers.length === 0 ? (
          <div className="py-6 text-center text-xs text-white/70">
            Ticket tiers for this event have not been released yet. Please check
            back soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 pt-2">
            {/* Ticket Tiers */}
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {activeTiers.map((tier) => {
                const remaining = Math.max(
                  0,
                  tier.totalQuantity - tier.soldQuantity
                );
                const qty = quantities[tier._id] ?? 0;

                return (
                  <div
                    key={tier._id}
                    className="flex items-center justify-between gap-4 border border-white/15 bg-white/[0.03] p-3.5"
                  >
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <Ticket className="size-3.5 text-[#D70E1D]" />
                        <span className="font-display text-xs font-bold uppercase tracking-wider text-white">
                          {tier.name}
                        </span>
                      </div>
                      {tier.description && (
                        <p className="text-[11px] text-white/60">
                          {tier.description}
                        </p>
                      )}
                      <p className="text-xs font-bold text-[#D70E1D]">
                        ${tier.price.toFixed(2)}{" "}
                        <span className="text-[10px] font-normal text-white/50">
                          ({remaining} remaining)
                        </span>
                      </p>
                    </div>

                    {remaining === 0 ? (
                      <span className="bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/50">
                        Sold Out
                      </span>
                    ) : (
                      <div className="inline-flex items-center border border-white/20 bg-black/40">
                        <button
                          type="button"
                          onClick={() =>
                            updateTierQty(tier._id, qty - 1, remaining)
                          }
                          aria-label={`Decrease ${tier.name} quantity`}
                          className="p-2 text-white/75 hover:text-white"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="px-3 text-xs font-bold text-white">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateTierQty(tier._id, qty + 1, remaining)
                          }
                          aria-label={`Increase ${tier.name} quantity`}
                          className="p-2 text-white/75 hover:text-white"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Attendee Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-white/10 pt-4">
              <div className="space-y-1 sm:col-span-2">
                <label
                  htmlFor="ticket-name"
                  className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70"
                >
                  Attendee Full Name *
                </label>
                <input
                  id="ticket-name"
                  type="text"
                  required
                  value={attendeeName}
                  onChange={(e) => setAttendeeName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full border border-white/20 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder:text-white/35 focus:border-[#D70E1D] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="ticket-email"
                  className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70"
                >
                  Email Address *
                </label>
                <input
                  id="ticket-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border border-white/20 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder:text-white/35 focus:border-[#D70E1D] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="ticket-phone"
                  className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70"
                >
                  Phone Number
                </label>
                <input
                  id="ticket-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 234 567 8900"
                  className="w-full border border-white/20 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder:text-white/35 focus:border-[#D70E1D] focus:outline-none"
                />
              </div>
            </div>

            {/* Total & Submit */}
            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/75">
                Total
              </span>
              <span className="font-display text-xl font-extrabold text-[#D70E1D]">
                ${totalAmount.toFixed(2)}
              </span>
            </div>

            <button
              type="submit"
              disabled={isPending || selectedTickets.length === 0}
              className="inline-flex w-full items-center justify-center gap-2 bg-[#D70E1D] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-white hover:text-[#111111] disabled:opacity-60"
            >
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>RESERVING TICKETS...</span>
                </>
              ) : (
                <>
                  <Lock className="size-4" />
                  <span>COMPLETE TICKET ORDER</span>
                </>
              )}
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

