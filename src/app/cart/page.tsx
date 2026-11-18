import React from "react";
import type { Metadata } from "next";
import CartContent from "@src/components/Sections/Cart/CartContent";

export const metadata: Metadata = {
  title: "Cart",
  description:
    "Review your Wiz Ofuasia merchandise and digital music downloads before checkout.",
  alternates: { canonical: "/cart" },
};

export default function CartPage() {
  return <CartContent />;
}

