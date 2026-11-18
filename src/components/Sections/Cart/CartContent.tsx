"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Disc3,
  Package,
  ArrowRight,
  Tag,
  X,
} from "lucide-react";
import Breadcrumb from "@src/components/Breadcrumb";
import Empty from "@src/components/_atoms/Empty";
import CartSkeleton from "@src/components/Skeletons/Cart";
import { useCart } from "@src/hooks/useCart";
import { useValidateDiscount } from "@src/hooks/discountManagement";
import { useToast } from "@src/hooks/useToast";
import { getAuthToken } from "@src/utils/auth";

export default function CartContent() {
  const router = useRouter();
  const toast = useToast();
  const [mounted, setMounted] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  const items = useCart((s) => s.items);
  const appliedDiscount = useCart((s) => s.appliedDiscount);
  const removeFromCart = useCart((s) => s.removeFromCart);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const clearCart = useCart((s) => s.clearCart);
  const applyDiscount = useCart((s) => s.applyDiscount);
  const removeDiscount = useCart((s) => s.removeDiscount);
  const hasMerch = useCart((s) => s.hasMerch);
  const hasDigital = useCart((s) => s.hasDigital);
  const getSubtotal = useCart((s) => s.getSubtotal);
  const getDiscountAmount = useCart((s) => s.getDiscountAmount);
  const getTotal = useCart((s) => s.getTotal);

  const { mutate: validateDiscount, isPending: validatingCoupon } =
    useValidateDiscount();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleApplyCoupon = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    if (!getAuthToken()) {
      toast.info("Please sign in to apply a discount code.");
      router.push("/login?redirect=/cart");
      return;
    }

    validateDiscount(
      { code, productId: items[0]?.product._id },
      {
        onSuccess: (res) => {
          applyDiscount({
            discountCode: res.data.discountCode,
            discountPercentage: res.data.discountPercentage,
            products: res.data.products,
          });
          setCouponCode("");
        },
      }
    );
  };

  const handleProceedToCheckout = () => {
    if (!getAuthToken()) {
      toast.info("Please sign in before proceeding to checkout.");
      router.push("/login?redirect=/checkout");
      return;
    }
    router.push("/checkout");
  };

  const subtotal = mounted ? getSubtotal() : 0;
  const discountAmount = mounted ? getDiscountAmount() : 0;
  const total = mounted ? getTotal() : 0;
  const includesMerch = mounted && hasMerch();
  const includesDigital = mounted && hasDigital();

  return (
    <div className="pt-24 pb-20 sm:pt-28 lg:pt-36 bg-white text-[#111111]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 space-y-8">
        <div className="border-b border-neutral-200 pb-8 space-y-4">
          <Breadcrumb
            variant="light"
            items={[
              { label: "Home", href: "/" },
              { label: "Store", href: "/shop" },
              { label: "Cart" },
            ]}
          />
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D70E1D]">
                Shopping Bag
              </p>
              <h1 className="mt-2 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold uppercase tracking-wide text-[#111111]">
                YOUR CART
              </h1>
            </div>
            {mounted && items.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-[#D70E1D]"
              >
                CLEAR CART
              </button>
            )}
          </div>
        </div>

        {!mounted ? (
          <CartSkeleton />
        ) : items.length === 0 ? (
          <Empty
            variant="light"
            title="Your cart is currently empty"
            description="Browse Wiz Ofuasia's official merch and studio digital music releases to add items to your cart."
            icon={<ShoppingBag className="size-6" />}
            actionLabel="Return to Store"
            actionHref="/shop"
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Cart Table */}
            <div className="lg:col-span-8 space-y-6">
              <div className="divide-y divide-neutral-200 border border-neutral-200 bg-white">
                {items.map((item) => {
                  const isDigital =
                    item.product.productType === "digital_music";
                  const imageUrl =
                    item.product.attachments[0] ??
                    "/images/gallery/wizolingo1.jpg";

                  return (
                    <div
                      key={item.cartKey}
                      className="flex flex-col sm:flex-row sm:items-center gap-5 p-5 sm:p-6"
                    >
                      <Link
                        href={`/shop/${item.product._id}`}
                        className="relative size-24 shrink-0 overflow-hidden border border-neutral-200 bg-neutral-100"
                      >
                        <Image
                          src={imageUrl}
                          alt={item.product.productName}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </Link>

                      <div className="min-w-0 flex-1 space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1 bg-neutral-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#111111]">
                            {isDigital ? (
                              <>
                                <Disc3 className="size-3 text-[#D70E1D]" />
                                Digital Download
                              </>
                            ) : (
                              <>
                                <Package className="size-3 text-[#D70E1D]" />
                                Physical Merch
                              </>
                            )}
                          </span>
                          {item.selectedSize && (
                            <span className="text-[11px] text-neutral-500">
                              Size: {item.selectedSize}
                            </span>
                          )}
                          {item.selectedColor && (
                            <span className="text-[11px] text-neutral-500">
                              Color: {item.selectedColor}
                            </span>
                          )}
                        </div>

                        <h2 className="font-display text-base font-extrabold uppercase tracking-wide text-[#111111]">
                          <Link
                            href={`/shop/${item.product._id}`}
                            className="hover:text-[#D70E1D] transition-colors"
                          >
                            {item.product.productName}
                          </Link>
                        </h2>

                        <p className="text-xs text-neutral-500">
                          Unit Price: ${item.product.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-5">
                        {isDigital ? (
                          <span className="border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                            Qty: 1
                          </span>
                        ) : (
                          <div className="inline-flex items-center border border-neutral-300 bg-neutral-50">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.cartKey, item.quantity - 1)
                              }
                              aria-label="Decrease quantity"
                              className="p-2.5 text-neutral-600 hover:text-[#111111]"
                            >
                              <Minus className="size-3.5" />
                            </button>
                            <span className="px-3 text-xs font-bold text-[#111111]">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.cartKey, item.quantity + 1)
                              }
                              aria-label="Increase quantity"
                              className="p-2.5 text-neutral-600 hover:text-[#111111]"
                            >
                              <Plus className="size-3.5" />
                            </button>
                          </div>
                        )}

                        <span className="w-20 text-right font-display text-base font-extrabold text-[#111111]">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.cartKey)}
                          aria-label={`Remove ${item.product.productName}`}
                          className="text-neutral-400 transition-colors hover:text-[#D70E1D]"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Coupon Bar */}
              <form
                onSubmit={handleApplyCoupon}
                className="flex flex-col sm:flex-row gap-3 border border-neutral-200 bg-white p-5"
              >
                <div className="relative flex-1">
                  <Tag className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon / Discount Code"
                    className="w-full border border-neutral-300 bg-neutral-50 pl-10 pr-4 py-3 text-xs uppercase tracking-wider text-[#111111] placeholder:normal-case placeholder:text-neutral-400 focus:border-[#D70E1D] focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={validatingCoupon}
                  className="border border-[#111111] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#111111] transition-colors hover:border-[#D70E1D] hover:bg-[#D70E1D] hover:text-white disabled:opacity-60"
                >
                  {validatingCoupon ? "APPLYING..." : "APPLY COUPON"}
                </button>
              </form>
            </div>

            {/* Right Cart Totals */}
            <aside className="lg:col-span-4 border border-neutral-200 bg-white p-6 sm:p-8 space-y-6 lg:sticky lg:top-28">
              <h2 className="border-b border-neutral-200 pb-4 font-display text-lg font-extrabold uppercase tracking-wider text-[#111111]">
                CART TOTALS
              </h2>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between text-neutral-600">
                  <span className="uppercase tracking-[0.16em]">Subtotal</span>
                  <span className="font-bold text-[#111111]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                {appliedDiscount && (
                  <div className="flex items-center justify-between text-emerald-700">
                    <span className="inline-flex items-center gap-1.5 uppercase tracking-[0.16em]">
                      <span>
                        Code: {appliedDiscount.discountCode} (-
                        {appliedDiscount.discountPercentage}%)
                      </span>
                      <button
                        type="button"
                        onClick={removeDiscount}
                        aria-label="Remove coupon"
                        className="text-neutral-400 hover:text-[#111111]"
                      >
                        <X className="size-3.5" />
                      </button>
                    </span>
                    <span className="font-bold">
                      -${discountAmount.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between text-neutral-600">
                  <span className="uppercase tracking-[0.16em]">Delivery</span>
                  <span className="text-right text-[#111111]">
                    {includesMerch
                      ? "Calculated at Checkout"
                      : "Instant Digital (Free)"}
                  </span>
                </div>

                {includesMerch && includesDigital && (
                  <p className="border border-neutral-200 bg-neutral-50 p-3 text-[11px] text-neutral-600">
                    Your cart includes both physical merch and digital music
                    downloads. Digital files unlock immediately after payment
                    confirmation.
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-neutral-200 pt-4">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#111111]">
                  Estimated Total
                </span>
                <span className="font-display text-2xl font-extrabold text-[#D70E1D]">
                  ${total.toFixed(2)}
                </span>
              </div>

              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="inline-flex w-full items-center justify-center gap-2 bg-[#D70E1D] px-6 py-4 text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#111111]"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="size-4" />
              </button>

              <Link
                href="/shop"
                className="block text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500 transition-colors hover:text-[#111111]"
              >
                Continue Shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

