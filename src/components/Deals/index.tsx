"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { BadgePercent } from "lucide-react";
import DealsCard, {
  type DealProductItem,
} from "@src/components/Cards/DealsCard";
import Empty from "@src/components/_atoms/Empty";
import OrderListSkeleton from "@src/components/Skeletons/OrderListSkeleton";
import { useGetAllDiscounts } from "@src/hooks/discountManagement";

export default function Deals() {
  const { data: discounts = [], isLoading } = useGetAllDiscounts();
  const [globalTime, setGlobalTime] = useState("");

  const productsOnDeals = useMemo<DealProductItem[]>(() => {
    const now = new Date();
    return discounts
      .flatMap((discount) =>
        (discount.products ?? [])
          .filter((p) => Boolean(p && p._id))
          .map((p) => ({
            ...p,
            expiryDate: discount.expiryDate,
            discountPercentage: discount.discountPercentage,
            discountCode: discount.discountCode,
          }))
      )
      .filter((p) => new Date(p.expiryDate) > now);
  }, [discounts]);

  useEffect(() => {
    if (productsOnDeals.length === 0) return;

    const timer = setInterval(() => {
      const nearest = productsOnDeals.reduce((prev, curr) =>
        new Date(prev.expiryDate) < new Date(curr.expiryDate) ? prev : curr
      );
      const diff =
        new Date(nearest.expiryDate).getTime() - new Date().getTime();

      if (diff <= 0) {
        setGlobalTime("EXPIRED");
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setGlobalTime(`${d}D : ${h}H : ${m}M : ${s}S`);
    }, 1000);

    return () => clearInterval(timer);
  }, [productsOnDeals]);

  if (isLoading) return <OrderListSkeleton />;

  return (
    <section className="w-full space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 pb-5">
        <div className="flex flex-wrap items-center gap-4">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-[#111111]">
            Exclusive Member Deals
          </h2>
          {productsOnDeals.length > 0 && globalTime && (
            <span className="bg-[#D70E1D] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
              {globalTime}
            </span>
          )}
        </div>

        <Link
          href="/shop"
          className="text-xs font-bold uppercase tracking-[0.2em] text-[#111111] underline decoration-[#D70E1D] underline-offset-4 hover:text-[#D70E1D]"
        >
          View All Store Products
        </Link>
      </div>

      {productsOnDeals.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productsOnDeals.map((product) => (
            <DealsCard
              key={`${product._id}-${product.discountCode}`}
              product={product}
            />
          ))}
        </div>
      ) : (
        <Empty
          variant="light"
          title="No active deals right now"
          description="Exclusive discount codes on Wiz Ofuasia merch and digital music releases will appear here when active."
          icon={<BadgePercent className="size-6" />}
          actionLabel="Browse Store"
          actionHref="/shop"
        />
      )}
    </section>
  );
}

