import React from "react";
import type { Metadata } from "next";
import ShopContent from "@src/components/Sections/Shop/ShopContent";

export const metadata: Metadata = {
  title: "Store",
  description:
    "Shop official Wiz Ofuasia (Wizboyy) merchandise, apparel, and instant digital music downloads.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return <ShopContent />;
}

