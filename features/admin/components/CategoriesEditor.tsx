"use client";

import { useState } from "react";
import { Save, Check } from "lucide-react";
import { categoryNavTabs } from "../../categories/categories.data";

export default function CategoriesEditor() {
  const [tabs, setTabs] = useState(categoryNavTabs);
  const [selectedId, setSelectedId] = useState<string>(tabs[0]?.id || "ALL");
  const [isSaved, setIsSaved] = useState(false);

  const current = tabs.find((t) => t.id === selectedId) || tabs[0];

  const handleUpdate = (field: string, value: string) => {
    setTabs((prev) =>
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
          <h3>CATEGORY UNIVERSES CMS</h3>
          <p style={{ fontSize: "12px", color: "var(--echo-muted)" }}>
            Edit category filter tabs, descriptions, event counts and universe stories
          </p>
        </div>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`echo-pass-tab-btn ${selectedId === t.id ? "is-active" : ""}`}
              onClick={() => setSelectedId(t.id)}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSave} className="echo-cms-form">
        <div className="echo-cms-row-2">
          <div className="echo-cms-field">
            <label>UNIVERSE NAME</label>
            <input
              type="text"
              value={current.name}
              onChange={(e) => handleUpdate("name", e.target.value)}
              className="echo-cms-input"
            />
          </div>

          <div className="echo-cms-field">
            <label>COUNT BADGE (E.G. 24 EVENTS)</label>
            <input
              type="text"
              value={current.count}
              onChange={(e) => handleUpdate("count", e.target.value)}
              className="echo-cms-input"
            />
          </div>
        </div>

        <div className="echo-cms-field">
          <label>TAGLINE</label>
          <input
            type="text"
            value={current.tagline}
            onChange={(e) => handleUpdate("tagline", e.target.value)}
            className="echo-cms-input"
          />
        </div>

        <div className="echo-cms-field">
          <label>UNIVERSE DESCRIPTION</label>
          <textarea
            value={current.description}
            onChange={(e) => handleUpdate("description", e.target.value)}
            className="echo-cms-textarea"
          />
        </div>

        <button type="submit" className="echo-cms-save-btn">
          {isSaved ? <Check size={16} /> : <Save size={16} />}
          <span>{isSaved ? "UNIVERSE SAVED!" : "SAVE UNIVERSE"}</span>
        </button>
      </form>
    </div>
  );
}
