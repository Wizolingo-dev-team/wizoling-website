"use client";

import React, { useMemo } from "react";
import RouteWrapper from "@src/layouts/RouteWrapper";
import TotalOrders from "@src/components/_widgets/TotalOrders";
import PendingOrders from "@src/components/_widgets/PendingOrders";
import DeliveredOrders from "@src/components/_widgets/DeliveredOrders";
import CanceledOrders from "@src/components/_widgets/CanceledOrders";
import CustomerFeeds from "@src/components/_widgets/CustomerFeeds";
import OrderListSkeleton from "@src/components/Skeletons/OrderListSkeleton";
import { useGetUserOrders } from "@src/hooks/orderManagement";
import { useGetUserLogs } from "@src/hooks/activityManagement";

export default function DashboardClient() {
  const { data: orders = [], isLoading: ordersLoading } = useGetUserOrders();
  const { data: logs = [], isLoading: logsLoading } = useGetUserLogs();

  const stats = useMemo(() => {
    const pending = orders.filter(
      (o) =>
        o.status === "Processing" ||
        o.status === "Payment Confirmed" ||
        o.status === "On the way"
    );
    const delivered = orders.filter((o) => o.status === "Delivered");
    const canceled = orders.filter((o) => o.status === "Cancelled");

    const days = ["S", "M", "T", "W", "T", "F", "S"];
    const barData = days.map((label, index) => {
      const count = orders.filter(
        (o) => new Date(o.createdAt).getDay() === index
      ).length;
      return {
        label,
        value: orders.length > 0 ? (count / orders.length) * 100 : 0,
      };
    });

    return {
      total: orders.length,
      pending: pending.length,
      delivered: delivered.length,
      canceled: canceled.length,
      barData,
      totalSpend: orders.reduce((acc, curr) => acc + curr.amount, 0),
    };
  }, [orders]);

  if (ordersLoading || logsLoading) {
    return (
      <div className="p-4 sm:p-6">
        <OrderListSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <TotalOrders
          value={stats.total}
          bars={stats.barData}
          spend={stats.totalSpend}
        />
        <PendingOrders value={stats.pending} total={stats.total} />
      </div>

      <RouteWrapper
        middleSlot={
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
            <DeliveredOrders value={stats.delivered} />
            <CanceledOrders value={stats.canceled} />
          </div>
        }
      />

      <div className="w-full">
        <CustomerFeeds logs={logs} />
      </div>
    </div>
  );
}

