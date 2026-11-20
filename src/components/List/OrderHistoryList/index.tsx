"use client";

import React, { useMemo, useState } from "react";
import { Search, Download, Ticket, Disc3 } from "lucide-react";
import { DataTable } from "@src/components/Tables";
import { getOrderColumns } from "@src/components/Tables/columns/OrderColumns";
import OrderListSkeleton from "@src/components/Skeletons/OrderListSkeleton";
import {
  useGetMyDownloads,
  useGetUserOrders,
} from "@src/hooks/orderManagement";
import { useDownloadDigitalRelease } from "@src/hooks/productManagement";
import { useGetMyTickets } from "@src/hooks/eventManagement";
import { cn } from "@src/lib/utils";

const ITEMS_PER_PAGE = 5;

export default function OrderHistoryList() {
  const { data: orders = [], isLoading } = useGetUserOrders();
  const { data: downloads = [] } = useGetMyDownloads();
  const { data: tickets = [] } = useGetMyTickets();
  const { mutate: triggerDownload, isPending: downloading } =
    useDownloadDigitalRelease();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const columns = useMemo(() => getOrderColumns(), []);

  const filteredData = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return orders;
    return orders.filter(
      (order) =>
        order._id.toLowerCase().includes(q) ||
        order.status.toLowerCase().includes(q) ||
        order.orderType.toLowerCase().includes(q)
    );
  }, [orders, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / ITEMS_PER_PAGE));
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDownloadRelease = (productId: string) => {
    triggerDownload(productId, {
      onSuccess: (res) => {
        const firstFile = res.data.digitalFiles[0];
        if (firstFile?.fileUrl && typeof window !== "undefined") {
          window.open(firstFile.fileUrl, "_blank", "noopener,noreferrer");
        }
      },
    });
  };

  if (isLoading) return <OrderListSkeleton />;

  return (
    <div className="w-full space-y-8">
      <DataTable
        title="Order History"
        columns={columns}
        data={paginatedData}
        actionSlot={
          <div className="flex w-full sm:w-[280px] items-center gap-2.5 border border-neutral-300 bg-neutral-50 px-3.5 py-2">
            <Search className="size-4 text-neutral-400" />
            <input
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search ID, Type, or Status..."
              className="w-full border-none bg-transparent text-xs font-medium text-[#111111] outline-none placeholder:text-neutral-400"
            />
          </div>
        }
      />

      {filteredData.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-4 border border-neutral-200 bg-white px-6 py-4 shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
            Showing{" "}
            {Math.min(
              (currentPage - 1) * ITEMS_PER_PAGE + 1,
              filteredData.length
            )}{" "}
            to {Math.min(currentPage * ITEMS_PER_PAGE, filteredData.length)} of{" "}
            {filteredData.length} orders
          </p>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="border border-neutral-200 bg-neutral-50 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-[#111111] transition-colors hover:bg-[#D70E1D] hover:text-white disabled:opacity-40"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentPage(idx + 1)}
                className={cn(
                  "size-9 border text-xs font-bold transition-colors",
                  currentPage === idx + 1
                    ? "border-[#D70E1D] bg-[#D70E1D] text-white"
                    : "border-neutral-200 bg-neutral-50 text-[#111111] hover:border-[#111111]"
                )}
              >
                {idx + 1}
              </button>
            ))}
            <button
              type="button"
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="border border-neutral-200 bg-neutral-50 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-[#111111] transition-colors hover:bg-[#D70E1D] hover:text-white disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Unlocked Digital Music Downloads */}
      {downloads.length > 0 && (
        <div className="border border-neutral-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-200 pb-3">
            <Disc3 className="size-4 text-[#D70E1D]" />
            <h3 className="font-display text-sm font-extrabold uppercase tracking-wider text-[#111111]">
              My Unlocked Digital Music Downloads
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {downloads.map((rel) => (
              <div
                key={rel._id}
                className="flex items-center justify-between gap-4 border border-neutral-200 bg-neutral-50 p-4"
              >
                <div className="min-w-0">
                  <p className="truncate font-display text-xs font-bold uppercase text-[#111111]">
                    {rel.productName}
                  </p>
                  <p className="text-[11px] text-neutral-500">
                    {rel.artist} &bull; {rel.digitalReleaseType || "Digital"}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={downloading}
                  onClick={() => handleDownloadRelease(rel._id)}
                  className="inline-flex shrink-0 items-center gap-1.5 bg-[#D70E1D] px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#111111] disabled:opacity-50"
                >
                  <Download className="size-3.5" />
                  <span>Download</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* My Event Tickets */}
      {tickets.length > 0 && (
        <div className="border border-neutral-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-200 pb-3">
            <Ticket className="size-4 text-[#D70E1D]" />
            <h3 className="font-display text-sm font-extrabold uppercase tracking-wider text-[#111111]">
              My Event Tickets
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tickets.map((tkt) => {
              const eventTitle =
                typeof tkt.event === "string"
                  ? "Wiz Ofuasia Live Event"
                  : tkt.event.title;
              return (
                <div
                  key={tkt._id}
                  className="flex items-center justify-between gap-4 border border-neutral-200 bg-neutral-50 p-4"
                >
                  <div className="min-w-0 space-y-1">
                    <p className="truncate font-display text-xs font-bold uppercase text-[#111111]">
                      {eventTitle}
                    </p>
                    <p className="text-[11px] font-bold text-[#D70E1D]">
                      Code: {tkt.ticketCode}
                    </p>
                  </div>
                  <span className="border border-neutral-200 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#111111]">
                    {tkt.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

