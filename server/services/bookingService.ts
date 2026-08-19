import type { BookingOrderEntity } from "../db/schema";
import type { BookingCheckoutRequest } from "../types/server.types";

/**
 * Booking & Payment Checkout Service
 */
export class BookingService {
  /**
   * Process a ticket reservation order
   */
  static async createBooking(payload: BookingCheckoutRequest): Promise<BookingOrderEntity> {
    const timestamp = new Date().toISOString();
    const orderNumber = `ECHO-${Math.floor(100000 + Math.random() * 900000)}`;
    const ticketCode = `TK-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

    const order: BookingOrderEntity = {
      id: `ord_${Date.now()}`,
      orderNumber,
      userId: `usr_guest`,
      userEmail: payload.customerEmail,
      userName: payload.customerName,
      eventId: payload.eventId,
      eventTitle: payload.eventTitle,
      eventDate: "Upcoming Event",
      eventVenue: "Live Venue",
      tierName: payload.tier,
      quantity: payload.quantity,
      unitPrice: 899,
      discountApplied: payload.promoCode ? 150 : 0,
      platformFee: 49,
      totalPaid: 899 * payload.quantity + 49 - (payload.promoCode ? 150 : 0),
      paymentMethod: payload.paymentMethod,
      paymentStatus: "COMPLETED",
      ticketCode,
      qrPayload: `https://echo.live/pass/${ticketCode}`,
      claimedAt: timestamp,
    };

    return order;
  }
}
