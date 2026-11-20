"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Disc3,
  Package,
  Lock,
  Loader2,
  CreditCard,
} from "lucide-react";
import Breadcrumb from "@src/components/Breadcrumb";
import Empty from "@src/components/_atoms/Empty";
import CheckoutSkeleton from "@src/components/Skeletons/Checkout";
import { useCart } from "@src/hooks/useCart";
import { useGetLoggedInUser } from "@src/hooks/authManagement";
import { useCreateOrder } from "@src/hooks/orderManagement";
import { useToast } from "@src/hooks/useToast";
import { getAuthToken } from "@src/utils/auth";
import { createOrderSchema } from "@src/validations/orderManagement";
import type { Order } from "@src/types/orderManagement";

export default function CheckoutContent() {
  const router = useRouter();
  const toast = useToast();
  const [mounted, setMounted] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const items = useCart((s) => s.items);
  const appliedDiscount = useCart((s) => s.appliedDiscount);
  const hasMerch = useCart((s) => s.hasMerch);
  const getSubtotal = useCart((s) => s.getSubtotal);
  const getDiscountAmount = useCart((s) => s.getDiscountAmount);
  const getTotal = useCart((s) => s.getTotal);
  const clearCart = useCart((s) => s.clearCart);

  const { data: user } = useGetLoggedInUser();
  const { mutate: createOrder, isPending: creatingOrder } = useCreateOrder();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateRegion, setStateRegion] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  useEffect(() => {
    setMounted(true);
    const token = getAuthToken();
    if (!token) {
      toast.info("Please sign in to access checkout.");
      router.replace("/login?redirect=/checkout");
      return;
    }
    setAuthorized(true);
  }, [router, toast]);

  useEffect(() => {
    if (user) {
      setEmail((prev) => prev || user.email || "");
      setPhone((prev) => prev || user.phoneNumber || "");
      setAddress((prev) => prev || user.address || "");
    }
  }, [user]);

  const includesMerch = mounted && hasMerch();
  const subtotal = mounted ? getSubtotal() : 0;
  const discountAmount = mounted ? getDiscountAmount() : 0;
  const total = mounted ? getTotal() : 0;

  const handlePlaceOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (items.length === 0) return;

    const payloadCandidate = {
      products: items.map((item) => ({
        _id: item.product._id,
        quantity: item.quantity,
        size: item.selectedSize,
        color: item.selectedColor,
      })),
      includesMerch,
      deliveryFee: 0,
      discountCode: appliedDiscount?.discountCode,
      paymentMethod: "manual" as const,
      email: email.trim(),
      phone: includesMerch ? phone.trim() : undefined,
      address: includesMerch ? address.trim() : undefined,
      city: includesMerch ? city.trim() : undefined,
      state: includesMerch ? stateRegion.trim() : undefined,
      country: includesMerch ? country.trim() : undefined,
      postalCode: includesMerch ? postalCode.trim() : undefined,
      additionalInfo: additionalInfo.trim() || undefined,
    };

    try {
      await createOrderSchema.validate(payloadCandidate, { abortEarly: true });
      const { includesMerch: _omit, ...orderPayload } = payloadCandidate;
      void _omit;

      createOrder(orderPayload, {
        onSuccess: (res) => {
          if (res.data) {
            setConfirmedOrder(res.data);
          }
          clearCart();
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  return (
    <div className="pt-24 pb-20 sm:pt-28 lg:pt-36 bg-white text-[#111111]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 space-y-8">
        <div className="border-b border-neutral-200 pb-8 space-y-4">
          <Breadcrumb
            variant="light"
            items={[
              { label: "Home", href: "/" },
              { label: "Store", href: "/shop" },
              { label: "Cart", href: "/cart" },
              { label: "Checkout" },
            ]}
          />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D70E1D]">
              Secure Order
            </p>
            <h1 className="mt-2 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold uppercase tracking-wide text-[#111111]">
              CHECKOUT
            </h1>
          </div>
        </div>

        {!mounted || !authorized ? (
          <CheckoutSkeleton />
        ) : confirmedOrder ? (
          <div className="mx-auto max-w-2xl border border-neutral-200 bg-white p-8 sm:p-12 text-center shadow-lg space-y-6">
            <div className="mx-auto inline-flex size-16 items-center justify-center border border-emerald-600/30 bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="size-8" />
            </div>
            <div className="space-y-2">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#D70E1D]">
                Order Recorded
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-[#111111]">
                THANK YOU FOR YOUR ORDER
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600">
                Order Reference:{" "}
                <strong className="text-[#111111]">
                  #{confirmedOrder._id.slice(-8).toUpperCase()}
                </strong>
              </p>
            </div>
            <p className="text-xs leading-relaxed text-neutral-600">
              We have sent a confirmation to{" "}
              <strong className="text-[#111111]">{confirmedOrder.email}</strong>.
              PayPal online payment capture will be connected in the next phase
              to automate instant settlement and digital download unlocking.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/shop"
                className="bg-[#D70E1D] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#111111]"
              >
                CONTINUE SHOPPING
              </Link>
              <Link
                href="/"
                className="border border-neutral-300 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-[#111111] transition-colors hover:border-[#111111]"
              >
                BACK TO HOME
              </Link>
            </div>
          </div>
        ) : items.length === 0 ? (
          <Empty
            variant="light"
            title="No items to checkout"
            description="Your cart is empty. Add official merch or digital music releases before checking out."
            actionLabel="Browse Store"
            actionHref="/shop"
          />
        ) : (
          <form
            noValidate
            onSubmit={handlePlaceOrder}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
          >
            {/* Left Form (Dynamic: Shipping for Merch vs Email-only for Digital) */}
            <div className="lg:col-span-7 border border-neutral-200 bg-white p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
                <h2 className="font-display text-lg font-extrabold uppercase tracking-wider text-[#111111]">
                  {includesMerch
                    ? "BILLING & SHIPPING DETAILS"
                    : "DIGITAL DELIVERY DETAILS"}
                </h2>
                <span className="inline-flex items-center gap-1.5 bg-neutral-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#111111]">
                  {includesMerch ? (
                    <>
                      <Package className="size-3 text-[#D70E1D]" />
                      Physical + Shipping
                    </>
                  ) : (
                    <>
                      <Disc3 className="size-3 text-[#D70E1D]" />
                      Digital Only
                    </>
                  )}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label
                    htmlFor="checkout-email"
                    className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-700"
                  >
                    Email Address *
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-[#111111] placeholder:text-neutral-400 focus:border-[#D70E1D] focus:outline-none"
                  />
                </div>

                {includesMerch && (
                  <>
                    <div className="space-y-1.5">
                      <label
                        htmlFor="checkout-phone"
                        className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-700"
                      >
                        Phone Number *
                      </label>
                      <input
                        id="checkout-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 234 567 8900"
                        className="w-full border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-[#111111] placeholder:text-neutral-400 focus:border-[#D70E1D] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="checkout-country"
                        className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-700"
                      >
                        Country *
                      </label>
                      <input
                        id="checkout-country"
                        type="text"
                        required
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="United States / Nigeria / UK"
                        className="w-full border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-[#111111] placeholder:text-neutral-400 focus:border-[#D70E1D] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label
                        htmlFor="checkout-address"
                        className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-700"
                      >
                        Street Address *
                      </label>
                      <input
                        id="checkout-address"
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="House number and street name"
                        className="w-full border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-[#111111] placeholder:text-neutral-400 focus:border-[#D70E1D] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="checkout-city"
                        className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-700"
                      >
                        City *
                      </label>
                      <input
                        id="checkout-city"
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                        className="w-full border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-[#111111] placeholder:text-neutral-400 focus:border-[#D70E1D] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="checkout-state"
                        className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-700"
                      >
                        State / Province *
                      </label>
                      <input
                        id="checkout-state"
                        type="text"
                        required
                        value={stateRegion}
                        onChange={(e) => setStateRegion(e.target.value)}
                        placeholder="State"
                        className="w-full border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-[#111111] placeholder:text-neutral-400 focus:border-[#D70E1D] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label
                        htmlFor="checkout-postal"
                        className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-700"
                      >
                        Postal / ZIP Code
                      </label>
                      <input
                        id="checkout-postal"
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="Postal code"
                        className="w-full border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-[#111111] placeholder:text-neutral-400 focus:border-[#D70E1D] focus:outline-none"
                      />
                    </div>
                  </>
                )}

                <div className="space-y-1.5 sm:col-span-2">
                  <label
                    htmlFor="checkout-notes"
                    className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-700"
                  >
                    Order Notes (Optional)
                  </label>
                  <textarea
                    id="checkout-notes"
                    rows={3}
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    placeholder={
                      includesMerch
                        ? "Delivery instructions or sizing notes..."
                        : "Optional notes for your digital release order..."
                    }
                    className="w-full border border-neutral-300 bg-neutral-50 p-3 text-sm text-[#111111] placeholder:text-neutral-400 focus:border-[#D70E1D] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Right Order Summary */}
            <aside className="lg:col-span-5 border border-neutral-200 bg-white p-6 sm:p-8 space-y-6 lg:sticky lg:top-28">
              <h2 className="border-b border-neutral-200 pb-4 font-display text-lg font-extrabold uppercase tracking-wider text-[#111111]">
                YOUR ORDER
              </h2>

              <div className="divide-y divide-neutral-200">
                {items.map((item) => (
                  <div
                    key={item.cartKey}
                    className="flex items-start justify-between gap-4 py-3 text-xs"
                  >
                    <div className="min-w-0 space-y-1">
                      <p className="font-semibold text-[#111111]">
                        {item.product.productName} &times; {item.quantity}
                      </p>
                      <p className="text-[10px] uppercase tracking-wider text-neutral-500">
                        {item.product.productType === "digital_music"
                          ? "Digital Download"
                          : [item.selectedSize, item.selectedColor]
                              .filter(Boolean)
                              .join(" / ") || "Physical Merch"}
                      </p>
                    </div>
                    <span className="font-bold text-[#111111]">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2.5 border-t border-neutral-200 pt-4 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span className="uppercase tracking-[0.16em]">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {appliedDiscount && (
                  <div className="flex justify-between text-emerald-700">
                    <span className="uppercase tracking-[0.16em]">
                      Discount ({appliedDiscount.discountCode})
                    </span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-600">
                  <span className="uppercase tracking-[0.16em]">Shipping</span>
                  <span>
                    {includesMerch ? "Standard" : "Digital Delivery ($0.00)"}
                  </span>
                </div>
                <div className="flex justify-between border-t border-neutral-200 pt-3 text-sm font-bold text-[#111111]">
                  <span className="uppercase tracking-[0.2em]">Total</span>
                  <span className="font-display text-2xl font-extrabold text-[#D70E1D]">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* PayPal Phase Note */}
              <div className="border border-neutral-200 bg-neutral-50 p-4 space-y-1.5">
                <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#111111]">
                  <CreditCard className="size-3.5 text-[#D70E1D]" />
                  <span>Payment Gateway Notice</span>
                </p>
                <p className="text-[11px] leading-relaxed text-neutral-600">
                  PayPal checkout will be integrated in the next phase. Placing
                  this order reserves your items and logs your request with
                  Wizolingo Music.
                </p>
              </div>

              <button
                type="submit"
                disabled={creatingOrder}
                className="inline-flex w-full items-center justify-center gap-2 bg-[#D70E1D] px-6 py-4 text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#111111] disabled:opacity-60"
              >
                {creatingOrder ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>PLACING ORDER...</span>
                  </>
                ) : (
                  <>
                    <Lock className="size-4" />
                    <span>PLACE ORDER</span>
                  </>
                )}
              </button>
            </aside>
          </form>
        )}
      </div>
    </div>
  );
}

