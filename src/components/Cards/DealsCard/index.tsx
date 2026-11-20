"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Copy, Check } from "lucide-react";
import { ROUTES } from "@src/constants/routes";
import { useCart } from "@src/hooks/useCart";
import { useToast } from "@src/hooks/useToast";
import type { Product } from "@src/types/productManagement";

export type DealProductItem = Product & {
  expiryDate: string;
  discountPercentage: number;
  discountCode: string;
};

export default function DealsCard({ product }: { product: DealProductItem }) {
  const addToCart = useCart((s) => s.addToCart);
  const toast = useToast();
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const updateTimer = () => {
      const diff =
        new Date(product.expiryDate).getTime() - new Date().getTime();
      if (diff <= 0) {
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
        return;
      }
      setTimeLeft({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff / (1000 * 60 * 60)) % 24),
        m: Math.floor((diff / 1000 / 60) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [product.expiryDate]);

  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);
  const imageUrl =
    product.attachments[0] ?? "/images/gallery/wizolingo1.jpg";

  const handleCopyCode = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(product.discountCode);
      setCopied(true);
      toast.success(`Coupon code ${product.discountCode} copied!`);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="group flex flex-col border border-neutral-200 bg-white transition-colors hover:border-[#D70E1D]">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
        <span className="absolute left-3 top-3 z-10 bg-[#D70E1D] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
          -{product.discountPercentage}% OFF
        </span>

        <button
          type="button"
          onClick={handleCopyCode}
          className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 border border-neutral-200 bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#111111] shadow-sm hover:border-[#D70E1D]"
        >
          {copied ? (
            <Check className="size-3 text-emerald-600" />
          ) : (
            <Copy className="size-3 text-[#D70E1D]" />
          )}
          <span>{product.discountCode}</span>
        </button>

        <Link
          href={ROUTES.PRODUCT_DETAILS(product._id)}
          className="block h-full w-full"
        >
          <Image
            src={imageUrl}
            alt={product.productName}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        <div className="absolute inset-x-3 bottom-3 z-10 flex items-center justify-between bg-black/85 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white">
          <span>{timeLeft.d}D</span>
          <span className="text-[#D70E1D]">{timeLeft.h}H</span>
          <span>{timeLeft.m}M</span>
          <span className="text-[#D70E1D]">{timeLeft.s}S</span>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <Link
          href={ROUTES.PRODUCT_DETAILS(product._id)}
          className="block truncate font-display text-sm font-extrabold uppercase tracking-wide text-[#111111] hover:text-[#D70E1D]"
        >
          {product.productName}
        </Link>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-display text-base font-extrabold text-[#D70E1D]">
              ${discountedPrice.toFixed(2)}
            </span>
            <span className="text-xs text-neutral-400 line-through">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              addToCart(product, {
                quantity: 1,
                selectedSize: product.size[0],
                selectedColor: product.color[0],
              });
              toast.success(`${product.productName} added to cart`);
            }}
            className="inline-flex items-center gap-1.5 bg-[#111111] px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#D70E1D]"
          >
            <ShoppingBag className="size-3" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}

