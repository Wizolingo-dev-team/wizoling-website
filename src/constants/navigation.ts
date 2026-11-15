import type { FooterSection, NavLinkItem } from "@src/types/navigation";

export const NAV_LINKS: NavLinkItem[] = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/songs",
    label: "Songs",
  },
  {
    href: "/videos",
    label: "Videos",
  },
  {
    href: "/events",
    label: "Events",
  },
  {
    href: "/gallery",
    label: "Gallery",
  },
  {
    href: "/biography",
    label: "Biography",
  },
  {
    href: "/news",
    label: "News",
  },
  {
    href: "https://stan.store/Wiz_Ofuasi",
    label: "Store",
  },
];

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Explore",
    links: [
      { href: "/", label: "Home" },
      { href: "/songs", label: "Songs" },
      { href: "/videos", label: "Videos" },
      { href: "/events", label: "Events" },
    ],
  },
  {
    title: "Artist",
    links: [
      { href: "/gallery", label: "Gallery" },
      { href: "/biography", label: "Biography" },
      { href: "/news", label: "News" },
    ],
  },
];
