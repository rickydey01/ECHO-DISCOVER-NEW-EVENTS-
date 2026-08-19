"use client";

import { DollarSign, Ticket, Users, TrendingUp, Sparkles, Activity } from "lucide-react";
import type { TelemetryMetricEntity } from "../../../server/db/schema";
import { formatCurrency } from "../../../utils/helpers";

interface LiveStatsOverviewProps {
  metrics: TelemetryMetricEntity;
}

export default function LiveStatsOverview({ metrics }: LiveStatsOverviewProps) {
  return (
    <div>
      {/* 4 KPI Grid Cards */}
      <div className="echo-admin-stats-grid">
        {/* Total Revenue */}
        <div className="echo-admin-stat-card">
          <div className="echo-admin-stat-card__head">
            <span>TOTAL REVENUE</span>
            <DollarSign size={16} className="echo-text-orange" />
          </div>
          <div className="echo-admin-stat-val is-orange">
            {formatCurrency(metrics.totalRevenue)}
          </div>
          <div className="echo-admin-stat-change">
            <TrendingUp size={13} />
            <span>+24.6% vs last week</span>
          </div>
        </div>

        {/* Tickets Sold */}
        <div className="echo-admin-stat-card">
          <div className="echo-admin-stat-card__head">
            <span>TICKETS SOLD</span>
            <Ticket size={16} className="echo-text-orange" />
          </div>
          <div className="echo-admin-stat-val">
            {metrics.totalTicketsSold.toLocaleString()}
          </div>
          <div className="echo-admin-stat-change">
            <span>{metrics.salesVelocityPerHour} passes/hour velocity</span>
          </div>
        </div>

        {/* Tickets Remaining */}
        <div className="echo-admin-stat-card">
          <div className="echo-admin-stat-card__head">
            <span>TICKETS REMAINING</span>
            <Activity size={16} className="echo-text-orange" />
          </div>
          <div className="echo-admin-stat-val is-green">
            {metrics.totalTicketsRemaining.toLocaleString()}
          </div>
          <div style={{ fontSize: "11px", color: "var(--echo-muted)" }}>
            Across {metrics.totalEventsActive} active events
          </div>
        </div>

        {/* Live Active Visitors */}
        <div className="echo-admin-stat-card">
          <div className="echo-admin-stat-card__head">
            <span>LIVE VISITORS NOW</span>
            <Users size={16} className="echo-text-orange" />
          </div>
          <div className="echo-admin-stat-val">
            {metrics.liveVisitorsNow}
          </div>
          <div className="echo-admin-stat-change">
            <Sparkles size={13} />
            <span>{metrics.dailyConversionRate}% checkout conversion</span>
          </div>
        </div>
      </div>

      {/* Revenue Breakdown by Pass Tier */}
      <div className="echo-admin-card">
        <div className="echo-admin-card-head">
          <h3>REVENUE BREAKDOWN BY PASS TIER</h3>
          <span style={{ fontSize: "12px", color: "var(--echo-muted)" }}>Real-time Gateway Sync</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          <div style={{ padding: "16px", borderRadius: "12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <small style={{ fontSize: "10px", color: "var(--echo-muted)" }}>GENERAL ADMISSION (GA)</small>
            <h4 style={{ fontSize: "20px", fontFamily: "var(--font-display)", color: "var(--echo-white)", margin: "4px 0" }}>
              {formatCurrency(metrics.revenueByTier.GA)}
            </h4>
            <div style={{ fontSize: "11px", color: "var(--echo-muted)" }}>49.3% of total revenue</div>
          </div>

          <div style={{ padding: "16px", borderRadius: "12px", background: "rgba(255,107,53,0.08)", border: "1px solid rgba(255,107,53,0.2)" }}>
            <small style={{ fontSize: "10px", color: "var(--echo-orange)" }}>VIP MEZZANINE</small>
            <h4 style={{ fontSize: "20px", fontFamily: "var(--font-display)", color: "var(--echo-orange)", margin: "4px 0" }}>
              {formatCurrency(metrics.revenueByTier.VIP)}
            </h4>
            <div style={{ fontSize: "11px", color: "var(--echo-muted)" }}>34.0% of total revenue</div>
          </div>

          <div style={{ padding: "16px", borderRadius: "12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <small style={{ fontSize: "10px", color: "var(--echo-muted)" }}>ALL-ACCESS BACKSTAGE</small>
            <h4 style={{ fontSize: "20px", fontFamily: "var(--font-display)", color: "var(--echo-white)", margin: "4px 0" }}>
              {formatCurrency(metrics.revenueByTier.BACKSTAGE)}
            </h4>
            <div style={{ fontSize: "11px", color: "var(--echo-muted)" }}>16.7% of total revenue</div>
          </div>
        </div>
      </div>
    </div>
  );
}
