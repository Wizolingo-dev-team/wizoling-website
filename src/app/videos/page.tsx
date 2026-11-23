import type { Metadata } from "next";
import VideosSections from "@src/components/Sections/Videos";

export const metadata: Metadata = {
  title: "Music Videos",
  description:
    "Watch official music videos and visuals by Wiz Ofuasia (Wizboyy), including High Vibration, More Billionaires ft. Zoro, Magic, Fine Baby, Gimme Ur Love, Salambala, and Lovinjitis.",
  alternates: { canonical: "/videos" },
  openGraph: {
    title: "Music Videos | Wiz Ofuasia (Wizboyy)",
    description:
      "Official music videos from Wiz Ofuasia (@wiz_ofuasia & @wizboyyVEVO).",
    url: "/videos",
  },
};

export default function VideosPage() {
  return <VideosSections />;
}
