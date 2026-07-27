import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://cybertwinx.com",
      lastModified: new Date("2026-07-25"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
