import type { Metadata } from "next";
import NewsSections from "@src/components/Sections/News";

export const metadata: Metadata = {
  title: "News & Updates",
  description:
    "Latest news, release announcements, tour updates, and press stories from Wiz Ofuasia (Wizboyy).",
  alternates: { canonical: "/news" },
  openGraph: {
    title: "News & Updates | Wiz Ofuasia (Wizboyy)",
    description:
      "Latest news, music releases, and tour updates from Wiz Ofuasia.",
    url: "/news",
    images: ["/images/gallery/wizolingo6.jpg"],
  },
};

export default function NewsPage() {
  return <NewsSections />;
}
