import type { Metadata } from "next";
import EventsSections from "@src/components/Sections/Events";

export const metadata: Metadata = {
  title: "Events & Live Shows",
  description:
    "Explore Wiz Ofuasia (Wizboyy) tours, live concert flyers, booking inquiries, and watch live performance videos from Europe and international stages.",
  alternates: { canonical: "/events" },
  openGraph: {
    title: "Events & Live Shows | Wiz Ofuasia (Wizboyy)",
    description:
      "Wiz Ofuasia live tour dates, concert flyers, and international stage performances.",
    url: "/events",
    images: ["/images/gallery/wizolingo4.jpg"],
  },
};

export default function EventsPage() {
  return <EventsSections />;
}
