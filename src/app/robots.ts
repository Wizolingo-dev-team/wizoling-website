import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://www.wizofuasia.com/sitemap.xml",
    host: "https://www.wizofuasia.com",
  };
}

