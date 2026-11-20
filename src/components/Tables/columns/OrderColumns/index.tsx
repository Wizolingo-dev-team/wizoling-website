"use client";

import React from "react";
import Image from "next/image";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Disc3, Package } from "lucide-react";
import ViewDetailsModal from "@src/components/_modals/ViewDetailsModal";
import type { Order } from "@src/types/orderManagement";
import { cn } from "@src/lib/utils";

const getStatusProgress = (status: string) => {
  switch (status) {
    case "Delivered":
      return { val: 100, color: "bg-emerald-600" };
    case "On the way":
      return { val: 75, color: "bg-[#D70E1D]" };
    case "Payment Confirmed":
      return { val: 45, color: "bg-[#D70E1D]/80" };
    case "Processing":
      return { val: 20, color: "bg-amber-500" };
    default:
      return { val: 0, color: "bg-neutral-300" };
  }
};

export const getOrderColumns = (): ColumnDef<Order>[] => [
  {
    accessorKey: "_id",
    header: "Order ID",
    cell: ({ row }) => (
      <span className="font-display text-xs font-bold uppercase tracking-wider text-[#111111]">
        #{row.original._id.slice(-8).toUpperCase()}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => (
      <span className="text-xs text-neutral-500">
        {new Date(row.original.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </span>
    ),
  },
  {
    accessorKey: "orderType",
    header: "Type",
    cell: ({ row }) => {
      const type = row.original.orderType;
      return (
        <span className="inline-flex items-center gap-1 border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#111111]">
          {type === "digital" ? (
            <>
              <Disc3 className="size-3 text-[#D70E1D]" />
              Digital
            </>
          ) : (
            <>
              <Package className="size-3 text-[#D70E1D]" />
              {type}
            </>
          )}
        </span>
      );
    },
  },
  {
    header: "Progress",
    cell: ({ row }) => {
      const { val, color } = getStatusProgress(row.original.status);
      return (
        <div className="flex min-w-[140px] items-center gap-3">
          <span className="w-8 text-[10px] font-bold text-[#111111]">
            {val}%
          </span>
          <div className="h-1.5 flex-1 overflow-hidden bg-neutral-200">
            <div
              className={cn("h-full transition-all duration-1000", color)}
              style={{ width: `${val}%` }}
            />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div
        className={cn(
          "w-fit border px-3 py-1 text-[10px] font-bold uppercase tracking-widest",
          row.original.status === "Delivered"
            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
            : row.original.status === "Cancelled"
              ? "border-red-200 bg-red-50 text-[#D70E1D]"
              : "border-neutral-200 bg-neutral-100 text-[#111111]"
        )}
      >
        {row.original.status}
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <span className="font-display text-xs font-extrabold text-[#111111]">
        ${row.original.amount.toFixed(2)}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <ViewDetailsModal
        title={`Order #${row.original._id.slice(-8).toUpperCase()}`}
        trigger={
          <button
            type="button"
            aria-label="View order invoice"
            className="inline-flex size-9 items-center justify-center border border-neutral-200 bg-neutral-50 text-[#111111] transition-colors hover:border-[#D70E1D] hover:bg-[#D70E1D] hover:text-white"
          >
            <Eye className="size-4" />
          </button>
        }
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-neutral-200 bg-neutral-50 p-4">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                Customer Contact
              </p>
              <p className="text-xs font-bold text-[#111111]">
                {row.original.email}
              </p>
              {row.original.phone && (
                <p className="text-xs text-neutral-600">{row.original.phone}</p>
              )}
            </div>
            <div className="border border-neutral-200 bg-neutral-50 p-4">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                Status &amp; Payment
              </p>
              <p className="text-xs font-bold uppercase text-[#D70E1D]">
                {row.original.status} ({row.original.paymentStatus})
              </p>
            </div>
          </div>

          {row.original.address && (
            <div className="border border-neutral-200 bg-neutral-50 p-4">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                Delivery Address
              </p>
              <p className="text-xs font-semibold text-[#111111]">
                {[
                  row.original.address,
                  row.original.city,
                  row.original.state,
                  row.original.country,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            </div>
          )}

          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D70E1D]">
              Items in this Order
            </h4>
            <div className="max-h-[260px] space-y-2.5 overflow-y-auto pr-1">
              {row.original.products.map((p, i) => (
                <div
                  key={`${p._id}-${i}`}
                  className="flex items-center justify-between border border-neutral-200 bg-neutral-50 p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative size-12 shrink-0 overflow-hidden border border-neutral-200 bg-white">
                      <Image
                        src={p.attachments?.[0] || "/images/gallery/wizolingo1.jpg"}
                        alt={p.productName}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#111111]">
                        {p.productName}
                      </p>
                      <p className="text-[10px] uppercase tracking-wider text-neutral-500">
                        Qty: {p.quantity}
                        {p.size ? ` • Size: ${p.size}` : ""}
                        {p.color ? ` • Color: ${p.color}` : ""}
                      </p>
                    </div>
                  </div>
                  <span className="font-display text-xs font-extrabold text-[#111111]">
                    ${(p.price * p.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2 border-t border-neutral-200 pt-4 text-xs">
            <div className="flex items-center justify-between text-neutral-600">
              <span>Shipping Fee</span>
              <span>${row.original.deliveryFee.toFixed(2)}</span>
            </div>
            {row.original.discountAmount > 0 && (
              <div className="flex items-center justify-between text-emerald-700">
                <span>Discount ({row.original.discountCode})</span>
                <span>-${row.original.discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex items-center justify-between pt-2">
              <span className="font-display text-sm font-extrabold uppercase text-[#111111]">
                Total Amount
              </span>
              <span className="font-display text-lg font-extrabold text-[#D70E1D]">
                ${row.original.amount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </ViewDetailsModal>
    ),
  },
];

