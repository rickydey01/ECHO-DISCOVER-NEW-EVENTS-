"use client";

import { useState, useRef, type MouseEvent } from "react";
import { ArrowUpRight, Calendar, MapPin } from "lucide-react";
import { featuredEventsData } from "./featuredEvents.data";
import { useBooking } from "../../context/BookingContext";
import "./featuredEvents.css";

export default function FeaturedEvents() {
  const [expandedId, setExpandedId] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const { openBooking } = useBooking();

  const handleCardClick = (id: number, cardElement: HTMLElement) => {
    setExpandedId(id);
    // Smooth auto-centering on all devices so cards never get clipped on the edges
    if (containerRef.current) {
      const container = containerRef.current;
      const cardRect = cardElement.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const offset =
        cardRect.left -
        containerRect.left +
        container.scrollLeft -
        (container.clientWidth / 2) +
        (cardRect.width / 2);
      container.scrollTo({ left: Math.max(0, offset), behavior: "smooth" });
    }
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    if ((e.target as HTMLElement).closest("button, a")) return;
    isDragging.current = true;
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.4;
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <section
      id="featured-events"
      className="echo-featured-section"
      aria-labelledby="featured-section-title"
    >
      <div className="echo-container echo-featured-container">
        {/* Editorial Header */}
        <header className="echo-featured-head">
          <div className="echo-featured-head-left">
            <div className="echo-section-badge">
              <span className="echo-section-badge-dot" />
              <span>02 / HEADLINER CURATION</span>
            </div>
            <h2 id="featured-section-title" className="echo-featured-title">
              MONUMENTAL <br />
              <em>STAGE</em> EXPERIENCES.
            </h2>
          </div>

          <div className="echo-featured-head-right">
            <p className="echo-featured-subtitle">
              Tap or hover through our flagship curated gatherings across the globe. Tap any stage card to expand full lineup details.
            </p>
          </div>
        </header>

        {/* Fluid Accordion Stage */}
        <div
          ref={containerRef}
          className="echo-featured-stage"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {featuredEventsData.map((event) => {
            const isExpanded = event.id === expandedId;

            return (
              <article
                key={event.id}
                className={`echo-feature-card ${isExpanded ? "is-expanded" : "is-collapsed"}`}
                onClick={(e) => handleCardClick(event.id, e.currentTarget)}
                onMouseEnter={() => setExpandedId(event.id)}
                aria-expanded={isExpanded}
                role="region"
                aria-label={`Event: ${event.title}`}
              >
                {/* Media Artwork Background */}
                <div className="echo-feature-card__media">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="echo-feature-card__img"
                    draggable={false}
                    loading="lazy"
                  />
                  <div className="echo-feature-card__scrim" />
                  <div className="echo-feature-card__glow" />
                </div>

                {/* Collapsed Spine */}
                <div className="echo-feature-card__spine" aria-hidden={isExpanded}>
                  <span className="echo-spine-num">0{event.id}</span>
                  <h3 className="echo-spine-title">{event.title}</h3>
                  <span className="echo-spine-date">{event.date}</span>
                </div>

                {/* Top Badges */}
                <div className="echo-feature-card__top">
                  <span className="echo-card-badge">0{event.id} / HEADLINER</span>
                  <span className="echo-card-cat">{event.category}</span>
                </div>

                {/* Price Ribbon */}
                <div className="echo-feature-card__ribbon">
                  <span className="echo-card-price">{event.price}</span>
                </div>

                {/* Expanded Info Sheet */}
                <div className="echo-feature-card__sheet" aria-hidden={!isExpanded}>
                  <div className="echo-sheet-inner">
                    <div className="echo-sheet-meta-row">
                      <span><Calendar size={13} className="echo-text-orange" /> {event.fullDate}</span>
                      <span><MapPin size={13} className="echo-text-orange" /> {event.location}</span>
                    </div>

                    <h3 className="echo-sheet-title">{event.title}</h3>
                    <p className="echo-sheet-desc">{event.description}</p>

                    <div className="echo-sheet-lineup">
                      <div className="echo-lineup-tags">
                        {event.lineup.map((artist) => (
                          <span key={artist} className="echo-lineup-pill">{artist}</span>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      className="echo-sheet-book-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        openBooking({
                          title: event.title,
                          category: event.category,
                          date: event.fullDate,
                          time: event.time,
                          venue: event.venue,
                          city: event.location,
                          image: event.image,
                          basePrice: parseInt(event.price.replace(/[^0-9]/g, "")) || 899,
                        });
                      }}
                    >
                      <span>GET TICKETS</span>
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Footline Navigation Hint */}
        <div className="echo-featured-footline">
          <div className="echo-featured-footline-left">
            <span className="echo-pulse-dot" />
            <span>05 EXCLUSIVE HEADLINERS CURRENTLY ACTIVE</span>
          </div>
          <div className="echo-featured-footline-right">
            <span>TAP OR HOVER TO REVEAL FULL LINEUP</span>
          </div>
        </div>
      </div>
    </section>
  );
}
