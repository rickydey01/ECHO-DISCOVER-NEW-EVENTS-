"use client";

import { useState } from "react";
import { ArrowUpRight, Sparkles, MapPin, Calendar, X, Eye } from "lucide-react";
import { galleryRowsData } from "./gallery.data";
import type { GalleryItem } from "./gallery.types";
import { useBooking } from "../../context/BookingContext";
import "./gallery.css";

export default function GalleryExperience() {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const { openBooking } = useBooking();

  const handleOpenLightbox = (item: GalleryItem) => {
    setActiveItem(item);
  };

  const handleCloseLightbox = () => {
    setActiveItem(null);
  };

  const handleBookFromLightbox = () => {
    if (!activeItem) return;
    handleCloseLightbox();
    openBooking({
      title: activeItem.title,
      category: activeItem.category,
      date: activeItem.date,
      time: "08:00 PM",
      venue: "Echo Arena Main Hall",
      city: `${activeItem.location}, Assam`,
      image: activeItem.image,
      basePrice: 999,
    });
  };

  return (
    <section id="gallery" className="echo-gallery-section" aria-label="ECHO Motion Archive">
      <div className="echo-gallery-watermark" aria-hidden="true">
        ARCHIVE
      </div>

      <div className="echo-container echo-gallery-head">
        <div className="echo-section-badge">
          <span className="echo-section-badge-dot" />
          <span>04 / THREE-TRACK VELOCITY ARCHIVE</span>
        </div>
        <div className="echo-gallery-title-row">
          <h2 className="echo-gallery-title">
            MOMENTS IN <br />
            <em>PERPETUAL</em> MOTION.
          </h2>
          <p className="echo-gallery-desc">
            Three counter-directional velocity streams capturing 120+ unscripted nights across Northeast India. Click any memory to inspect.
          </p>
        </div>
      </div>

      {/* Counter-Directional Moving Streams */}
      <div className="echo-gallery-streams">
        {galleryRowsData.map((row, rIdx) => {
          const trackSpeedClass =
            rIdx === 0 ? "track-left" : rIdx === 1 ? "track-right" : "track-left-slow";

          // Duplicate items to ensure smooth infinite loop
          const loopedItems = [...row, ...row, ...row];

          return (
            <div key={rIdx} className="echo-gallery-stream">
              <div className={`echo-stream-track ${trackSpeedClass}`}>
                {loopedItems.map((item, itemIdx) => (
                  <article
                    key={`${item.id}-${itemIdx}`}
                    className={`echo-gallery-card ${rIdx === 1 ? "echo-gallery-card--tall" : ""}`}
                    onClick={() => handleOpenLightbox(item)}
                    role="button"
                    tabIndex={0}
                    aria-label={`View archive item ${item.title}`}
                  >
                    <img src={item.image} alt={item.title} loading="lazy" draggable={false} />
                    <div className="echo-gallery-card__scrim" />

                    <div className="echo-gallery-card__info">
                      <span className="echo-g-cat">{item.category}</span>
                      <h4 className="echo-g-title">{item.title}</h4>
                      <span className="echo-g-sub">{item.location} · {item.date}</span>
                    </div>

                    <div className="echo-gallery-card__hover-icon">
                      <Eye size={16} />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeItem && (
        <div className="echo-lightbox-root" role="dialog" aria-modal="true">
          <div className="echo-lightbox-backdrop" onClick={handleCloseLightbox} />

          <div className="echo-lightbox-card">
            <button
              type="button"
              className="echo-lightbox-close"
              onClick={handleCloseLightbox}
              aria-label="Close archive preview"
            >
              <X size={18} />
            </button>

            <div className="echo-lightbox-img-wrap">
              <img src={activeItem.image} alt={activeItem.title} />
            </div>

            <div className="echo-lightbox-content">
              <div className="echo-lightbox-badge">
                <Sparkles size={13} /> {activeItem.category}
              </div>

              <h3>{activeItem.title}</h3>

              <div className="echo-lightbox-meta">
                <div>
                  <small>LOCATION</small>
                  <strong><MapPin size={12} className="echo-text-orange" /> {activeItem.location}</strong>
                </div>
                <div>
                  <small>ARCHIVE DATE</small>
                  <strong><Calendar size={12} className="echo-text-orange" /> {activeItem.date}</strong>
                </div>
                <div>
                  <small>ATTENDEES</small>
                  <strong>{activeItem.attendees}</strong>
                </div>
              </div>

              <p style={{ fontSize: "13px", color: "var(--echo-muted)", lineHeight: 1.6 }}>
                Captured during the {activeItem.date} residency at {activeItem.location}. Audio-visual live synchronicity engineered by ECHO.
              </p>

              <button
                type="button"
                className="echo-lightbox-cta"
                onClick={handleBookFromLightbox}
              >
                <span>EXPLORE SIMILAR EXPERIENCES</span>
                <ArrowUpRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
