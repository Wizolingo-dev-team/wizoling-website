"use client";

import React from "react";
import { SlidersHorizontal, RotateCcw } from "lucide-react";
import type { Category } from "@src/types/categoryManagement";
import type { ProductType } from "@src/types/productManagement";
import { cn } from "@src/lib/utils";

type ShopFiltersProps = {
  categories: Category[];
  selectedType: ProductType | "all";
  onTypeChange: (type: ProductType | "all") => void;
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
  availableColors: string[];
  selectedColor: string | null;
  onColorChange: (color: string | null) => void;
  availableSizes: string[];
  selectedSize: string | null;
  onSizeChange: (size: string | null) => void;
  globalMinPrice: number;
  globalMaxPrice: number;
  minPriceInput: string;
  maxPriceInput: string;
  onMinPriceChange: (val: string) => void;
  onMaxPriceChange: (val: string) => void;
  onReset: () => void;
};

const TYPE_OPTIONS: Array<{ value: ProductType | "all"; label: string }> = [
  { value: "all", label: "All Products" },
  { value: "merch", label: "Physical Merch" },
  { value: "digital_music", label: "Digital Downloads" },
];

export default function ShopFilters({
  categories,
  selectedType,
  onTypeChange,
  selectedCategory,
  onCategoryChange,
  availableColors,
  selectedColor,
  onColorChange,
  availableSizes,
  selectedSize,
  onSizeChange,
  globalMinPrice,
  globalMaxPrice,
  minPriceInput,
  maxPriceInput,
  onMinPriceChange,
  onMaxPriceChange,
  onReset,
}: ShopFiltersProps) {
  const showMerchAttributes = selectedType !== "digital_music";
  const hasFilters =
    selectedType !== "all" ||
    selectedCategory !== null ||
    selectedColor !== null ||
    selectedSize !== null ||
    minPriceInput !== "" ||
    maxPriceInput !== "";

  return (
    <div className="space-y-7 border border-neutral-200 bg-white p-6">
      <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-[#D70E1D]" />
          <h3 className="font-display text-xs font-extrabold uppercase tracking-[0.24em] text-[#111111]">
            FILTERS
          </h3>
        </div>
        {hasFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D70E1D] transition-colors hover:text-[#111111]"
          >
            <RotateCcw className="size-3" />
            Reset
          </button>
        )}
      </div>

      {/* Product Type */}
      <div className="space-y-3">
        <h4 className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-500">
          Product Type
        </h4>
        <div className="space-y-1.5">
          {TYPE_OPTIONS.map((opt) => {
            const active = selectedType === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onTypeChange(opt.value)}
                className={cn(
                  "flex w-full items-center justify-between px-3 py-2 text-left text-xs uppercase tracking-[0.14em] transition-colors",
                  active
                    ? "bg-[#D70E1D] font-bold text-white"
                    : "bg-neutral-50 text-neutral-700 hover:bg-neutral-100 hover:text-[#111111]"
                )}
              >
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Categories from Backend */}
      <div className="space-y-3 border-t border-neutral-200 pt-5">
        <h4 className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-500">
          Categories
        </h4>
        {categories.length === 0 ? (
          <p className="text-xs text-neutral-500">No categories available yet.</p>
        ) : (
          <ul className="divide-y divide-neutral-200">
            <li>
              <button
                type="button"
                onClick={() => onCategoryChange(null)}
                className={cn(
                  "flex w-full items-center justify-between py-2.5 text-left text-xs uppercase tracking-[0.14em] transition-colors",
                  selectedCategory === null
                    ? "font-bold text-[#D70E1D]"
                    : "text-neutral-700 hover:text-[#111111]"
                )}
              >
                All Categories
              </button>
            </li>
            {categories.map((cat) => {
              const active = selectedCategory === cat._id;
              return (
                <li key={cat._id}>
                  <button
                    type="button"
                    onClick={() => onCategoryChange(active ? null : cat._id)}
                    className={cn(
                      "flex w-full items-center justify-between py-2.5 text-left text-xs uppercase tracking-[0.14em] transition-colors",
                      active
                        ? "font-bold text-[#D70E1D]"
                        : "text-neutral-700 hover:text-[#111111]"
                    )}
                  >
                    <span>{cat.categoryName}</span>
                    <span className="text-[10px] text-neutral-400">
                      {cat.categoryType === "digital_music"
                        ? "MUSIC"
                        : cat.categoryType === "merch"
                          ? "MERCH"
                          : "ALL"}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Global Price Range Filter */}
      <div className="space-y-3 border-t border-neutral-200 pt-5">
        <h4 className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-500">
          Price Range (USD)
        </h4>
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label htmlFor="filter-min-price" className="sr-only">
              Minimum price
            </label>
            <input
              id="filter-min-price"
              type="number"
              min={0}
              value={minPriceInput}
              onChange={(e) => onMinPriceChange(e.target.value)}
              placeholder={`Min ($${globalMinPrice})`}
              className="w-full border border-neutral-300 bg-neutral-50 px-3 py-2 text-xs text-[#111111] placeholder:text-neutral-400 focus:border-[#D70E1D] focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="filter-max-price" className="sr-only">
              Maximum price
            </label>
            <input
              id="filter-max-price"
              type="number"
              min={0}
              value={maxPriceInput}
              onChange={(e) => onMaxPriceChange(e.target.value)}
              placeholder={`Max ($${globalMaxPrice})`}
              className="w-full border border-neutral-300 bg-neutral-50 px-3 py-2 text-xs text-[#111111] placeholder:text-neutral-400 focus:border-[#D70E1D] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Physical Merch Colors (Dynamic from Backend) */}
      {showMerchAttributes && availableColors.length > 0 && (
        <div className="space-y-3 border-t border-neutral-200 pt-5">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-500">
            Colors
          </h4>
          <div className="flex flex-wrap gap-2">
            {availableColors.map((color) => {
              const active = selectedColor === color;
              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => onColorChange(active ? null : color)}
                  className={cn(
                    "border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-colors",
                    active
                      ? "border-[#D70E1D] bg-[#D70E1D] text-white"
                      : "border-neutral-300 bg-neutral-50 text-neutral-700 hover:border-[#111111]"
                  )}
                >
                  {color}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Physical Merch Sizes (Dynamic from Backend) */}
      {showMerchAttributes && availableSizes.length > 0 && (
        <div className="space-y-3 border-t border-neutral-200 pt-5">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-500">
            Sizes
          </h4>
          <div className="flex flex-wrap gap-2">
            {availableSizes.map((size) => {
              const active = selectedSize === size;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => onSizeChange(active ? null : size)}
                  className={cn(
                    "border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-colors",
                    active
                      ? "border-[#D70E1D] bg-[#D70E1D] text-white"
                      : "border-neutral-300 bg-neutral-50 text-neutral-700 hover:border-[#111111]"
                  )}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
