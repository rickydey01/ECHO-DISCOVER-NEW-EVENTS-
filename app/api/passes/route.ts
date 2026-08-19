import { NextResponse } from "next/server";
import { EventService } from "../../../server/services/eventService";

export async function GET() {
  try {
    const passes = await EventService.getUpcomingPassEvents();
    return NextResponse.json({
      success: true,
      data: passes,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch pass deck",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
