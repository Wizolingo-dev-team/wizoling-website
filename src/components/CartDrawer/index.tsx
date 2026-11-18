"use client";

import React, { useEffect, useState, type ReactNode } from "react";
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
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@src/components/ui/sheet";
import Empty from "@src/components/_atoms/Empty";
import { useCart } from "@src/hooks/useCart";
import { getAuthToken } from "@src/utils/auth";
import { useToast } from "@src/hooks/useToast";

type CartDrawerProps = {
  trigger?: ReactNode;
};

export default function CartDrawer({ trigger }: CartDrawerProps) {
  const router = useRouter();
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const items = useCart((s) => s.items);
  const removeFromCart = useCart((s) => s.removeFromCart);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const getItemCount = useCart((s) => s.getItemCount);
  const getSubtotal = useCart((s) => s.getSubtotal);

  useEffect(() => {
    setMounted(true);
  }, []);

  const itemCount = mounted ? getItemCount() : 0;
  const subtotal = mounted ? getSubtotal() : 0;

  const handleCheckout = () => {
    setOpen(false);
    const token = getAuthToken();
    if (!token) {
      toast.info("Please sign in to proceed to checkout.");
      router.push("/login?redirect=/checkout");
      return;
    }
    router.push("/checkout");
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {trigger ?? (
          <button
            type="button"
            aria-label="Open shopping cart"
            className="relative inline-flex items-center justify-center p-1.5 text-white/85 transition-colors hover:text-[#D70E1D]"
          >
            <ShoppingBag className="size-4" />
            {itemCount > 0 && (
              <span className="absolute -right-1.5 -top-1 flex h-4 min-w-[16px] items-center justify-center bg-[#D70E1D] px-1 text-[9px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </button>
        )}
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex w-full flex-col justify-between border-l border-white/15 bg-[#0D0D0D] p-0 text-white sm:max-w-md"
      >
        <div className="border-b border-white/10 px-6 py-5 text-left space-y-1">
          <div className="flex items-center justify-between pr-6">
            <SheetTitle className="font-display text-lg font-extrabold uppercase tracking-wider text-white">
              Your Cart ({itemCount})
            </SheetTitle>
          </div>
          <SheetDescription className="text-xs text-white/60">
            Merchandise &amp; official digital music downloads
          </SheetDescription>
        </div>

        {/* Cart Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {!mounted || items.length === 0 ? (
            <Empty
              title="Your cart is empty"
              description="Explore official Wiz Ofuasia merchandise and studio digital downloads."
              icon={<ShoppingBag className="size-6" />}
              actionLabel="Browse Store"
              actionHref="/shop"
              className="border-white/10 bg-white/[0.02] py-12"
            />
          ) : (
            <div className="divide-y divide-white/10">
              {items.map((item) => {
                const isDigital = item.product.productType === "digital_music";
                const imageUrl =
                  item.product.attachments[0] ?? "/images/gallery/wizolingo1.jpg";

                return (
                  <div key={item.cartKey} className="flex gap-4 py-4">
                    <Link
                      href={`/shop/${item.product._id}`}
                      onClick={() => setOpen(false)}
                      className="relative size-20 shrink-0 overflow-hidden border border-white/15 bg-[#181818]"
                    >
                      <Image
                        src={imageUrl}
                        alt={item.product.productName}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </Link>

                    <div className="min-w-0 flex-1 space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/shop/${item.product._id}`}
                          onClick={() => setOpen(false)}
                          className="line-clamp-1 font-display text-xs font-bold uppercase tracking-wide text-white hover:text-[#D70E1D]"
                        >
                          {item.product.productName}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.cartKey)}
                          aria-label={`Remove ${item.product.productName}`}
                          className="text-white/45 transition-colors hover:text-[#D70E1D]"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.16em]">
                        <span className="inline-flex items-center gap-1 bg-white/10 px-2 py-0.5 font-semibold text-white/85">
                          {isDigital ? (
                            <>
                              <Disc3 className="size-2.5 text-[#D70E1D]" />
                              Digital
                            </>
                          ) : (
                            <>
                              <Package className="size-2.5 text-[#D70E1D]" />
                              Merch
                            </>
                          )}
                        </span>
                        {item.selectedSize && (
                          <span className="text-white/55">
                            Size: {item.selectedSize}
                          </span>
                        )}
                        {item.selectedColor && (
                          <span className="text-white/55">
                            Color: {item.selectedColor}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        {isDigital ? (
                          <span className="text-[10px] font-semibold uppercase tracking-widest text-white/50">
                            Instant Download
                          </span>
                        ) : (
                          <div className="inline-flex items-center border border-white/15 bg-white/[0.03]">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.cartKey, item.quantity - 1)
                              }
                              aria-label="Decrease quantity"
                              className="p-1.5 text-white/70 hover:text-white"
                            >
                              <Minus className="size-3" />
                            </button>
                            <span className="px-2.5 text-xs font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.cartKey, item.quantity + 1)
                              }
                              aria-label="Increase quantity"
                              className="p-1.5 text-white/70 hover:text-white"
                            >
                              <Plus className="size-3" />
                            </button>
                          </div>
                        )}

                        <span className="text-xs font-bold text-white">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {mounted && items.length > 0 && (
          <div className="border-t border-white/10 bg-[#121212] p-6 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="uppercase tracking-[0.2em] text-white/65 text-xs">
                Subtotal
              </span>
              <span className="font-display text-lg font-extrabold text-white">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/cart"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center border border-white/25 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-white hover:bg-white hover:text-[#111111]"
              >
                VIEW CART
              </Link>
              <button
                type="button"
                onClick={handleCheckout}
                className="inline-flex items-center justify-center gap-1.5 bg-[#D70E1D] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-[#111111]"
              >
                <span>CHECKOUT</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

