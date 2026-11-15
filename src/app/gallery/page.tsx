import type { Metadata } from "next";
import GallerySections from "@src/components/Sections/Gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse the official photo gallery of Wiz Ofuasia (Wizboyy) — editorial portraits, studio sessions, press shoots, and live stage photography.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery | Wiz Ofuasia (Wizboyy)",
    description:
      "Editorial portraits, studio sessions, and live concert photography of Wiz Ofuasia.",
    url: "/gallery",
    images: ["/images/gallery/wizolingo1.jpg"],
  },
};

export default function GalleryPage() {
  return <GallerySections />;
}
