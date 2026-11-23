import type { Metadata } from "next";
import HomeSections from "@src/components/Sections/Home";

export const metadata: Metadata = {
  title: "Wiz Ofuasia (Wizboyy) — Official Website",
  description:
    "Welcome to the official website of Wiz Ofuasia (Wizboyy). Stream High Vibration, More Billionaires (feat. Zoro), watch official music videos, and explore live tour dates.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Wiz Ofuasia (Wizboyy) — Official Website",
    description:
      "Stream High Vibration and More Billionaires (feat. Zoro), watch official music videos, and view Wiz Ofuasia tour dates.",
    url: "/",
  },
};

export default function HomePage() {
  return <HomeSections />;
}
