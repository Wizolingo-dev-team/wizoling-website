"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Trash2, Disc3, Package } from "lucide-react";
import { ROUTES } from "@src/constants/routes";
import { useToggleWishlist } from "@src/hooks/wishlistManagement";
import { useCart } from "@src/hooks/useCart";
import { useToast } from "@src/hooks/useToast";
import type { Product } from "@src/types/productManagement";

type WishlistCardProps = {
  product: Product;
};

export default function WishlistCard({ product }: WishlistCardProps) {
  const { mutate: toggleWishlist, isPending } = useToggleWishlist();
  const addToCart = useCart((s) => s.addToCart);
  const toast = useToast();

  const isDigital = product.productType === "digital_music";
  const imageUrl =
    product.attachments[0] ?? "/images/gallery/wizolingo1.jpg";

  const handleAddToCart = () => {
    addToCart(product, {
      quantity: 1,
      selectedSize: product.size[0],
      selectedColor: product.color[0],
    });
    toast.success(`${product.productName} added to your cart`);
  };

  return (
    <div className="group flex flex-col border border-neutral-200 bg-white transition-colors hover:border-[#D70E1D]">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
        <Link
          href={ROUTES.PRODUCT_DETAILS(product._id)}
          className="block h-full w-full"
        >
          <Image
            src={imageUrl}
            alt={product.productName}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        <span className="absolute left-3 top-3 inline-flex items-center gap-1 bg-white/95 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[#111111] shadow-sm">
          {isDigital ? (
            <>
              <Disc3 className="size-3 text-[#D70E1D]" />
              <span>Digital</span>
            </>
          ) : (
            <>
              <Package className="size-3 text-[#D70E1D]" />
              <span>Merch</span>
            </>
          )}
        </span>

        <button
          type="button"
          disabled={isPending}
          onClick={() => toggleWishlist({ productId: product._id })}
          aria-label="Remove from wishlist"
          className="absolute right-3 top-3 inline-flex size-8 items-center justify-center border border-neutral-200 bg-white/95 text-[#111111] shadow-sm transition-colors hover:border-[#D70E1D] hover:bg-[#D70E1D] hover:text-white"
        >
          <Trash2 className="size-3.5" />
        </button>

        <button
          type="button"
          onClick={handleAddToCart}
          className="absolute inset-x-3 bottom-3 inline-flex items-center justify-center gap-2 bg-[#D70E1D] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#111111]"
        >
          <ShoppingBag className="size-3.5" />
          <span>ADD TO CART</span>
        </button>
      </div>

      <div className="flex items-center justify-between p-5">
        <Link
          href={ROUTES.PRODUCT_DETAILS(product._id)}
          className="truncate font-display text-sm font-extrabold uppercase tracking-wide text-[#111111] hover:text-[#D70E1D]"
        >
          {product.productName}
        </Link>
        <span className="font-display text-base font-extrabold text-[#D70E1D]">
          ${product.price.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

