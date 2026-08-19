"use client";

import { useState } from "react";
import { Save, Check } from "lucide-react";
import { galleryRowsData } from "../../gallery/gallery.data";
import type { GalleryItem } from "../../gallery/gallery.types";

export default function GalleryEditor() {
  const [stream1, setStream1] = useState<GalleryItem[]>(galleryRowsData[0] || []);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [isSaved, setIsSaved] = useState(false);

  const current = stream1[selectedIdx] || stream1[0];

  const handleUpdate = (field: keyof GalleryItem, value: string) => {
    setStream1((prev) =>
      prev.map((item, i) => (i === selectedIdx ? { ...item, [field]: value } : item))
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
          <h3>VELOCITY ARCHIVE CMS</h3>
          <p style={{ fontSize: "12px", color: "var(--echo-muted)" }}>
            Update stream photography, event titles, attendee metrics & locations
          </p>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          {stream1.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              className={`echo-pass-tab-btn ${selectedIdx === idx ? "is-active" : ""}`}
              onClick={() => setSelectedIdx(idx)}
            >
              Item 0{idx + 1}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSave} className="echo-cms-form">
        <div className="echo-cms-row-2">
          <div className="echo-cms-field">
            <label>ARCHIVE TITLE</label>
            <input
              type="text"
              value={current.title}
              onChange={(e) => handleUpdate("title", e.target.value)}
              className="echo-cms-input"
            />
          </div>

          <div className="echo-cms-field">
            <label>CATEGORY / TAG</label>
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
            <label>LOCATION</label>
            <input
              type="text"
              value={current.location}
              onChange={(e) => handleUpdate("location", e.target.value)}
              className="echo-cms-input"
            />
          </div>

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
            <label>ATTENDEES METRIC</label>
            <input
              type="text"
              value={current.attendees}
              onChange={(e) => handleUpdate("attendees", e.target.value)}
              className="echo-cms-input"
            />
          </div>
        </div>

        <div className="echo-cms-field">
          <label>PHOTOGRAPHY IMAGE PATH</label>
          <input
            type="text"
            value={current.image}
            onChange={(e) => handleUpdate("image", e.target.value)}
            className="echo-cms-input"
          />
        </div>

        <button type="submit" className="echo-cms-save-btn">
          {isSaved ? <Check size={16} /> : <Save size={16} />}
          <span>{isSaved ? "ARCHIVE SAVED!" : "SAVE ARCHIVE ITEM"}</span>
        </button>
      </form>
    </div>
  );
}
