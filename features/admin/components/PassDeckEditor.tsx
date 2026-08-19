"use client";

import { useState } from "react";
import { Save, Check } from "lucide-react";
import { upcomingEventsData } from "../../upcomingEvents/upcomingEvents.data";
import type { UpcomingPassEvent } from "../../upcomingEvents/upcomingEvents.data";

export default function PassDeckEditor() {
  const [passes, setPasses] = useState<UpcomingPassEvent[]>(upcomingEventsData);
  const [selectedId, setSelectedId] = useState<string>(passes[0]?.id || "upcoming-01");
  const [isSaved, setIsSaved] = useState(false);

  const currentPass = passes.find((p) => p.id === selectedId) || passes[0];

  const handleUpdateField = (field: keyof UpcomingPassEvent, value: any) => {
    setPasses((prev) =>
      prev.map((item) => (item.id === selectedId ? { ...item, [field]: value } : item))
    );
  };

  const handleTierPriceUpdate = (tierIndex: number, newPrice: number) => {
    const updatedTiers = [...currentPass.tiers];
    updatedTiers[tierIndex] = { ...updatedTiers[tierIndex], price: newPrice };
    handleUpdateField("tiers", updatedTiers);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="echo-admin-card">
      <div className="echo-admin-card-head">
        <div>
          <h3>3D TICKET PASS DECK CMS</h3>
          <p style={{ fontSize: "12px", color: "var(--echo-muted)" }}>
            Configure 3D passes, serial numbers, date/doors, tier pricing & venue coordinates
          </p>
        </div>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {passes.map((p, idx) => (
            <button
              key={p.id}
              type="button"
              className={`echo-pass-tab-btn ${selectedId === p.id ? "is-active" : ""}`}
              onClick={() => setSelectedId(p.id)}
            >
              0{idx + 1} {p.title}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSave} className="echo-cms-form">
        <div className="echo-cms-row-2">
          <div className="echo-cms-field">
            <label>EVENT TITLE</label>
            <input
              type="text"
              value={currentPass.title}
              onChange={(e) => handleUpdateField("title", e.target.value)}
              className="echo-cms-input"
            />
          </div>

          <div className="echo-cms-field">
            <label>SERIAL IDENTIFIER</label>
            <input
              type="text"
              value={currentPass.serialNumber}
              onChange={(e) => handleUpdateField("serialNumber", e.target.value)}
              className="echo-cms-input"
            />
          </div>
        </div>

        <div className="echo-cms-row-3">
          <div className="echo-cms-field">
            <label>DATE (E.G. 24 AUG 2026)</label>
            <input
              type="text"
              value={currentPass.date}
              onChange={(e) => handleUpdateField("date", e.target.value)}
              className="echo-cms-input"
            />
          </div>

          <div className="echo-cms-field">
            <label>TIME WINDOW</label>
            <input
              type="text"
              value={currentPass.time}
              onChange={(e) => handleUpdateField("time", e.target.value)}
              className="echo-cms-input"
            />
          </div>

          <div className="echo-cms-field">
            <label>VENUE LOCATION</label>
            <input
              type="text"
              value={currentPass.location}
              onChange={(e) => handleUpdateField("location", e.target.value)}
              className="echo-cms-input"
            />
          </div>
        </div>

        {/* Tier Pricing Editors */}
        <div style={{ padding: "16px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--echo-orange)", display: "block", marginBottom: "12px" }}>
            PASS TIER PRICING CONFIGURATION
          </label>
          <div className="echo-cms-row-3">
            {currentPass.tiers.map((tier, tIdx) => (
              <div key={tier.name} className="echo-cms-field">
                <label>{tier.name} PRICE (₹)</label>
                <input
                  type="number"
                  value={tier.price}
                  onChange={(e) => handleTierPriceUpdate(tIdx, parseInt(e.target.value) || 0)}
                  className="echo-cms-input"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="echo-cms-field">
          <label>EVENT DESCRIPTION</label>
          <textarea
            value={currentPass.description}
            onChange={(e) => handleUpdateField("description", e.target.value)}
            className="echo-cms-textarea"
          />
        </div>

        <button type="submit" className="echo-cms-save-btn">
          {isSaved ? <Check size={16} /> : <Save size={16} />}
          <span>{isSaved ? "PASS CONFIGURATION SAVED!" : "SAVE PASS DECK"}</span>
        </button>
      </form>
    </div>
  );
}
