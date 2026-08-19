"use client";

import { useState } from "react";
import { Save, Check, Sparkles } from "lucide-react";
import { heroEventsData } from "../../hero/hero.data";
import type { HeroEvent } from "../../hero/hero.types";

export default function HeroEditor() {
  const [events, setEvents] = useState<HeroEvent[]>(heroEventsData);
  const [selectedId, setSelectedId] = useState<number>(events[0]?.id || 1);
  const [isSaved, setIsSaved] = useState(false);

  const currentEvent = events.find((e) => e.id === selectedId) || events[0];

  const handleChange = (field: keyof HeroEvent, value: string | number) => {
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
          <h3>HOME HERO STAGE CMS</h3>
          <p style={{ fontSize: "12px", color: "var(--echo-muted)" }}>
            Edit main headliner headline, date, time, pricing, sound preview name & artwork
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
              Slide 0{e.id}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSave} className="echo-cms-form">
        <div className="echo-cms-row-2">
          <div className="echo-cms-field">
            <label>EVENT HEADLINE TITLE</label>
            <input
              type="text"
              value={currentEvent.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="echo-cms-input"
            />
          </div>

          <div className="echo-cms-field">
            <label>CATEGORY / GENRE BADGE</label>
            <input
              type="text"
              value={currentEvent.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="echo-cms-input"
            />
          </div>
        </div>

        <div className="echo-cms-row-3">
          <div className="echo-cms-field">
            <label>DISPLAY DATE (E.G. OCT 24)</label>
            <input
              type="text"
              value={currentEvent.date}
              onChange={(e) => handleChange("date", e.target.value)}
              className="echo-cms-input"
            />
          </div>

          <div className="echo-cms-field">
            <label>TIME WINDOW</label>
            <input
              type="text"
              value={currentEvent.time}
              onChange={(e) => handleChange("time", e.target.value)}
              className="echo-cms-input"
            />
          </div>

          <div className="echo-cms-field">
            <label>BASE PASS PRICE (E.G. ₹899)</label>
            <input
              type="text"
              value={currentEvent.price}
              onChange={(e) => handleChange("price", e.target.value)}
              className="echo-cms-input"
            />
          </div>
        </div>

        <div className="echo-cms-row-2">
          <div className="echo-cms-field">
            <label>VENUE & CITY</label>
            <input
              type="text"
              value={`${currentEvent.venue}, ${currentEvent.city}`}
              onChange={(e) => handleChange("venue", e.target.value)}
              className="echo-cms-input"
            />
          </div>

          <div className="echo-cms-field">
            <label>MUSIC PREVIEW LABEL</label>
            <input
              type="text"
              value={currentEvent.soundPreviewName}
              onChange={(e) => handleChange("soundPreviewName", e.target.value)}
              className="echo-cms-input"
            />
          </div>
        </div>

        <div className="echo-cms-field">
          <label>SHORT TAGLINE STORY</label>
          <textarea
            value={currentEvent.tagline}
            onChange={(e) => handleChange("tagline", e.target.value)}
            className="echo-cms-textarea"
          />
        </div>

        <div className="echo-cms-field">
          <label>STAGE ARTWORK IMAGE URL</label>
          <input
            type="text"
            value={currentEvent.image}
            onChange={(e) => handleChange("image", e.target.value)}
            className="echo-cms-input"
          />
        </div>

        <button type="submit" className="echo-cms-save-btn">
          {isSaved ? <Check size={16} /> : <Save size={16} />}
          <span>{isSaved ? "CHANGES PUBLISHED LIVE!" : "SAVE HERO EVENT"}</span>
        </button>
      </form>
    </div>
  );
}
