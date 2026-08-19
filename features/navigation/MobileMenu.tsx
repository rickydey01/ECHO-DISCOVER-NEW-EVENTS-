"use client";

import { X, Volume2, VolumeX, Sparkles, User, Ticket } from "lucide-react";
import { soundEngine } from "../../utils/audioSynthesizer";
import { useState, useEffect } from "react";
import { useBooking } from "../../context/BookingContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const { openUserProfile, openMyPasses } = useBooking();

  useEffect(() => {
    const unsub = soundEngine.subscribe((playing) => setIsPlaying(playing));
    return () => unsub();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="echo-mobile-menu-overlay" role="dialog" aria-modal="true">
      {/* Header */}
      <div className="echo-mobile-menu-head">
        <a href="#home" className="echo-navbar__logo" onClick={onClose}>
          <span>ECHO</span>
          <span className="echo-navbar__logo-dot" />
        </a>

        <button
          type="button"
          className="echo-mobile-menu-close"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="echo-mobile-menu-links">
        <a href="#home" className="echo-mobile-menu-link" onClick={onClose}>
          <small>01</small>
          <span>HOME</span>
        </a>
        <a href="#featured-events" className="echo-mobile-menu-link" onClick={onClose}>
          <small>02</small>
          <span>HEADLINERS</span>
        </a>
        <a href="#categories" className="echo-mobile-menu-link" onClick={onClose}>
          <small>03</small>
          <span>UNIVERSES</span>
        </a>
        <a href="#upcoming-events" className="echo-mobile-menu-link" onClick={onClose}>
          <small>04</small>
          <span>PASSES</span>
        </a>
        <a href="#gallery" className="echo-mobile-menu-link" onClick={onClose}>
          <small>05</small>
          <span>ARCHIVE</span>
        </a>
        <a href="#about" className="echo-mobile-menu-link" onClick={onClose}>
          <small>06</small>
          <span>MANIFESTO</span>
        </a>
      </nav>

      {/* Fast Action Shortcuts */}
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="echo-nav-profile-btn"
          style={{ flex: 1, justifyContent: "center", padding: "12px" }}
          onClick={() => {
            onClose();
            openUserProfile();
          }}
        >
          <User size={16} />
          <span>MY PROFILE</span>
        </button>

        <button
          type="button"
          className="echo-nav-profile-btn"
          style={{ flex: 1, justifyContent: "center", padding: "12px", background: "rgba(255,107,53,0.15)", borderColor: "var(--echo-orange)" }}
          onClick={() => {
            onClose();
            openMyPasses();
          }}
        >
          <Ticket size={16} className="echo-text-orange" />
          <span>MY PASSES</span>
        </button>
      </div>

      {/* Footer */}
      <div className="echo-mobile-menu-footer">
        <button
          type="button"
          className={`echo-nav-sound-btn ${isPlaying ? "is-active" : ""}`}
          onClick={() => soundEngine.toggle()}
        >
          {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Sparkles size={12} className="echo-text-orange" />
          <span>ECHO 2026 // LIVE</span>
        </div>
      </div>
    </div>
  );
}
