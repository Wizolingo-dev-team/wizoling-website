import type { PageBackgroundOverlayProps } from "@src/components/PageBackgroundOverlay";

export const DEFAULT_PAGE_BACKGROUND: PageBackgroundOverlayProps = {
  imageSrc: "/images/wizolingo1.JPG",
  position: "center 18%",
  grayscale: true,
};

// Routes that use their own video background instead of static image overlay
export const NO_IMAGE_OVERLAY_ROUTES = ["/videos"];

export const PAGE_BACKGROUNDS: Record<string, PageBackgroundOverlayProps> = {
  "/": {
    imageSrc: "/images/wizolingo1.JPG",
    position: "center 18%",
    grayscale: true,
  },
  "/songs": {
    imageSrc: "/images/wiz_event-scaled.png",
    position: "center 36%",
    grayscale: true,
  },
  "/events": {
    imageSrc: "/images/wizolingo4.JPG",
    position: "center 20%",
    grayscale: true,
  },
  "/gallery": {
    imageSrc: "/images/wizolingo1.JPG",
    position: "center 18%",
    grayscale: true,
  },
  "/biography": {
    imageSrc: "/images/wizolingo1.JPG",
    position: "center 18%",
    grayscale: true,
  },
  "/news": {
    imageSrc: "/images/wizolingo1.JPG",
    position: "center 18%",
    grayscale: true,
  },
};

export function getPageBackground(
  pathname: string
): PageBackgroundOverlayProps | null {
  if (NO_IMAGE_OVERLAY_ROUTES.includes(pathname)) {
    return null;
  }
  return PAGE_BACKGROUNDS[pathname] ?? DEFAULT_PAGE_BACKGROUND;
}
