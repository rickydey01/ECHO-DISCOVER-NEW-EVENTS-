"use client";

import { useState } from "react";
import { Save, Check } from "lucide-react";
import { featuredEventsData } from "../../featuredEvents/featuredEvents.data";
import type { FeaturedEvent } from "../../featuredEvents/featuredEvents.types";

export default function FeaturedEditor() {
  const [events, setEvents] = useState<FeaturedEvent[]>(featuredEventsData);
  const [selectedId, setSelectedId] = useState<number>(events[0]?.id || 1);
  const [isSaved, setIsSaved] = useState(false);

  const current = events.find((e) => e.id === selectedId) || events[0];

  const handleUpdate = (field: keyof FeaturedEvent, value: any) => {
    setEvents((prev) =>
      prev.map((item) => (item.id === selectedId ? { ...item, [field]: value } : item))
    );
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
          <h3>FEATURED HEADLINERS CMS</h3>
          <p style={{ fontSize: "12px", color: "var(--echo-muted)" }}>
            Manage accordion headline cards, artist lineup tags & venue info
          </p>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          {events.map((e) => (
            <button
              key={e.id}
              type="button"
              className={`echo-pass-tab-btn ${selectedId === e.id ? "is-active" : ""}`}
              onClick={() => setSelectedId(e.id)}
            >
              0{e.id} {e.title}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSave} className="echo-cms-form">
        <div className="echo-cms-row-2">
          <div className="echo-cms-field">
            <label>HEADLINER TITLE</label>
            <input
              type="text"
              value={current.title}
              onChange={(e) => handleUpdate("title", e.target.value)}
              className="echo-cms-input"
            />
          </div>

          <div className="echo-cms-field">
            <label>GENRE / CATEGORY</label>
            <input
              type="text"
              value={current.category}
              onChange={(e) => handleUpdate("category", e.target.value)}
              className="echo-cms-input"
            />
          </div>
        </div>

        <div className="echo-cms-row-3">
          <div className="echo-cms-field">
            <label>DATE</label>
            <input
              type="text"
              value={current.date}
              onChange={(e) => handleUpdate("date", e.target.value)}
              className="echo-cms-input"
            />
          </div>

          <div className="echo-cms-field">
            <label>PRICE STRING</label>
            <input
              type="text"
              value={current.price}
              onChange={(e) => handleUpdate("price", e.target.value)}
              className="echo-cms-input"
            />
          </div>

          <div className="echo-cms-field">
            <label>LOCATION</label>
            <input
              type="text"
              value={current.location}
              onChange={(e) => handleUpdate("location", e.target.value)}
              className="echo-cms-input"
            />
          </div>
        </div>

        <div className="echo-cms-field">
          <label>ARTIST LINEUP (COMMA SEPARATED)</label>
          <input
            type="text"
            value={current.lineup.join(", ")}
            onChange={(e) =>
              handleUpdate(
                "lineup",
                e.target.value.split(",").map((s) => s.trim())
              )
            }
            className="echo-cms-input"
          />
        </div>

        <div className="echo-cms-field">
          <label>DESCRIPTION</label>
          <textarea
            value={current.description}
            onChange={(e) => handleUpdate("description", e.target.value)}
            className="echo-cms-textarea"
          />
        </div>

        <button type="submit" className="echo-cms-save-btn">
          {isSaved ? <Check size={16} /> : <Save size={16} />}
          <span>{isSaved ? "HEADLINER SAVED!" : "SAVE HEADLINER"}</span>
        </button>
      </form>
    </div>
  );
}
