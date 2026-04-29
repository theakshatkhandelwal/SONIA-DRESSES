import { getSiteUrl } from "@/lib/siteUrl";

export default function sitemap() {
  const base = getSiteUrl();
  const lastModified = new Date();

  const staticPaths = [
    "",
    "/category/Women",
    "/category/Men",
    "/category/Kids",
    "/cart",
    "/checkout",
    "/size-guide",
    "/contact",
    "/policies/returns",
    "/policies/privacy",
    "/policies/terms",
    "/policies/delivery",
  ];

  return staticPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "daily",
    priority: path === "" ? 1 : 0.8,
  }));
}
