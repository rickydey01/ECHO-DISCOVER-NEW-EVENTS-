import { NextResponse } from "next/server";
import { EventService } from "../../../server/services/eventService";

export const dynamic = "force-static";

export async function GET() {
  try {
    const heroEvents = await EventService.getHeroEvents();
    const featured = await EventService.getFeaturedEvents();
    const passes = await EventService.getUpcomingPassEvents();

    return NextResponse.json({
      success: true,
      data: {
        hero: heroEvents,
        featured,
        passes,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch events",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
