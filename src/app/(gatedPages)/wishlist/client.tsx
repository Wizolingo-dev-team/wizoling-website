"use client";

import React from "react";
import RouteWrapper from "@src/layouts/RouteWrapper";
import WishList from "@src/components/WishList";

export default function WishlistClient() {
  return (
    <div className="w-full">
      <RouteWrapper
        middleSlot={
          <div className="w-full">
            <WishList />
          </div>
        }
      />
    </div>
  );
}

