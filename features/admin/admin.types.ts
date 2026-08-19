import type { TelemetryMetricEntity, PromoDiscountEntity } from "../../server/db/schema";

export type AdminTab =
  | "OVERVIEW"
  | "INVENTORY"
  | "HERO_CMS"
  | "PASSES_CMS"
  | "FEATURED_CMS"
  | "CATEGORIES_CMS"
  | "GALLERY_CMS"
  | "DISCOUNTS";

export interface TierInventoryItem {
  tierName: "GA" | "VIP" | "BACKSTAGE" | string;
  totalCapacity: number;
  ticketsSold: number;
  ticketsRemaining: number;
  price: number;
  revenueGenerated: number;
}

export interface EventInventoryStatus {
  eventId: string | number;
  eventTitle: string;
  category: string;
  eventDate: string;
  venue: string;
  totalCapacity: number;
  totalSold: number;
  totalRemaining: number;
  totalRevenue: number;
  tiers: TierInventoryItem[];
}
