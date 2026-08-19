/**
 * Server & API Response Type Contracts
 */

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface BookingCheckoutRequest {
  eventId: string | number;
  eventTitle: string;
  tier: "GA" | "VIP" | "BACKSTAGE" | string;
  quantity: number;
  customerName: string;
  customerEmail: string;
  promoCode?: string;
  paymentMethod: "UPI" | "CARD" | "CRYPTO" | "APPLE_PAY";
}

export interface CreateEventRequest {
  title: string;
  category: string;
  tagline: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  basePrice: number;
  image: string;
  tiers: {
    name: string;
    price: number;
    totalCapacity: number;
  }[];
}
