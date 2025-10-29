import { albums } from "../../data/albums";

export default function handler(req, res) {
  const baseUrl = "https://chamodjayasundaraphotography.com"; // Update with your actual domain

  // Static pages
  const staticPages = [
    { url: "", changefreq: "daily", priority: 1.0 },
    { url: "/about", changefreq: "monthly", priority: 0.8 },
    { url: "/projects", changefreq: "weekly", priority: 0.9 },
    { url: "/contact", changefreq: "monthly", priority: 0.7 },
    { url: "/quote", changefreq: "monthly", priority: 0.7 },
  ];

  // Category pages
  const categories = ["architecture", "product", "food", "lifestyle", "travel"];
  const categoryPages = categories.map((cat) => ({
    url: `/categories/${cat}`,
    changefreq: "weekly",
    priority: 0.8,
  }));

  // Album pages
  const albumPages = albums.map((album) => ({
    url: `/projects/${album.slug}`,
    changefreq: "monthly",
    priority: 0.6,
  }));

  // Combine all pages
  const allPages = [...staticPages, ...categoryPages, ...albumPages];

  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();
}
