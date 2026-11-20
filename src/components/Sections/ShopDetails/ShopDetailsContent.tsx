"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Heart,
  Disc3,
  Package,
  Plus,
  Minus,
  CheckCircle2,
  Star,
  Music,
  Truck,
  Download,
} from "lucide-react";
import Breadcrumb from "@src/components/Breadcrumb";
import Empty from "@src/components/_atoms/Empty";
import ShopDetailsSkeleton from "@src/components/Skeletons/ShopDetails";
import { useGetProductById } from "@src/hooks/productManagement";
import {
  useAddReview,
  useGetReviews,
} from "@src/hooks/reviewManagement";
import {
  useGetWishlist,
  useToggleWishlist,
} from "@src/hooks/wishlistManagement";
import { useCart } from "@src/hooks/useCart";
import { useToast } from "@src/hooks/useToast";
import { getAuthToken } from "@src/utils/auth";
import { addReviewSchema } from "@src/validations/reviewManagement";
import { cn } from "@src/lib/utils";

type TabKey = "description" | "details" | "reviews";

export default function ShopDetailsContent({
  productId,
}: {
  productId: string;
}) {
  const router = useRouter();
  const toast = useToast();

  const { data: product, isLoading } = useGetProductById(productId);
  const { data: reviews = [] } = useGetReviews({ productId });
  const { mutate: addReview, isPending: submittingReview } = useAddReview();
  const { data: wishlist } = useGetWishlist();
  const { mutate: toggleWishlist } = useToggleWishlist();
  const addToCart = useCart((s) => s.addToCart);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    undefined
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<TabKey>("description");

  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    if (product) {
      setSelectedSize(product.size[0]);
      setSelectedColor(product.color[0]);
      setActiveImage(0);
      setQuantity(1);
    }
  }, [product]);

  const inWishlist = useMemo(
    () => (wishlist?.products ?? []).some((p) => p._id === productId),
    [wishlist, productId]
  );

  if (isLoading) {
    return (
      <div className="pt-24 pb-20 sm:pt-28 lg:pt-36 bg-white text-[#111111]">
        <ShopDetailsSkeleton />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-28 pb-20 mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 bg-white text-[#111111]">
        <Empty
          variant="light"
          title="Product Not Found"
          description="This item may have been removed or is currently unavailable."
          actionLabel="Back to Store"
          actionHref="/shop"
        />
      </div>
    );
  }

  const isDigital = product.productType === "digital_music";
  const images =
    product.attachments.length > 0
      ? product.attachments
      : ["/images/gallery/wizolingo1.jpg"];

  const handleAddToCart = () => {
    addToCart(product, {
      quantity: isDigital ? 1 : quantity,
      selectedSize,
      selectedColor,
    });
    toast.success(`${product.productName} added to your cart`);
  };

  const handleWishlist = () => {
    if (!getAuthToken()) {
      toast.info("Please sign in to save items to your wishlist.");
      router.push(`/login?redirect=/shop/${product._id}`);
      return;
    }
    toggleWishlist({ productId: product._id });
  };

  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!getAuthToken()) {
      toast.info("Please sign in to leave a review.");
      router.push(`/login?redirect=/shop/${product._id}`);
      return;
    }
    try {
      const validated = await addReviewSchema.validate(
        { productId: product._id, rating, review: reviewText },
        { abortEarly: true }
      );
      addReview(validated, {
        onSuccess: () => {
          setReviewText("");
          setRating(5);
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
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 space-y-12">
        <Breadcrumb
          variant="light"
          items={[
            { label: "Home", href: "/" },
            { label: "Store", href: "/shop" },
            { label: product.productName },
          ]}
        />

        {/* Micdrop Product Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square w-full overflow-hidden border border-neutral-200 bg-neutral-100">
              <Image
                src={images[activeImage] ?? images[0] ?? "/images/gallery/wizolingo1.jpg"}
                alt={product.productName}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 bg-[#D70E1D] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                {isDigital ? (
                  <>
                    <Disc3 className="size-3.5" />
                    <span>Digital Release</span>
                  </>
                ) : (
                  <>
                    <Package className="size-3.5" />
                    <span>Official Merch</span>
                  </>
                )}
              </span>
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((imgUrl, idx) => (
                  <button
                    key={imgUrl + idx}
                    type="button"
                    onClick={() => setActiveImage(idx)}
                    className={cn(
                      "relative aspect-square overflow-hidden border bg-neutral-100 transition-colors",
                      idx === activeImage
                        ? "border-[#D70E1D]"
                        : "border-neutral-200 opacity-70 hover:opacity-100"
                    )}
                  >
                    <Image
                      src={imgUrl}
                      alt={`${product.productName} thumbnail ${idx + 1}`}
                      fill
                      sizes="140px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Product Info */}
          <div className="lg:col-span-6 space-y-6 border border-neutral-200 bg-white p-6 sm:p-10">
            <div className="space-y-3 border-b border-neutral-200 pb-6">
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D70E1D]">
                <span>
                  {isDigital
                    ? product.digitalReleaseType || "Digital Music"
                    : product.categories[0]?.categoryName ?? "Official Merch"}
                </span>
                {isDigital && product.artist && (
                  <>
                    <span className="text-neutral-300">&bull;</span>
                    <span className="text-neutral-600">{product.artist}</span>
                  </>
                )}
              </div>

              <h1 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-wide text-[#111111]">
                {product.productName}
              </h1>

              <p className="font-display text-2xl font-extrabold text-[#D70E1D]">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <p className="text-sm leading-relaxed text-neutral-700">
              {product.description}
            </p>

            {/* Dynamic Variant / Format Controls */}
            {isDigital ? (
              <div className="space-y-4 border-y border-neutral-200 py-5">
                <div className="flex flex-wrap gap-4 text-xs text-neutral-700">
                  <span className="inline-flex items-center gap-2 border border-neutral-200 bg-neutral-50 px-3 py-2">
                    <Download className="size-3.5 text-[#D70E1D]" />
                    <span>Instant Digital Download after Checkout</span>
                  </span>
                  {product.duration && (
                    <span className="inline-flex items-center gap-2 border border-neutral-200 bg-neutral-50 px-3 py-2">
                      <Music className="size-3.5 text-[#D70E1D]" />
                      <span>Duration: {product.duration}</span>
                    </span>
                  )}
                </div>

                {product.previewUrl && (
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-500">
                      Audio Preview
                    </p>
                    <audio
                      controls
                      src={product.previewUrl}
                      className="w-full"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-5 border-y border-neutral-200 py-5">
                {product.size.length > 0 && (
                  <div className="space-y-2.5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-600">
                      Size: <span className="text-[#111111]">{selectedSize}</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.size.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSelectedSize(s)}
                          className={cn(
                            "border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors",
                            selectedSize === s
                              ? "border-[#D70E1D] bg-[#D70E1D] text-white"
                              : "border-neutral-300 bg-neutral-50 text-neutral-700 hover:border-[#111111]"
                          )}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {product.color.length > 0 && (
                  <div className="space-y-2.5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-600">
                      Color:{" "}
                      <span className="text-[#111111]">{selectedColor}</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.color.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setSelectedColor(c)}
                          className={cn(
                            "border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors",
                            selectedColor === c
                              ? "border-[#D70E1D] bg-[#D70E1D] text-white"
                              : "border-neutral-300 bg-neutral-50 text-neutral-700 hover:border-[#111111]"
                          )}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-600">
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-[#D70E1D]" />
                    <span>
                      {product.quantity > 0
                        ? `In Stock (${product.quantity} available)`
                        : "Made to Order"}
                    </span>
                  </span>
                  {product.shipping && (
                    <span className="inline-flex items-center gap-1.5">
                      <Truck className="size-3.5 text-[#D70E1D]" />
                      <span>Worldwide Shipping Available</span>
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Add to Cart + Wishlist */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {!isDigital && (
                <div className="inline-flex items-center border border-neutral-300 bg-neutral-50">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="p-3.5 text-neutral-600 hover:text-[#111111]"
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <span className="px-4 text-sm font-bold text-[#111111]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="p-3.5 text-neutral-600 hover:text-[#111111]"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={handleAddToCart}
                className="inline-flex flex-1 items-center justify-center gap-2 bg-[#D70E1D] px-6 py-4 text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#111111]"
              >
                <ShoppingBag className="size-4" />
                <span>ADD TO CART</span>
              </button>

              <button
                type="button"
                onClick={handleWishlist}
                aria-label="Toggle wishlist"
                className={cn(
                  "inline-flex items-center justify-center border p-4 transition-colors",
                  inWishlist
                    ? "border-[#D70E1D] bg-[#D70E1D] text-white"
                    : "border-neutral-300 text-neutral-600 hover:border-[#D70E1D] hover:text-[#D70E1D]"
                )}
              >
                <Heart
                  className={cn("size-4", inWishlist && "fill-current")}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Product Tabs (Description / Tracklist or Specs / Reviews) */}
        <div className="border border-neutral-200 bg-white">
          <div className="flex flex-wrap border-b border-neutral-200">
            {(
              [
                { key: "description", label: "Description" },
                {
                  key: "details",
                  label: isDigital ? "Tracklist & Files" : "Specifications",
                },
                { key: "reviews", label: `Reviews (${reviews.length})` },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-colors",
                  activeTab === tab.key
                    ? "border-b-2 border-[#D70E1D] bg-neutral-50 text-[#111111]"
                    : "text-neutral-500 hover:text-[#111111]"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6 sm:p-8">
            {activeTab === "description" && (
              <p className="max-w-3xl text-sm leading-relaxed text-neutral-700">
                {product.description}
              </p>
            )}

            {activeTab === "details" &&
              (isDigital ? (
                <div className="space-y-6">
                  {product.tracklist.length > 0 ? (
                    <div className="divide-y divide-neutral-200 border border-neutral-200">
                      {product.tracklist.map((track) => (
                        <div
                          key={track.trackNumber}
                          className="flex items-center justify-between px-4 py-3 text-xs"
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-[#D70E1D]">
                              {String(track.trackNumber).padStart(2, "0")}
                            </span>
                            <span className="font-semibold text-[#111111]">
                              {track.title}
                            </span>
                            {track.featuredArtists && (
                              <span className="text-neutral-500">
                                feat. {track.featuredArtists}
                              </span>
                            )}
                          </div>
                          <span className="text-neutral-500">
                            {track.duration}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-neutral-600">
                      High-quality digital release ready for download upon
                      order confirmation.
                    </p>
                  )}

                  {product.digitalFiles.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                        Included File Formats
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {product.digitalFiles.map((file) => (
                          <span
                            key={file._id}
                            className="border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-[11px] uppercase tracking-wider text-neutral-700"
                          >
                            {file.fileName} ({file.fileFormat.toUpperCase()})
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="border border-neutral-200 p-4">
                    <span className="text-neutral-500 uppercase tracking-widest">
                      Available Sizes
                    </span>
                    <p className="mt-1 font-semibold text-[#111111]">
                      {product.size.length > 0
                        ? product.size.join(", ")
                        : "Standard"}
                    </p>
                  </div>
                  <div className="border border-neutral-200 p-4">
                    <span className="text-neutral-500 uppercase tracking-widest">
                      Available Colors
                    </span>
                    <p className="mt-1 font-semibold text-[#111111]">
                      {product.color.length > 0
                        ? product.color.join(", ")
                        : "Default"}
                    </p>
                  </div>
                </div>
              ))}

            {activeTab === "reviews" && (
              <div className="space-y-8">
                {reviews.length === 0 ? (
                  <p className="text-xs text-neutral-600">
                    No reviews yet. Be the first to review {product.productName}.
                  </p>
                ) : (
                  <div className="divide-y divide-neutral-200">
                    {reviews.map((rev) => {
                      const reviewerName =
                        typeof rev.user === "string"
                          ? "Verified Customer"
                          : `${rev.user.firstName} ${rev.user.lastName}`;
                      return (
                        <div key={rev._id} className="py-4 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                              {reviewerName}
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs text-[#D70E1D]">
                              {Array.from({ length: rev.rating }).map(
                                (_, idx) => (
                                  <Star
                                    key={idx}
                                    className="size-3.5 fill-current"
                                  />
                                )
                              )}
                            </span>
                          </div>
                          <p className="text-xs leading-relaxed text-neutral-700">
                            {rev.review}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}

                <form
                  onSubmit={handleReviewSubmit}
                  className="border-t border-neutral-200 pt-6 space-y-4 max-w-xl"
                >
                  <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[#111111]">
                    Write a Review
                  </h4>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        aria-label={`Rate ${star} stars`}
                        className={cn(
                          "p-1 transition-colors",
                          star <= rating ? "text-[#D70E1D]" : "text-neutral-300"
                        )}
                      >
                        <Star className="size-4 fill-current" />
                      </button>
                    ))}
                  </div>
                  <textarea
                    rows={3}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your thoughts on this product..."
                    className="w-full border border-neutral-300 bg-neutral-50 p-3 text-xs text-[#111111] placeholder:text-neutral-400 focus:border-[#D70E1D] focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="bg-[#D70E1D] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#111111] disabled:opacity-60"
                  >
                    {submittingReview ? "SUBMITTING..." : "SUBMIT REVIEW"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

