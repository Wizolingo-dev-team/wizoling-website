import React from "react";
import type { Metadata } from "next";
import EventDetailsContent from "@src/components/Sections/Events/EventDetailsContent";

export const metadata: Metadata = {
  title: "Event Details",
  description:
    "View official Wiz Ofuasia (Wizboyy) live concert details, venue map, and reserve event tickets.",
};

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <EventDetailsContent idOrSlug={slug} />;
}
