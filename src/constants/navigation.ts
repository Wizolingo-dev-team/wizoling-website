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
    href: "/podcast",
    label: "Podcast",
  },
  {
    href: "/booking",
    label: "Booking",
  },
];

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Explore",
    links: [
      { href: "/", label: "Home" },
      { href: "/songs", label: "Songs" },
      { href: "/events", label: "Events" },
      { href: "/gallery", label: "Gallery" },
    ],
  },
  {
    title: "Artist",
    links: [
      { href: "/biography", label: "Biography" },
      { href: "/news", label: "News" },
      { href: "/podcast", label: "Podcast" },
      { href: "/booking", label: "Booking" },
    ],
  },
];

