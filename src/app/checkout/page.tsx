import React from "react";
import type { Metadata } from "next";
import CheckoutContent from "@src/components/Sections/Checkout/CheckoutContent";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Complete your Wiz Ofuasia (Wizolingo) merch and digital music order.",
  alternates: { canonical: "/checkout" },
};

export default function CheckoutPage() {
  return <CheckoutContent />;
}

