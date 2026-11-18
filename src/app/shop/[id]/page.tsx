import React from "react";
import type { Metadata } from "next";
import ShopDetailsContent from "@src/components/Sections/ShopDetails/ShopDetailsContent";

export const metadata: Metadata = {
  title: "Product Details",
  description:
    "View official Wiz Ofuasia (Wizboyy) merchandise and digital music release details.",
};

export default async function ShopDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ShopDetailsContent productId={id} />;
}

