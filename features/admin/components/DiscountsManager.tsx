"use client";

import { useState } from "react";
import { Plus, Trash2, Tag, Check, Sparkles } from "lucide-react";
import { initialPromoCodes } from "../admin.data";
import type { PromoDiscountEntity } from "../../../server/db/schema";

export default function DiscountsManager() {
  const [promos, setPromos] = useState<PromoDiscountEntity[]>(initialPromoCodes);
  const [newCode, setNewCode] = useState("");
  const [newPercentage, setNewPercentage] = useState(15);
  const [newMax, setNewMax] = useState(250);
  const [isCreated, setIsCreated] = useState(false);

  const handleAddCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode) return;

    const newItem: PromoDiscountEntity = {
      id: `p-${Date.now()}`,
      code: newCode.toUpperCase(),
      discountPercentage: newPercentage,
      maxDiscountAmount: newMax,
      applicableTiers: ["GA", "VIP"],
      expiresAt: "2026-12-31",
      usageCount: 0,
      usageLimit: 500,
      isActive: true,
    };

    setPromos([newItem, ...promos]);
    setNewCode("");
    setIsCreated(true);
    setTimeout(() => setIsCreated(false), 2000);
  };

  const handleToggleActive = (id: string) => {
    setPromos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    );
  };

  const handleDelete = (id: string) => {
    setPromos((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="echo-admin-card">
      <div className="echo-admin-card-head">
        <div>
          <h3>DISCOUNTS & PROMO CODES ENGINE</h3>
          <p style={{ fontSize: "12px", color: "var(--echo-muted)" }}>
            Generate flash sales, percentage discounts & customer promo vouchers
          </p>
        </div>
      </div>

      {/* Creation Form */}
      <form onSubmit={handleAddCode} style={{ marginBottom: "28px", padding: "18px", borderRadius: "14px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--echo-orange)", marginBottom: "12px" }}>
          CREATE NEW PROMO CODE
        </div>
        <div className="echo-cms-row-3">
          <div className="echo-cms-field">
            <label>CODE STRING</label>
            <input
              type="text"
              placeholder="E.G. FESTIVAL30"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              className="echo-cms-input"
              required
            />
          </div>

          <div className="echo-cms-field">
            <label>DISCOUNT PERCENTAGE (%)</label>
            <input
              type="number"
              value={newPercentage}
              onChange={(e) => setNewPercentage(parseInt(e.target.value) || 0)}
              className="echo-cms-input"
              min={1}
              max={90}
            />
          </div>

          <div className="echo-cms-field">
            <label>MAX DISCOUNT CAP (₹)</label>
            <input
              type="number"
              value={newMax}
              onChange={(e) => setNewMax(parseInt(e.target.value) || 0)}
              className="echo-cms-input"
            />
          </div>
        </div>

        <button type="submit" className="echo-cms-save-btn" style={{ marginTop: "14px" }}>
          <Plus size={16} />
          <span>{isCreated ? "CODE ACTIVATED!" : "ISSUE PROMO CODE"}</span>
        </button>
      </form>

      {/* Promo Codes Table */}
      <div style={{ overflowX: "auto" }}>
        <table className="echo-inventory-table">
          <thead>
            <tr>
              <th>PROMO CODE</th>
              <th>DISCOUNT</th>
              <th>MAX CAP</th>
              <th>TIERS</th>
              <th>REDEMPTIONS</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {promos.map((item) => (
              <tr key={item.id}>
                <td>
                  <strong style={{ fontFamily: "var(--font-mono)", color: "var(--echo-orange)" }}>
                    {item.code}
                  </strong>
                </td>
                <td>
                  <strong>{item.discountPercentage}% OFF</strong>
                </td>
                <td>
                  <span>₹{item.maxDiscountAmount}</span>
                </td>
                <td>
                  <span style={{ fontSize: "11px", color: "var(--echo-muted)" }}>
                    {item.applicableTiers.join(", ")}
                  </span>
                </td>
                <td>
                  <span>{item.usageCount} / {item.usageLimit}</span>
                </td>
                <td>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      padding: "3px 8px",
                      borderRadius: "999px",
                      background: item.isActive ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.08)",
                      color: item.isActive ? "#4ade80" : "var(--echo-muted)",
                    }}
                  >
                    {item.isActive ? "ACTIVE" : "PAUSED"}
                  </span>
                </td>
                <td>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      type="button"
                      onClick={() => handleToggleActive(item.id)}
                      style={{ background: "none", border: "none", color: "var(--echo-muted)", cursor: "pointer", fontSize: "11px" }}
                    >
                      {item.isActive ? "Pause" : "Resume"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer" }}
                      aria-label="Delete code"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
