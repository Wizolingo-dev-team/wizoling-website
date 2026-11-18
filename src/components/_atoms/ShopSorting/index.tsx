"use client";

import React from "react";
import { ArrowUpDown } from "lucide-react";
import CustomSelect, {
  type SelectOptionItem,
} from "@src/components/_atoms/CustomSelect";

export type ShopSortOption =
  | "newest"
  | "popular"
  | "price-asc"
  | "price-desc"
  | "name-asc";

const SORT_OPTIONS: SelectOptionItem[] = [
  { value: "newest", label: "Sort: Latest Releases" },
  { value: "popular", label: "Sort: Best Selling" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
];

type ShopSortingProps = {
  sortBy: ShopSortOption;
  onSortChange: (value: ShopSortOption) => void;
  totalCount: number;
};

export default function ShopSorting({
  sortBy,
  onSortChange,
  totalCount,
}: ShopSortingProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border border-neutral-200 bg-white px-5 py-3.5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-600">
        Showing <span className="text-[#111111]">{totalCount}</span>{" "}
        {totalCount === 1 ? "Product" : "Products"}
      </p>

      <div className="flex items-center gap-2.5">
        <ArrowUpDown className="size-3.5 text-[#D70E1D]" />
        <CustomSelect
          value={sortBy}
          onValueChange={(val) => onSortChange(val as ShopSortOption)}
          options={SORT_OPTIONS}
          ariaLabel="Sort products"
          variant="light"
          className="min-w-[215px]"
        />
      </div>
    </div>
  );
}
