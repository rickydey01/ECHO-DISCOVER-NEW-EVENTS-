import { NextResponse } from "next/server";
import { AdminService } from "../../../../server/services/adminService";

export async function GET() {
  try {
    const promos = await AdminService.getPromoCodes();
    return NextResponse.json({
      success: true,
      data: promos,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch promo codes", timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}
