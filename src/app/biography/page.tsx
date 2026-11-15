import type { Metadata } from "next";
import BiographySections from "@src/components/Sections/Biography";

export const metadata: Metadata = {
  title: "Biography",
  description:
    "Read the biography, musical journey, and discography of Wiz Ofuasia (Wizboyy) — Nigerian Afrobeats & Highlife artist, songwriter, and producer.",
  alternates: { canonical: "/biography" },
  openGraph: {
    title: "Biography | Wiz Ofuasia (Wizboyy)",
    description:
      "The story, career milestones, and discography of Wiz Ofuasia (Wizboyy).",
    url: "/biography",
    images: ["/images/gallery/wizolingo1.jpg"],
  },
};

export default function BiographyPage() {
  return <BiographySections />;
}
