import type { PageBackgroundOverlayProps } from "@src/components/PageBackgroundOverlay";

export const DEFAULT_PAGE_BACKGROUND: PageBackgroundOverlayProps = {
  imageSrc: "/images/gallery/wizolingo1.jpg",
  position: "center 18%",
  grayscale: true,
};

// Routes that use their own background (video or solid) instead of static image overlay
export const NO_IMAGE_OVERLAY_ROUTES = ["/videos", "/biography"];

// Commerce & Authentication routes that use a clean white background with no image overlay
export const WHITE_BACKGROUND_PREFIXES = [
  "/shop",
  "/cart",
  "/checkout",
  "/login",
  "/register",
  "/verify-email",
  "/forgot-password",
  "/reset-password",
];

export function isWhiteBackgroundRoute(pathname: string): boolean {
  return WHITE_BACKGROUND_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export const PAGE_BACKGROUNDS: Record<string, PageBackgroundOverlayProps> = {
  "/": {
    imageSrc: "/images/gallery/wizolingo1.jpg",
    position: "center 18%",
    grayscale: true,
  },
  "/songs": {
    imageSrc: "/images/gallery/wiz_event-scaled.jpg",
    position: "center 36%",
    grayscale: true,
  },
  "/events": {
    imageSrc: "/images/gallery/wizolingo4.jpg",
    position: "center 20%",
    grayscale: true,
  },
  "/gallery": {
    imageSrc: "/images/gallery/wizolingo1.jpg",
    position: "center 18%",
    grayscale: true,
  },
  "/news": {
    imageSrc: "/images/gallery/wiz-ofuasia-web.jpg",
    position: "center 20%",
    grayscale: true,
  },
};

export function getPageBackground(
  pathname: string
): PageBackgroundOverlayProps | null {
  if (
    NO_IMAGE_OVERLAY_ROUTES.includes(pathname) ||
    isWhiteBackgroundRoute(pathname)
  ) {
    return null;
  }
  if (pathname.startsWith("/news")) {
    return PAGE_BACKGROUNDS["/news"] ?? DEFAULT_PAGE_BACKGROUND;
  }
  if (pathname.startsWith("/events")) {
    return PAGE_BACKGROUNDS["/events"] ?? DEFAULT_PAGE_BACKGROUND;
  }
  return PAGE_BACKGROUNDS[pathname] ?? DEFAULT_PAGE_BACKGROUND;
}
