import { NextResponse } from "next/server";
import { BookingService } from "../../../server/services/bookingService";
import type { BookingCheckoutRequest } from "../../../server/types/server.types";

export async function POST(req: Request) {
  try {
    const body: BookingCheckoutRequest = await req.json();

    if (!body.eventId || !body.tier || !body.customerEmail) {
      return NextResponse.json(
        { success: false, error: "Missing required booking details", timestamp: new Date().toISOString() },
        { status: 400 }
      );
    }

    const order = await BookingService.createBooking(body);

    return NextResponse.json({
      success: true,
      data: order,
      message: "Ticket reserved successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Checkout error occurred", timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}
