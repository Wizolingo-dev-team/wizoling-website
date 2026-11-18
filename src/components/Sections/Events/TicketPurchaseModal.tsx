"use client";

import React, { useEffect, useMemo, useState } from "react";
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
} from "@src/components/ui/dialog";
import { useGetLoggedInUser } from "@src/hooks/authManagement";
import { usePurchaseTicket } from "@src/hooks/eventManagement";
import { useToast } from "@src/hooks/useToast";
import { getAuthToken } from "@src/utils/auth";
import type { EventItem, TicketOrder } from "@src/types/eventManagement";

type TicketPurchaseModalProps = {
  event: EventItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function TicketPurchaseModal({
  event,
  open,
  onOpenChange,
}: TicketPurchaseModalProps) {
  const router = useRouter();
  const toast = useToast();
  const { data: user } = useGetLoggedInUser();
  const { mutate: purchaseTicket, isPending } = usePurchaseTicket();

  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [attendeeName, setAttendeeName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmedTicket, setConfirmedTicket] = useState<TicketOrder | null>(
    null
  );

  useEffect(() => {
    if (user) {
      setAttendeeName(
        (prev) =>
          prev || `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
      );
      setEmail((prev) => prev || user.email || "");
      setPhone((prev) => prev || user.phoneNumber || "");
    }
  }, [user]);

  useEffect(() => {
    if (open) {
      setConfirmedTicket(null);
      const initial: Record<string, number> = {};
      const firstActive = event.ticketTiers.find(
        (t) => t.isActive && t.totalQuantity - t.soldQuantity > 0
      );
      if (firstActive) {
        initial[firstActive._id] = 1;
      }
      setQuantities(initial);
    }
  }, [open, event.ticketTiers]);

  const activeTiers = useMemo(
    () => event.ticketTiers.filter((t) => t.isActive),
    [event.ticketTiers]
  );

  const totalAmount = useMemo(() => {
    return activeTiers.reduce((sum, tier) => {
      const qty = quantities[tier._id] ?? 0;
      return sum + tier.price * qty;
    }, 0);
  }, [activeTiers, quantities]);

  const totalSelectedCount = useMemo(() => {
    return Object.values(quantities).reduce((sum, q) => sum + q, 0);
  }, [quantities]);

  const updateTierQty = (tierId: string, nextQty: number, maxAvail: number) => {
    setQuantities((prev) => ({
      ...prev,
      [tierId]: Math.max(0, Math.min(maxAvail, nextQty)),
    }));
  };

  const handlePurchase = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!getAuthToken()) {
      onOpenChange(false);
      toast.info("Please sign in to purchase event tickets.");
      router.push(`/login?redirect=/events/${event.slug}`);
      return;
    }

    const selectedTickets = activeTiers
      .map((tier) => ({
        tierId: tier._id,
        quantity: quantities[tier._id] ?? 0,
      }))
      .filter((item) => item.quantity > 0);

    if (selectedTickets.length === 0) {
      toast.error("Please select at least one ticket.");
      return;
    }

    purchaseTicket(
      {
        eventId: event._id,
        tickets: selectedTickets,
        attendeeName: attendeeName.trim(),
        email: email.trim(),
        phone: phone.trim(),
      },
      {
        onSuccess: (res) => {
          setConfirmedTicket(res.data.ticketOrder);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl border border-white/15 bg-[#141414] text-white">
        <DialogHeader>
          <p className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#D70E1D]">
            <Ticket className="size-3.5" />
            <span>Official Event Tickets</span>
          </p>
          <DialogTitle className="font-display text-2xl font-extrabold uppercase tracking-wide text-white">
            {event.title}
          </DialogTitle>
          <DialogDescription className="text-xs text-white/65">
            {event.venue} &bull; {event.location} &bull;{" "}
            {event.dateLabel || new Date(event.startDate).toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>

        {confirmedTicket ? (
          <div className="space-y-5 py-4 text-center">
            <div className="mx-auto inline-flex size-14 items-center justify-center border border-emerald-500/40 bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="size-7" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-display text-xl font-extrabold uppercase tracking-wide text-white">
                TICKET RESERVATION CREATED
              </h3>
              <p className="text-xs text-white/70">
                Ticket Code:{" "}
                <strong className="text-[#D70E1D]">
                  {confirmedTicket.ticketCode}
                </strong>
              </p>
            </div>
            <p className="text-xs leading-relaxed text-white/65">
              A confirmation has been sent to{" "}
              <strong className="text-white">{confirmedTicket.email}</strong>.
              PayPal online settlement will be enabled in the next phase to
              finalize payment automatically.
            </p>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="w-full bg-[#D70E1D] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-white hover:text-[#111111]"
            >
              DONE
            </button>
          </div>
        ) : activeTiers.length === 0 ? (
          <div className="py-8 text-center space-y-3">
            <p className="text-sm font-semibold text-white">
              No ticket tiers are currently available for this event.
            </p>
            <p className="text-xs text-white/60">
              Check back soon or contact management for VIP/table inquiries.
            </p>
          </div>
        ) : (
          <form onSubmit={handlePurchase} className="space-y-5 pt-2">
            {/* Ticket Tiers */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {activeTiers.map((tier) => {
                const remaining = Math.max(
                  0,
                  tier.totalQuantity - tier.soldQuantity
                );
                const qty = quantities[tier._id] ?? 0;

                return (
                  <div
                    key={tier._id}
                    className="flex items-center justify-between gap-4 border border-white/15 bg-white/[0.03] p-4"
                  >
                    <div className="min-w-0 space-y-1">
                      <p className="font-display text-sm font-bold uppercase tracking-wide text-white">
                        {tier.name}
                      </p>
                      {tier.description && (
                        <p className="text-[11px] text-white/60">
                          {tier.description}
                        </p>
                      )}
                      <p className="text-xs font-bold text-[#D70E1D]">
                        ${tier.price.toFixed(2)}{" "}
                        <span className="font-normal text-white/45">
                          ({remaining} left)
                        </span>
                      </p>
                    </div>

                    {remaining === 0 ? (
                      <span className="border border-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/50">
                        SOLD OUT
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
                          <Minus className="size-3.5" />
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
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Attendee Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-white/10 pt-4">
              <input
                type="text"
                required
                value={attendeeName}
                onChange={(e) => setAttendeeName(e.target.value)}
                placeholder="Attendee Full Name *"
                className="w-full border border-white/20 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder:text-white/40 focus:border-[#D70E1D] focus:outline-none"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address *"
                className="w-full border border-white/20 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder:text-white/40 focus:border-[#D70E1D] focus:outline-none"
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number (Optional)"
                className="sm:col-span-2 w-full border border-white/20 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder:text-white/40 focus:border-[#D70E1D] focus:outline-none"
              />
            </div>

            {/* Total & Submit */}
            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/55">
                  Total ({totalSelectedCount} ticket
                  {totalSelectedCount === 1 ? "" : "s"})
                </p>
                <p className="font-display text-2xl font-extrabold text-[#D70E1D]">
                  ${totalAmount.toFixed(2)}
                </p>
              </div>

              <button
                type="submit"
                disabled={isPending || totalSelectedCount === 0}
                className="inline-flex items-center justify-center gap-2 bg-[#D70E1D] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-[#111111] disabled:opacity-60"
              >
                {isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>PROCESSING...</span>
                  </>
                ) : (
                  <>
                    <Lock className="size-3.5" />
                    <span>RESERVE TICKETS</span>
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

