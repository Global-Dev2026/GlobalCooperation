import { MetadataRoute } from "next";
import { COMPANIES } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://globalsoftsl.com";

    // Base routes
    const routes = ["", "/careers"].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1 : 0.8,
    }));

    // Dynamic company routes
    const companyRoutes = COMPANIES.map((company) => ({
        url: `${baseUrl}/companies/${company.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    return [...routes, ...companyRoutes];
}
