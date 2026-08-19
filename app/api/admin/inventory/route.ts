import { NextResponse } from "next/server";
import { AdminService } from "../../../../server/services/adminService";

export const dynamic = "force-static";

export async function GET() {
  try {
    const inventory = await AdminService.getInventoryStatus();
    return NextResponse.json({
      success: true,
      data: inventory,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch inventory", timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}
