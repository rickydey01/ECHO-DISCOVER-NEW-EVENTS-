const isProd = process.env.NODE_ENV === "production";
export const BASE_PATH = isProd ? "/ECHO-DISCOVER-NEW-EVENTS-" : "";

/**
 * Prepends the GitHub Pages repository base path to static asset paths in production.
 * In development, returns the standard clean root-relative path (e.g. "/images/hero/hero1.webp").
 * Safe against external URLs, data URLs, and already-prefixed paths.
 */
export function assetUrl(path: string): string {
  if (!path) return path;
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:") ||
    path.startsWith("blob:")
  ) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (!BASE_PATH) {
    return cleanPath;
  }
  if (cleanPath.startsWith(BASE_PATH)) {
    return cleanPath;
  }
  return `${BASE_PATH}${cleanPath}`;
}
