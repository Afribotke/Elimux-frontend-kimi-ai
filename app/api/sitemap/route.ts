import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://elimux.ke";

  const routes = [
    "", "discover", "institutions", "programs", "about", "contact", "privacy", "terms"
  ];

  let urlEntries = "";
  for (const route of routes) {
    const loc = route === "" ? baseUrl : baseUrl + "/" + route;
    const lastmod = new Date().toISOString().split("T")[0];
    const priority = route === "" ? "1.0" : "0.8";
    urlEntries += "  <url>" + "\n";
    urlEntries += "    <loc>" + loc + "</loc>" + "\n";
    urlEntries += "    <lastmod>" + lastmod + "</lastmod>" + "\n";
    urlEntries += "    <changefreq>weekly</changefreq>" + "\n";
    urlEntries += "    <priority>" + priority + "</priority>" + "\n";
    urlEntries += "  </url>" + "\n";
  }

  const sitemap = "<?xml version=""1.0"" encoding=""UTF-8""?>" + "\n" +
    "<urlset xmlns=""http://www.sitemaps.org/schemas/sitemap/0.9"">" + "\n" +
    urlEntries +
    "</urlset>";

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

