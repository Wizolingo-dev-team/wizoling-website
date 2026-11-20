"use client";

import React from "react";
import RouteWrapper from "@src/layouts/RouteWrapper";
import Deals from "@src/components/Deals";

export default function MyDealsClient() {
  return (
    <div className="w-full">
      <RouteWrapper
        middleSlot={
          <div className="w-full">
            <Deals />
          </div>
        }
      />
    </div>
  );
}

