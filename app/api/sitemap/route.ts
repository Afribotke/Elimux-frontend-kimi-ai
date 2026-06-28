import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://elimux.ke";

  const routes = [
    "", "discover", "institutions", "programs", "about", "contact", "privacy", "terms"
  ];

  const urlEntries = routes.map((route) => {
    const loc = route === "" ? baseUrl : ${baseUrl}/;
    const lastmod = new Date().toISOString().split("T")[0];
    const priority = route === "" ? "1.0" : "0.8";
    return   <url>
    <loc></loc>
    <lastmod></lastmod>
    <changefreq>weekly</changefreq>
    <priority></priority>
  </url>;
  }).join("\n");

  const sitemap = <?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

</urlset>;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
