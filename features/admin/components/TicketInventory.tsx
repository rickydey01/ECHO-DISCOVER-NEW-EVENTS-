"use client";

import type { EventInventoryStatus } from "../admin.types";
import { formatCurrency, calculatePercentage } from "../../../utils/helpers";

interface TicketInventoryProps {
  inventory: EventInventoryStatus[];
}

export default function TicketInventory({ inventory }: TicketInventoryProps) {
  return (
    <div className="echo-admin-card">
      <div className="echo-admin-card-head">
        <div>
          <h3>LIVE TICKET INVENTORY & CAPACITY TRACKER</h3>
          <p style={{ fontSize: "12px", color: "var(--echo-muted)", marginTop: "2px" }}>
            Real-time breakdown of tickets sold vs tickets remaining across all active stages
          </p>
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table className="echo-inventory-table">
          <thead>
            <tr>
              <th>EVENT / STAGE</th>
              <th>VENUE & DATE</th>
              <th>CAPACITY</th>
              <th>SOLD</th>
              <th>REMAINING</th>
              <th>OCCUPANCY</th>
              <th>REVENUE</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => {
              const occupancy = calculatePercentage(item.totalSold, item.totalCapacity);
              return (
                <tr key={item.eventId}>
                  <td>
                    <strong>{item.eventTitle}</strong>
                    <div style={{ fontSize: "10px", color: "var(--echo-orange)" }}>{item.category}</div>
                  </td>
                  <td>
                    <div>{item.venue}</div>
                    <small style={{ color: "var(--echo-muted)" }}>{item.eventDate}</small>
                  </td>
                  <td>
                    <strong>{item.totalCapacity}</strong>
                  </td>
                  <td>
                    <span style={{ color: "var(--echo-orange)", fontWeight: 700 }}>{item.totalSold}</span>
                  </td>
                  <td>
                    <span style={{ color: "#4ade80", fontWeight: 700 }}>{item.totalRemaining}</span>
                  </td>
                  <td>
                    <div className="echo-inventory-progress-wrap">
                      <div className="echo-inventory-progress-bar">
                        <div
                          className="echo-inventory-progress-fill"
                          style={{ width: `${occupancy}%` }}
                        />
                      </div>
                      <span style={{ fontSize: "10px", color: "var(--echo-muted)" }}>{occupancy}% Filled</span>
                    </div>
                  </td>
                  <td>
                    <strong>{formatCurrency(item.totalRevenue)}</strong>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
