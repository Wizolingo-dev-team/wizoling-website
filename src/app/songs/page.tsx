import type { Metadata } from "next";
import SongsSections from "@src/components/Sections/Songs";

export const metadata: Metadata = {
  title: "Songs & Albums",
  description:
    "Explore the official discography of Wiz Ofuasia (Wizboyy) — stream singles and albums including Yolo, More Billionaires, Wizolingo, Magic, Salambala, and Lovinjitis.",
  alternates: { canonical: "/songs" },
  openGraph: {
    title: "Songs & Albums | Wiz Ofuasia (Wizboyy)",
    description:
      "Listen to Wiz Ofuasia's singles, albums, and EPs across Spotify, Apple Music, YouTube, and Deezer.",
    url: "/songs",
    images: ["/images/gallery/wiz_event-scaled.jpg"],
  },
};

export default function SongsPage() {
  return <SongsSections />;
}
