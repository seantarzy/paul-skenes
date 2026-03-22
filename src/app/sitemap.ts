import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://paulskenes.com";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/stats`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/merch`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/games`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/game-schedule`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
  ];
}
