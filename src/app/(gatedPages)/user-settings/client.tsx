"use client";

import React from "react";
import RouteWrapper from "@src/layouts/RouteWrapper";
import User from "@src/components/User";

export default function SettingsClient() {
  return (
    <RouteWrapper
      middleSlot={
        <div className="w-full">
          <User />
        </div>
      }
    />
  );
}

