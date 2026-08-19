"use client";

import { useState, useRef, useEffect, useCallback, type TouchEvent, type MouseEvent, type WheelEvent } from "react";
import { ArrowUpRight, Calendar, MapPin, Sparkles, Compass, ShieldCheck, QrCode, ChevronLeft, ChevronRight } from "lucide-react";
import { upcomingEventsData, type UpcomingPassEvent } from "./upcomingEvents.data";
import { passDeckMotionConfig } from "./upcomingEvents.animations";
import { useBooking } from "../../context/BookingContext";
import "./upcomingEvents.css";

export default function UpcomingEvents() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next");
  const [selectedTierIndex, setSelectedTierIndex] = useState(0);

  // Gesture refs
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const mouseStartX = useRef(0);
  const isMouseDown = useRef(false);
  const lastWheelTime = useRef(0);

  const { openBooking } = useBooking();

  const currentEvent = upcomingEventsData[activeIndex];
  const activeTier = currentEvent.tiers[selectedTierIndex] || currentEvent.tiers[0];

  const changePage = useCallback((dir: "next" | "prev") => {
    if (isFlipping) return;

    if (dir === "next" && activeIndex < upcomingEventsData.length - 1) {
      setFlipDirection("next");
      setIsFlipping(true);
      setTimeout(() => {
        setActiveIndex((prev) => prev + 1);
        setSelectedTierIndex(0);
        setIsFlipping(false);
      }, passDeckMotionConfig.flipDurationMs);
    } else if (dir === "prev" && activeIndex > 0) {
      setFlipDirection("prev");
      setIsFlipping(true);
      setTimeout(() => {
        setActiveIndex((prev) => prev - 1);
        setSelectedTierIndex(0);
        setIsFlipping(false);
      }, passDeckMotionConfig.flipDurationMs);
    }
  }, [activeIndex, isFlipping]);

  const jumpToPage = (index: number) => {
    if (isFlipping || index === activeIndex) return;
    setFlipDirection(index > activeIndex ? "next" : "prev");
    setIsFlipping(true);
    setTimeout(() => {
      setActiveIndex(index);
      setSelectedTierIndex(0);
      setIsFlipping(false);
    }, passDeckMotionConfig.flipDurationMs);
  };

  // Keyboard arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") changePage("next");
      if (e.key === "ArrowLeft") changePage("prev");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [changePage]);

  // Touch Gesture Handling for Mobile / Tablet
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    if (touchDeltaX.current > passDeckMotionConfig.swipeThresholdPx) {
      changePage("prev");
    } else if (touchDeltaX.current < -passDeckMotionConfig.swipeThresholdPx) {
      changePage("next");
    }
    touchDeltaX.current = 0;
  };

  // Mouse Drag Gesture Handling for Desktop
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button, a")) return;
    isMouseDown.current = true;
    mouseStartX.current = e.clientX;
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown.current) return;
    const delta = e.clientX - mouseStartX.current;
    if (delta > passDeckMotionConfig.dragThresholdPx) {
      changePage("prev");
      isMouseDown.current = false;
    } else if (delta < -passDeckMotionConfig.dragThresholdPx) {
      changePage("next");
      isMouseDown.current = false;
    }
  };

  const handleMouseUp = () => {
    isMouseDown.current = false;
  };

  // Trackpad Horizontal Wheel Navigation
  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastWheelTime.current < passDeckMotionConfig.wheelThrottleMs) return;

    if (Math.abs(e.deltaX) > 30) {
      if (e.deltaX > 30) {
        changePage("next");
        lastWheelTime.current = now;
      } else if (e.deltaX < -30) {
        changePage("prev");
        lastWheelTime.current = now;
      }
    }
  };

  const handleBookTicket = () => {
    openBooking({
      title: `${currentEvent.title} (${activeTier.name})`,
      category: currentEvent.category,
      date: currentEvent.date,
      time: currentEvent.time,
      venue: currentEvent.venue,
      city: currentEvent.location,
      image: currentEvent.image,
      basePrice: activeTier.price,
      initialTier: selectedTierIndex === 0 ? "GA" : selectedTierIndex === 1 ? "VIP" : "BACKSTAGE",
    });
  };

  return (
    <section
      id="upcoming-events"
      className="echo-upcoming-section"
      aria-labelledby="upcoming-section-title"
    >
      <div className="echo-container echo-upcoming-container">
        {/* Editorial Header */}
        <header className="echo-upcoming-head">
          <div className="echo-upcoming-head-left">
            <div className="echo-section-badge">
              <span className="echo-section-badge-dot" />
              <span>03 / 3D TICKET PASS DECK</span>
            </div>
            <h2 id="upcoming-section-title" className="echo-upcoming-title">
              CLAIM YOUR <br />
              <em>DIGITAL ACCESS</em> PASS.
            </h2>
          </div>

          <div className="echo-upcoming-head-right">
            <div className="echo-upcoming-counter">
              <span className="echo-counter-current">0{activeIndex + 1}</span>
              <span className="echo-counter-slash">/</span>
              <span className="echo-counter-total">0{upcomingEventsData.length}</span>
            </div>
            <p className="echo-upcoming-lead">
              Swipe or drag to flip through the 3D pass deck. Select your access tier and claim entry with instant digital delivery.
            </p>
          </div>
        </header>

        {/* 3D Ticket Deck Stage */}
        <div
          className="echo-upcoming-stage"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        >
          {/* Desktop-Only Left Side Arrow */}
          <button
            type="button"
            className="echo-ticket-desktop-arrow echo-ticket-desktop-arrow--prev"
            onClick={() => changePage("prev")}
            disabled={activeIndex === 0}
            aria-label="Previous Ticket Pass"
            title="Previous Pass"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="echo-upcoming-ticket-wrapper">
            <div
              className={`echo-3d-ticket-container ${
                isFlipping ? (flipDirection === "next" ? "is-flipping-next" : "is-flipping-prev") : ""
              }`}
            >
              <article className="echo-ticket-card">
                {/* Holographic Top Foil Ribbon */}
                <div className="echo-ticket-foil">
                  <div className="echo-foil-text">
                    <span>ECHO ACCESS SYSTEM</span>
                    <span>•</span>
                    <span>SERIAL: {currentEvent.serialNumber}</span>
                    <span>•</span>
                    <span>AUTHENTICATED PASS</span>
                  </div>
                  <div className="echo-foil-shimmer" />
                </div>

                <div className="echo-ticket-body">
                  {/* Left Media Panel */}
                  <div className="echo-ticket-media">
                    <img
                      src={currentEvent.image}
                      alt={currentEvent.title}
                      className="echo-ticket-img"
                      draggable={false}
                      loading="eager"
                    />
                    <div className="echo-ticket-media-overlay" />

                    <div className="echo-ticket-media-header">
                      <span className="echo-ticket-index">0{activeIndex + 1}</span>
                      <span className="echo-ticket-status-pill">{currentEvent.status.toUpperCase()}</span>
                    </div>

                    <div className="echo-ticket-media-footer">
                      <span className="echo-ticket-day">{currentEvent.day}</span>
                      <span className="echo-ticket-date-big">{currentEvent.date}</span>
                      <small className="echo-ticket-city">{currentEvent.location}</small>
                    </div>
                  </div>

                  {/* Middle Information Panel */}
                  <div className="echo-ticket-content">
                    {/* Event Header */}
                    <div className="echo-ticket-content-top">
                      <div className="echo-ticket-cat-badge">
                        <span className="echo-badge-dot" />
                        <span>{currentEvent.category}</span>
                      </div>
                      <div className="echo-ticket-coords">
                        <Compass size={12} className="echo-text-orange" />
                        <span>{currentEvent.coordinates}</span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="echo-ticket-main-info">
                      <h3 className="echo-ticket-title">{currentEvent.title}</h3>
                      <p className="echo-ticket-desc">{currentEvent.description}</p>
                    </div>

                    {/* Metadata Cluster */}
                    <div className="echo-ticket-meta-grid">
                      <div className="echo-meta-box">
                        <Calendar size={13} className="echo-text-orange" />
                        <div>
                          <small>DOORS / TIME</small>
                          <strong>{currentEvent.time}</strong>
                        </div>
                      </div>

                      <div className="echo-meta-box">
                        <MapPin size={13} className="echo-text-orange" />
                        <div>
                          <small>VENUE</small>
                          <strong>{currentEvent.venue}</strong>
                        </div>
                      </div>

                      <div className="echo-meta-box">
                        <ShieldCheck size={13} className="echo-text-orange" />
                        <div>
                          <small>ENTRY POLICY</small>
                          <strong>{currentEvent.ageRestriction}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Tier Selector Pills */}
                    <div className="echo-ticket-tiers-bar">
                      <small className="echo-tier-label">SELECT ACCESS TIER:</small>
                      <div className="echo-tier-pill-row">
                        {currentEvent.tiers.map((t, tIdx) => (
                          <button
                            key={t.name}
                            type="button"
                            className={`echo-tier-pill ${selectedTierIndex === tIdx ? "is-active" : ""}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTierIndex(tIdx);
                            }}
                          >
                            <span>{t.name}</span>
                            <strong>₹{t.price}</strong>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Call to Action */}
                    <div className="echo-ticket-action-row">
                      <div className="echo-ticket-price-display">
                        <small>TOTAL PASS PRICE</small>
                        <span className="echo-price-val">₹{activeTier.price}</span>
                      </div>

                      <button
                        type="button"
                        className="echo-ticket-book-btn"
                        onClick={handleBookTicket}
                      >
                        <Sparkles size={13} />
                        <span>RESERVE PASS</span>
                        <ArrowUpRight size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Perforated Divider Line */}
                  <div className="echo-ticket-perforation">
                    <div className="echo-perf-notch-top" />
                    <div className="echo-perf-dots" />
                    <div className="echo-perf-notch-bottom" />
                  </div>

                  {/* Right Barcode & Stub Side */}
                  <aside className="echo-ticket-stub">
                    <div className="echo-stub-header">
                      <span>ECHO PASS</span>
                      <strong>0{activeIndex + 1}</strong>
                    </div>

                    <div className="echo-stub-qr">
                      <QrCode size={52} />
                    </div>

                    <div className="echo-stub-barcode">
                      <div className="echo-barcode-lines">
                        {Array.from({ length: 24 }).map((_, i) => (
                          <span
                            key={i}
                            style={{
                              height: "100%",
                              width: i % 3 === 0 ? "3px" : i % 2 === 0 ? "2px" : "1px",
                              background: i % 5 === 0 ? "#ff5520" : "#ffffff",
                              opacity: i % 4 === 0 ? 0.4 : 0.85,
                            }}
                          />
                        ))}
                      </div>
                      <div className="echo-barcode-laser" />
                    </div>

                    <div className="echo-stub-footer">
                      <small className="echo-stub-serial">{currentEvent.serialNumber}</small>
                      <div className="echo-stub-hologram">
                        <span>★</span>
                      </div>
                    </div>
                  </aside>
                </div>
              </article>
            </div>
          </div>

          {/* Desktop-Only Right Side Arrow */}
          <button
            type="button"
            className="echo-ticket-desktop-arrow echo-ticket-desktop-arrow--next"
            onClick={() => changePage("next")}
            disabled={activeIndex === upcomingEventsData.length - 1}
            aria-label="Next Ticket Pass"
            title="Next Pass"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Bottom Centered Pagination Dots */}
        <footer className="echo-upcoming-footer">
          <div className="echo-deck-dots">
            {upcomingEventsData.map((evt, idx) => (
              <button
                key={evt.id}
                type="button"
                className={`echo-deck-dot ${idx === activeIndex ? "is-active" : ""}`}
                onClick={() => jumpToPage(idx)}
                aria-label={`Jump to ${evt.title}`}
              >
                <span>0{idx + 1}</span>
                <div className="echo-deck-dot-bar" />
              </button>
            ))}
          </div>

          <div className="echo-deck-swipe-hint">
            <span className="echo-pulse-dot" />
            <span>SWIPE / DRAG TO TURN PASSES</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
