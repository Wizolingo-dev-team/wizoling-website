"use client";

import React from "react";
import { Heart, Bookmark } from "lucide-react";
import WishlistCard from "@src/components/Cards/WishlistCard";
import Empty from "@src/components/_atoms/Empty";
import { SkeletonBox } from "@src/components/Skeletons/SkeletonBox";
import { useGetWishlist } from "@src/hooks/wishlistManagement";

export default function WishList() {
  const { data: wishlist, isLoading } = useGetWishlist();
  const favoriteProducts = wishlist?.products ?? [];

  if (isLoading) {
    return (
      <div className="w-full space-y-8">
        <SkeletonBox className="h-14 w-56" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <SkeletonBox key={i} className="aspect-[4/5] w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      <div className="flex flex-col justify-between gap-4 border-b border-neutral-200 pb-5 sm:flex-row sm:items-end">
        <div className="space-y-1">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-[#111111]">
            My Wishlist
          </h2>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            <Bookmark className="size-3.5 text-[#D70E1D]" />
            <span>{favoriteProducts.length} Saved Items</span>
          </p>
        </div>
      </div>

      {favoriteProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favoriteProducts.map((product) => (
            <WishlistCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <Empty
          variant="light"
          title="Your wishlist is empty"
          description="Save your favorite Wiz Ofuasia merch and digital music releases to access them quickly here."
          icon={<Heart className="size-6" />}
          actionLabel="Explore Store"
          actionHref="/shop"
        />
      )}
    </div>
  );
}

