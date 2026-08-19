"use client";

import { useRef } from "react";
import { Sparkles } from "lucide-react";
import { manifestoStatsData } from "./manifesto.data";
import "./manifesto.css";

export default function AboutManifesto() {
  const manifestoRef = useRef<HTMLElement>(null);

  return (
    <section id="about" ref={manifestoRef} className="echo-manifesto-section">
      {/* Background Kinetic Drift Text */}
      <div className="echo-manifesto-drift" aria-hidden="true">
        ECHO
      </div>

      <div className="echo-container echo-manifesto-container">
        <div className="echo-manifesto-grid">
          {/* Left Column: The Manifesto Philosophy */}
          <div className="echo-manifesto-left">
            <div className="echo-section-badge">
              <span className="echo-section-badge-dot" />
              <span>05 / OUR MANIFESTO</span>
            </div>

            <h2 className="echo-manifesto-title">
              WE DON’T <br />
              <em>SELL TICKETS.</em> <br />
              WE CATALYZE <br />
              MOMENTS.
            </h2>

            <p className="echo-manifesto-lead">
              We create the nights you wish you could pause, rewind, and live inside forever.
            </p>

            <p className="echo-manifesto-p">
              ECHO was born out of a desire to redefine how Northeast India experiences live culture. We strip away the friction of generic ticketing and create immersive, sensory gateways into music, art, and nightlife. From subterranean warehouse basslines to open-air riverside stages, every event is curated with uncompromising artistic intent.
            </p>

            <div className="echo-manifesto-quote-box">
              <Sparkles size={16} className="echo-text-orange" />
              <blockquote>
                "Built for discovery. Designed for emotion. Made for the next story."
              </blockquote>
            </div>
          </div>

          {/* Right Column: Telemetry Metrics & Visual Stamp */}
          <div className="echo-manifesto-right">
            <div className="echo-stats-grid">
              {manifestoStatsData.map((stat) => {
                const IconComponent = stat.icon;
                return (
                  <div key={stat.label} className="echo-stat-card">
                    <div className="echo-stat-top">
                      <IconComponent size={18} className="echo-text-orange" />
                      <small className="echo-stat-label">{stat.label}</small>
                    </div>
                    <strong className="echo-stat-val">{stat.value}</strong>
                    <p className="echo-stat-desc">{stat.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Giant Editorial Stamp */}
            <div className="echo-manifesto-stamp">
              <span>LIVE</span>
              <em>DIFFERENT.</em>
              <small>GUWAHATI // ASSAM // 2026</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
