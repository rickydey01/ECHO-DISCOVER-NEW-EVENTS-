import type { TelemetryMetricEntity, PromoDiscountEntity } from "../db/schema";
import { initialAdminMetrics, initialPromoCodes, initialInventoryStock } from "../../features/admin/admin.data";

/**
 * Admin Executive Service
 * Provides business telemetry, live inventory tracking (sold vs remaining), and CMS actions
 */
export class AdminService {
  /**
   * Fetch executive dashboard telemetry
   */
  static async getExecutiveMetrics(): Promise<TelemetryMetricEntity> {
    return initialAdminMetrics;
  }

  /**
   * Fetch live ticket inventory (capacity, sold, remaining)
   */
  static async getInventoryStatus() {
    return initialInventoryStock;
  }

  /**
   * Fetch active discount promo codes
   */
  static async getPromoCodes(): Promise<PromoDiscountEntity[]> {
    return initialPromoCodes;
  }
}
