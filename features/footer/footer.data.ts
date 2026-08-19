import type { HubItem, FooterLink } from "./footer.types";

export const activeHubsData: HubItem[] = [
  { city: "GUWAHATI", tag: "MAIN HUB", venues: "Arena · Dome · Skyline" },
  { city: "SHILLONG", tag: "CLOUD 9", venues: "Pine View · Secret Vault" },
  { city: "JORHAT", tag: "VALLEY", venues: "Velvet Loft · Old Mill" },
  { city: "DIBRUGARH", tag: "UPPER ASSAM", venues: "Pulse Warehouse · Pavilion" },
];

export const footerLinksData: FooterLink[] = [
  { label: "Home", href: "#home" },
  { label: "Featured", href: "#featured-events" },
  { label: "Discover", href: "#categories" },
  { label: "Passes", href: "#upcoming-events" },
  { label: "Archive", href: "#gallery" },
  { label: "Manifesto", href: "#about" },
];
