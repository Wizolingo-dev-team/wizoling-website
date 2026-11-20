"use client";

import React from "react";
import RouteWrapper from "@src/layouts/RouteWrapper";
import OrderHistoryList from "@src/components/List/OrderHistoryList";

export default function OrderManagementClient() {
  return (
    <div className="w-full">
      <RouteWrapper middleSlot={<OrderHistoryList />} />
    </div>
  );
}

