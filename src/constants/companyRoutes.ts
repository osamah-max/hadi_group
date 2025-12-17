/**
 * Single source of truth for company routes
 * All company navigation must use these paths exactly as defined
 */
export const companyRoutes: Record<string, string> = {
  alzab: "/companies/alzab",
  gayath: "/companies/gayath",
  hadi_cap: "/companies/hadi_cap",
  hamdi: "/companies/hamdi",
  hima: "/companies/hima",
  sina: "/companies/sina",
};

/**
 * Helper to get company route by slug
 */
export function getCompanyRoute(slug: string): string {
  return companyRoutes[slug] || "/";
}

/**
 * Helper to extract slug from company path
 */
export function getCompanySlug(path: string): string | null {
  const match = path.match(/\/companies\/(.+)/);
  return match ? match[1] : null;
}
