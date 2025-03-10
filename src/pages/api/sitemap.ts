import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const baseUrl = "https://paulskenes.com";
  console.log("Generating sitemap...");
  // Dynamically find all pages inside "pages" directory
  const pageFiles = [
    "index.tsx",
    "about.tsx",
    "contact.tsx",
    "game-schedule.tsx",
  ]

  const pages = pageFiles.map((file) => ({
    loc: `/${file.replace(".tsx", "") === "index" ? "" : file.replace(".tsx", "")}`,
    lastmod: new Date().toISOString().split("T")[0],
    priority: file === "index.tsx" ? 1.0 : 0.8,
  }));

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages
      .map(
        (page) => `
      <url>
        <loc>${baseUrl}${page.loc}</loc>
        <lastmod>${page.lastmod}</lastmod>
        <priority>${page.priority}</priority>
      </url>`
      )
      .join("")}
  </urlset>`;

  res.setHeader("Content-Type", "application/xml");
  res.status(200).send(sitemap);
}