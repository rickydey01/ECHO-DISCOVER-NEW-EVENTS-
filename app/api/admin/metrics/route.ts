import { NextResponse } from "next/server";
import { AdminService } from "../../../../server/services/adminService";

export async function GET() {
  try {
    const metrics = await AdminService.getExecutiveMetrics();
    return NextResponse.json({
      success: true,
      data: metrics,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch metrics", timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}
