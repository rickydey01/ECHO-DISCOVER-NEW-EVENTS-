/**
 * ECHO — Universal Database Entity Schema Definitions
 * Architected for PostgreSQL / Supabase / Prisma ORM / MongoDB
 */

export interface PassTierEntity {
  id: string;
  name: "GA" | "VIP" | "BACKSTAGE" | string;
  price: number;
  perks: string[];
  totalCapacity: number;
  ticketsSold: number;
  ticketsRemaining: number;
  isSoldOut: boolean;
}

export interface EventEntity {
  id: number | string;
  slug: string;
  title: string;
  category: "FESTIVAL" | "CLUB NIGHT" | "TECHNO & WAREHOUSE" | "AMBIENT" | string;
  tagline: string;
  description: string;
  date: string;
  fullDate: string;
  day: string;
  time: string;
  venue: string;
  city: string;
  location: string;
  coordinates: string;
  price: string;
  basePrice: number;
  image: string;
  label: string;
  status: "live" | "selling_fast" | "sold_out" | "upcoming";
  soundPreviewName?: string;
  soundPreviewUrl?: string;
  ageRestriction: string;
  serialNumber: string;
  tiers: PassTierEntity[];
  createdAt: string;
  updatedAt: string;
}

export interface UserEntity {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string;
  vipTier: "STANDARD" | "VIP_GOLD" | "BLACK_DIAMOND" | "FOUNDER";
  walletBalance: number;
  loyaltyPoints: number;
  memberSince: string;
  phone?: string;
  passesCount: number;
}

export interface BookingOrderEntity {
  id: string;
  orderNumber: string;
  userId: string;
  userEmail: string;
  userName: string;
  eventId: string | number;
  eventTitle: string;
  eventDate: string;
  eventVenue: string;
  tierName: string;
  quantity: number;
  unitPrice: number;
  discountApplied: number;
  platformFee: number;
  totalPaid: number;
  paymentMethod: "UPI" | "CARD" | "CRYPTO" | "APPLE_PAY";
  paymentStatus: "COMPLETED" | "PENDING" | "FAILED";
  ticketCode: string;
  qrPayload: string;
  claimedAt: string;
}

export interface CategoryEntity {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  eventCount: number;
  featuredMedia: string;
  events: EventEntity[];
}

export interface PromoDiscountEntity {
  id: string;
  code: string;
  discountPercentage: number;
  maxDiscountAmount?: number;
  applicableTiers: string[];
  expiresAt: string;
  usageCount: number;
  usageLimit: number;
  isActive: boolean;
}

export interface TelemetryMetricEntity {
  totalRevenue: number;
  totalTicketsSold: number;
  totalTicketsRemaining: number;
  totalEventsActive: number;
  liveVisitorsNow: number;
  dailyConversionRate: number;
  salesVelocityPerHour: number;
  revenueByTier: {
    GA: number;
    VIP: number;
    BACKSTAGE: number;
  };
}
