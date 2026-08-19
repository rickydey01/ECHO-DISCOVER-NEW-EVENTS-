"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX, Menu, Ticket, Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { soundEngine } from "../../utils/audioSynthesizer";
import { useBooking } from "../../context/BookingContext";
import { assetUrl } from "../../utils/assetHelper";
import { searchRotatingPlaceholders } from "../search/search.data";
import MobileMenu from "./MobileMenu";
import "./navigation.css";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const { openUserProfile, openMyPasses, openSearch, passes, profile } = useBooking();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Audio engine state listener
  useEffect(() => {
    const unsubscribe = soundEngine.subscribe((playing) => {
      setIsPlayingAudio(playing);
    });
    return () => unsubscribe();
  }, []);

  // Placeholder rotation interval
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % searchRotatingPlaceholders.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openSearch]);

  const toggleAudio = () => {
    soundEngine.toggle();
  };

  return (
    <>
      <header className={`echo-navbar ${isScrolled ? "is-scrolled" : ""}`}>
        <div className="echo-navbar__inner">
          {/* Brand Logo */}
          <a href="#home" className="echo-navbar__logo" aria-label="ECHO Home">
            <span>ECHO</span>
            <span className="echo-navbar__logo-dot" />
          </a>

          {/* Desktop Nav Links */}
          <nav className="echo-navbar__links" aria-label="Main Navigation">
            <a href="#home" className="echo-navbar__link">Home</a>
            <a href="#featured-events" className="echo-navbar__link">Featured</a>
            <a href="#categories" className="echo-navbar__link">Discover</a>
            <a href="#upcoming-events" className="echo-navbar__link">Events</a>
            <a href="#gallery" className="echo-navbar__link">Archive</a>
            <a href="#about" className="echo-navbar__link">Manifesto</a>
          </nav>

          {/* Mobile & Tablet Animated Search Bar (Between Logo and Mobile Menu) */}
          <button
            type="button"
            className="echo-nav-search-bar-mobile"
            onClick={openSearch}
            aria-label="Search events, artists, and cities"
            title="Search events"
          >
            <Search size={14} className="echo-search-pill-icon" />
            <div className="echo-search-ticker-wrap">
              <AnimatePresence mode="wait">
                <motion.span
                  key={placeholderIndex}
                  initial={{ opacity: 0, y: 7 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -7 }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  className="echo-search-ticker-text"
                >
                  {searchRotatingPlaceholders[placeholderIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="echo-search-pill-glow" />
          </button>

          {/* Desktop Action Hub */}
          <div className="echo-navbar__actions">
            {/* Desktop Search Icon Button */}
            <button
              type="button"
              className="echo-nav-search-btn-desktop"
              onClick={openSearch}
              aria-label="Search events (Ctrl+K)"
              title="Search Events (Ctrl+K)"
            >
              <Search size={15} />
              <span className="echo-nav-search-kbd">⌘K</span>
            </button>

            {/* Audio Toggle Button */}
            <button
              type="button"
              className={`echo-nav-sound-btn ${isPlayingAudio ? "is-active" : ""}`}
              onClick={toggleAudio}
              aria-label={isPlayingAudio ? "Mute live ambient sound" : "Play live electronic audio"}
              title={isPlayingAudio ? "Mute Audio" : "Play Electronic Music"}
            >
              {isPlayingAudio ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            {/* My Passes Wallet Button (In between Audio and Profile) */}
            <button
              type="button"
              className="echo-nav-passes-btn"
              onClick={openMyPasses}
              aria-label="Open My Digital Passes Wallet"
              title="My Digital Passes Wallet"
            >
              <Ticket size={15} />
              <span>PASSES</span>
              {passes.length > 0 && (
                <span className="echo-nav-passes-badge">{passes.length}</span>
              )}
            </button>

            {/* Instagram Story Circle Avatar Profile Button */}
            <button
              type="button"
              className="echo-nav-story-avatar-btn"
              onClick={openUserProfile}
              aria-label="Open VIP Profile"
              title="My VIP Profile"
            >
              <div className="echo-story-ring">
                <div className="echo-story-inner">
                  <img
                    src={profile?.avatar || assetUrl("/images/hero/hero1.webp")}
                    alt="User VIP Profile"
                    className="echo-story-avatar-img"
                  />
                </div>
              </div>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            className="echo-navbar__menu-trigger"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open mobile menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Sheet */}
      {isMobileMenuOpen && (
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
