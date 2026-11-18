"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Heart,
  Disc3,
  Package,
  ArrowRight,
} from "lucide-react";
import Breadcrumb from "@src/components/Breadcrumb";
import SearchBar from "@src/components/_atoms/SearchBar";
import ShopFilters from "@src/components/_atoms/ShopFilters";
import ShopSorting, {
  type ShopSortOption,
} from "@src/components/_atoms/ShopSorting";
import Empty from "@src/components/_atoms/Empty";
import ShopSkeleton from "@src/components/Skeletons/Shop";
import {
  useGetAllProducts,
  useGetProductFilterOptions,
} from "@src/hooks/productManagement";
import { useGetAllCategories } from "@src/hooks/categoryManagement";
import {
  useGetWishlist,
  useToggleWishlist,
} from "@src/hooks/wishlistManagement";
import { useCart } from "@src/hooks/useCart";
import { useToast } from "@src/hooks/useToast";
import { getAuthToken } from "@src/utils/auth";
import type { Product, ProductType } from "@src/types/productManagement";
import { cn } from "@src/lib/utils";

export default function ShopContent() {
  const router = useRouter();
  const toast = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<ProductType | "all">("all");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");
  const [sortBy, setSortBy] = useState<ShopSortOption>("newest");

  const queryParams = useMemo(() => {
    const parsedMin =
      minPriceInput.trim() !== "" ? Number(minPriceInput) : undefined;
    const parsedMax =
      maxPriceInput.trim() !== "" ? Number(maxPriceInput) : undefined;

    return {
      productType: selectedType !== "all" ? selectedType : undefined,
      category: selectedCategory ?? undefined,
      search: searchQuery.trim() || undefined,
      minPrice:
        parsedMin !== undefined && !Number.isNaN(parsedMin)
          ? parsedMin
          : undefined,
      maxPrice:
        parsedMax !== undefined && !Number.isNaN(parsedMax)
          ? parsedMax
          : undefined,
      color:
        selectedType !== "digital_music" && selectedColor
          ? selectedColor
          : undefined,
      size:
        selectedType !== "digital_music" && selectedSize
          ? selectedSize
          : undefined,
      sort: sortBy,
    };
  }, [
    selectedType,
    selectedCategory,
    searchQuery,
    minPriceInput,
    maxPriceInput,
    selectedColor,
    selectedSize,
    sortBy,
  ]);

  const { data: products = [], isLoading: productsLoading } =
    useGetAllProducts(queryParams);
  const { data: filterOptions } = useGetProductFilterOptions(selectedType);
  const { data: categories = [], isLoading: categoriesLoading } =
    useGetAllCategories(
      selectedType !== "all" ? { categoryType: selectedType } : undefined
    );
  const { data: wishlist } = useGetWishlist();
  const { mutate: toggleWishlist } = useToggleWishlist();
  const addToCart = useCart((s) => s.addToCart);

  useEffect(() => {
    if (selectedType === "digital_music") {
      setSelectedColor(null);
      setSelectedSize(null);
    }
  }, [selectedType]);

  const wishlistProductIds = useMemo(() => {
    return new Set((wishlist?.products ?? []).map((p) => p._id));
  }, [wishlist]);

  const filteredProducts = products;

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedType("all");
    setSelectedCategory(null);
    setSelectedColor(null);
    setSelectedSize(null);
    setMinPriceInput("");
    setMaxPriceInput("");
    setSortBy("newest");
  };

  const handleQuickAdd = (product: Product) => {
    if (
      product.productType === "merch" &&
      (product.size.length > 0 || product.color.length > 0)
    ) {
      addToCart(product, {
        quantity: 1,
        selectedSize: product.size[0],
        selectedColor: product.color[0],
      });
    } else {
      addToCart(product, { quantity: 1 });
    }
    toast.success(`${product.productName} added to your cart`);
  };

  const handleWishlistToggle = (productId: string) => {
    if (!getAuthToken()) {
      toast.info("Please sign in to save items to your wishlist.");
      router.push("/login?redirect=/shop");
      return;
    }
    toggleWishlist({ productId });
  };

  const isLoading = productsLoading || categoriesLoading;

  return (
    <div className="pb-20 bg-white text-[#111111]">
      {/* Micdrop Shop Header Banner */}
      <section className="border-b border-neutral-200 pt-24 pb-10 sm:pt-28 sm:pb-12 lg:pt-36 lg:pb-14">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 space-y-4">
          <Breadcrumb
            variant="light"
            items={[{ label: "Home", href: "/" }, { label: "Store" }]}
          />
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D70E1D]">
                Official Merch &amp; Digital Releases
              </p>
              <h1 className="mt-2 font-display text-[clamp(2rem,5vw,3.75rem)] font-extrabold uppercase tracking-wide text-[#111111]">
                WIZOLINGO STORE
              </h1>
            </div>
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 border border-neutral-300 px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#111111] transition-colors hover:border-[#D70E1D] hover:bg-[#D70E1D] hover:text-white"
            >
              <ShoppingBag className="size-3.5" />
              <span>VIEW CART</span>
            </Link>
          </div>
        </div>
      </section>

      {isLoading ? (
        <ShopSkeleton />
      ) : (
        <section className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Sidebar */}
            <aside className="lg:col-span-3 space-y-6 lg:sticky lg:top-28">
              <div className="border border-neutral-200 bg-white p-6 space-y-4">
                <h3 className="font-display text-xs font-extrabold uppercase tracking-[0.25em] text-[#111111]">
                  SEARCH STORE
                </h3>
                <SearchBar
                  variant="light"
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search merch or music..."
                  ariaLabel="Search store products"
                />
              </div>

              <ShopFilters
                categories={categories}
                selectedType={selectedType}
                onTypeChange={(nextType) => {
                  setSelectedType(nextType);
                  setSelectedCategory(null);
                }}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                availableColors={filterOptions?.colors ?? []}
                selectedColor={selectedColor}
                onColorChange={setSelectedColor}
                availableSizes={filterOptions?.sizes ?? []}
                selectedSize={selectedSize}
                onSizeChange={setSelectedSize}
                globalMinPrice={filterOptions?.minPrice ?? 0}
                globalMaxPrice={filterOptions?.maxPrice ?? 0}
                minPriceInput={minPriceInput}
                maxPriceInput={maxPriceInput}
                onMinPriceChange={setMinPriceInput}
                onMaxPriceChange={setMaxPriceInput}
                onReset={handleResetFilters}
              />
            </aside>

            {/* Right Main Catalog */}
            <div className="lg:col-span-9 space-y-8">
              <ShopSorting
                sortBy={sortBy}
                onSortChange={setSortBy}
                totalCount={filteredProducts.length}
              />

              {filteredProducts.length === 0 ? (
                <Empty
                  variant="light"
                  title="No products available"
                  description={
                    products.length === 0
                      ? "Official Wiz Ofuasia merch and digital music releases are being stocked. Check back soon!"
                      : "No products matched your selected filters or search term."
                  }
                  actionLabel={
                    products.length > 0 ? "Reset Filters" : "Back to Home"
                  }
                  onAction={
                    products.length > 0 ? handleResetFilters : undefined
                  }
                  actionHref={products.length === 0 ? "/" : undefined}
                />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => {
                    const isDigital = product.productType === "digital_music";
                    const imageUrl =
                      product.attachments[0] ??
                      "/images/gallery/wizolingo1.jpg";
                    const inWishlist = wishlistProductIds.has(product._id);
                    const hasDiscount =
                      product.discounts && product.discounts.isActive;

                    return (
                      <article
                        key={product._id}
                        className="group flex flex-col border border-neutral-200 bg-white transition-colors hover:border-[#D70E1D]"
                      >
                        <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
                          <Link
                            href={`/shop/${product._id}`}
                            className="block h-full w-full"
                          >
                            <Image
                              src={imageUrl}
                              alt={product.productName}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          </Link>

                          {/* Product Type Badge */}
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

                          {/* Discount Badge */}
                          {hasDiscount && product.discounts && (
                            <span className="absolute right-12 top-3 bg-[#D70E1D] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white">
                              -{product.discounts.discountPercentage}%
                            </span>
                          )}

                          {/* Wishlist Heart */}
                          <button
                            type="button"
                            onClick={() => handleWishlistToggle(product._id)}
                            aria-label="Toggle wishlist"
                            className={cn(
                              "absolute right-3 top-3 inline-flex size-8 items-center justify-center border bg-white/95 shadow-sm transition-colors",
                              inWishlist
                                ? "border-[#D70E1D] bg-[#D70E1D] text-white"
                                : "border-neutral-200 text-[#111111] hover:border-[#D70E1D] hover:text-[#D70E1D]"
                            )}
                          >
                            <Heart
                              className={cn(
                                "size-3.5",
                                inWishlist && "fill-current"
                              )}
                            />
                          </button>

                          {/* Quick Add Overlay */}
                          <button
                            type="button"
                            onClick={() => handleQuickAdd(product)}
                            className="absolute inset-x-3 bottom-3 inline-flex items-center justify-center gap-2 bg-[#D70E1D] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-[#111111]"
                          >
                            <ShoppingBag className="size-3.5" />
                            <span>ADD TO CART</span>
                          </button>
                        </div>

                        <div className="flex flex-1 flex-col justify-between p-5 space-y-3">
                          <div className="space-y-1.5">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D70E1D]">
                              {isDigital
                                ? product.digitalReleaseType || "Digital Music"
                                : product.categories[0]?.categoryName ??
                                  "Official Merch"}
                            </p>
                            <h2 className="font-display text-base font-extrabold uppercase tracking-wide text-[#111111] line-clamp-1">
                              <Link
                                href={`/shop/${product._id}`}
                                className="transition-colors hover:text-[#D70E1D]"
                              >
                                {product.productName}
                              </Link>
                            </h2>
                          </div>

                          <div className="flex items-center justify-between border-t border-neutral-200 pt-3">
                            <span className="font-display text-base font-extrabold text-[#111111]">
                              ${product.price.toFixed(2)}
                            </span>
                            <Link
                              href={`/shop/${product._id}`}
                              className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600 transition-colors hover:text-[#D70E1D]"
                            >
                              <span>DETAILS</span>
                              <ArrowRight className="size-3" />
                            </Link>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

