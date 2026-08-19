"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import {
  Search,
  X,
  Sparkles,
  MapPin,
  Calendar,
  Layers,
  ArrowUpRight,
  ArrowLeft,
  Check,
  Globe,
  SlidersHorizontal,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useBooking } from "../../context/BookingContext";
import { soundEngine } from "../../utils/audioSynthesizer";
import {
  searchableEventsCatalog,
  searchCategoryTabs,
  globalLocationsList,
  quickSearchTags,
} from "./search.data";
import type { SearchableEvent, GlobalLocationItem } from "./search.types";
import "./search.css";

export default function GlobalSearchModal() {
  const { isSearchOpen, closeSearch, openBooking } = useBooking();
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"SUGGESTIONS" | "CATEGORY" | "LOCATION">("SUGGESTIONS");
  const [selectedGenre, setSelectedGenre] = useState<string>("ALL");
  const [selectedCity, setSelectedCity] = useState<string>("ALL");
  
  // Dedicated Location Picker Page State
  const [isLocationPickerOpen, setIsLocationPickerOpen] = useState(false);
  const [tempSelectedCity, setTempSelectedCity] = useState<string>("ALL");
  const [locationSearchQuery, setLocationSearchQuery] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const locationInputRef = useRef<HTMLInputElement>(null);

  // Auto focus input when opened
  useEffect(() => {
    if (isSearchOpen && !isLocationPickerOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else if (!isSearchOpen) {
      setQuery("");
      setActiveTab("SUGGESTIONS");
      setSelectedGenre("ALL");
      setSelectedCity("ALL");
      setIsLocationPickerOpen(false);
    }
  }, [isSearchOpen, isLocationPickerOpen]);

  // Focus location search when picker opens
  useEffect(() => {
    if (isLocationPickerOpen) {
      setTimeout(() => {
        locationInputRef.current?.focus();
      }, 100);
    }
  }, [isLocationPickerOpen]);

  // Keyboard shortcut listener (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        if (isLocationPickerOpen) {
          setIsLocationPickerOpen(false);
        } else {
          closeSearch();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, isLocationPickerOpen, closeSearch]);

  // Filter events logic
  const filteredEvents = useMemo(() => {
    const trimmed = query.trim().toLowerCase();

    return searchableEventsCatalog.filter((event) => {
      // 1. Text Query Filter
      if (trimmed) {
        const matchesTitle = event.title.toLowerCase().includes(trimmed);
        const matchesCategory = event.category.toLowerCase().includes(trimmed);
        const matchesCity = event.city.toLowerCase().includes(trimmed);
        const matchesVenue = event.venue.toLowerCase().includes(trimmed);
        const matchesDesc = event.description.toLowerCase().includes(trimmed);
        const matchesLineup = event.lineup?.some((artist) =>
          artist.toLowerCase().includes(trimmed)
        );
        const matchesTag = event.tag.toLowerCase().includes(trimmed);

        if (
          !matchesTitle &&
          !matchesCategory &&
          !matchesCity &&
          !matchesVenue &&
          !matchesDesc &&
          !matchesLineup &&
          !matchesTag
        ) {
          return false;
        }
      }

      // 2. Tab Specific Filtering (when no text query is entered)
      if (!trimmed) {
        if (activeTab === "SUGGESTIONS") {
          return event.isTrending || event.isHeadliner;
        }
        if (activeTab === "CATEGORY") {
          if (selectedGenre !== "ALL" && event.genre !== selectedGenre) {
            return false;
          }
        }
        if (activeTab === "LOCATION") {
          if (selectedCity !== "ALL" && event.city.toLowerCase() !== selectedCity.toLowerCase()) {
            return false;
          }
        }
      }

      return true;
    });
  }, [query, activeTab, selectedGenre, selectedCity]);

  // Filter locations in the Location Picker
  const filteredLocations = useMemo(() => {
    const q = locationSearchQuery.trim().toLowerCase();
    if (!q) return globalLocationsList;
    return globalLocationsList.filter(
      (loc) =>
        loc.name.toLowerCase().includes(q) ||
        loc.region.toLowerCase().includes(q) ||
        loc.country.toLowerCase().includes(q)
    );
  }, [locationSearchQuery]);

  const handleBookEvent = (event: SearchableEvent) => {
    soundEngine.playSfx("select");
    closeSearch();
    openBooking({
      title: event.title,
      category: event.category,
      date: event.fullDate || event.date,
      time: event.time,
      venue: event.venue,
      city: event.location,
      image: event.image,
      basePrice: event.basePrice,
    });
  };

  const handleQuickTagClick = (tag: string) => {
    soundEngine.playSfx("hover");
    setQuery(tag);
  };

  const handleTabSwitch = (tab: "SUGGESTIONS" | "CATEGORY" | "LOCATION") => {
    soundEngine.playSfx("hover");
    if (tab === "LOCATION") {
      setTempSelectedCity(selectedCity);
      setLocationSearchQuery("");
      setIsLocationPickerOpen(true);
    } else {
      setActiveTab(tab);
      setQuery("");
    }
  };

  const handleConfirmLocation = () => {
    soundEngine.playSfx("success");
    setSelectedCity(tempSelectedCity);
    setActiveTab("LOCATION");
    setIsLocationPickerOpen(false);
    setQuery("");
  };

  const resetFilters = () => {
    setQuery("");
    setSelectedGenre("ALL");
    setSelectedCity("ALL");
    setActiveTab("SUGGESTIONS");
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div
          className="echo-search-modal-root"
          role="dialog"
          aria-modal="true"
          aria-label="Global Event Search"
          data-lenis-prevent="true"
        >
          {/* Backdrop Blur Overlay */}
          <motion.div
            className="echo-search-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeSearch}
          />

          {/* Search Container Sheet */}
          <motion.div
            className="echo-search-container"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
          >
            {/* =========================================================
                VIEW A: DEDICATED LOCATION SELECTOR PAGE (OVERLAY)
                ========================================================= */}
            {isLocationPickerOpen ? (
              <div className="echo-location-picker-view" data-lenis-prevent="true">
                {/* Location Picker Header */}
                <div className="echo-location-picker-header">
                  <div className="echo-location-header-left">
                    <button
                      type="button"
                      className="echo-location-back-btn"
                      onClick={() => setIsLocationPickerOpen(false)}
                      aria-label="Back to search"
                    >
                      <ArrowLeft size={18} />
                    </button>
                    <div>
                      <h2>CHOOSE REGION / CITY</h2>
                      <p>Filter curated experiences across global coordinates</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="echo-search-close-btn"
                    onClick={closeSearch}
                    aria-label="Close search"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Location Search Input */}
                <div className="echo-location-search-strip">
                  <div className="echo-search-input-wrap">
                    <Search size={16} className="echo-search-icon-active" />
                    <input
                      ref={locationInputRef}
                      type="text"
                      className="echo-search-input"
                      placeholder="Search any city, region, or country (e.g. Guwahati, London, Berlin, Goa)..."
                      value={locationSearchQuery}
                      onChange={(e) => setLocationSearchQuery(e.target.value)}
                    />
                    {locationSearchQuery && (
                      <button
                        type="button"
                        className="echo-search-clear-btn"
                        onClick={() => setLocationSearchQuery("")}
                        aria-label="Clear location search"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Location Grid List */}
                <div className="echo-location-picker-body" data-lenis-prevent="true">
                  <div className="echo-location-grid">
                    {filteredLocations.map((loc) => {
                      const isSelected = tempSelectedCity === loc.id;
                      return (
                        <button
                          key={loc.id}
                          type="button"
                          className={`echo-location-card ${isSelected ? "is-selected" : ""}`}
                          onClick={() => {
                            soundEngine.playSfx("select");
                            setTempSelectedCity(loc.id);
                          }}
                        >
                          <div className="echo-location-card-flag">{loc.flag}</div>
                          <div className="echo-location-card-info">
                            <strong>{loc.name}</strong>
                            <small>{loc.region}, {loc.country}</small>
                          </div>
                          <div className="echo-location-card-badge">
                            {isSelected ? (
                              <Check size={14} className="echo-check-icon" />
                            ) : (
                              <span>{loc.eventCount} Events</span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Location Picker Footer with DONE Button */}
                <div className="echo-location-picker-footer">
                  <div className="echo-location-selected-preview">
                    <MapPin size={15} className="echo-text-orange" />
                    <span>
                      Selected: <strong>{globalLocationsList.find((l) => l.id === tempSelectedCity)?.name || "All Locations"}</strong>
                    </span>
                  </div>

                  <button
                    type="button"
                    className="echo-location-done-btn"
                    onClick={handleConfirmLocation}
                  >
                    <span>DONE / APPLY LOCATION</span>
                    <Check size={15} />
                  </button>
                </div>
              </div>
            ) : (
              /* =========================================================
                 VIEW B: MAIN SEARCH & CURATION VIEW
                 ========================================================= */
              <>
                {/* 1. Header & Live Search Bar */}
                <div className="echo-search-header">
                  <div className="echo-search-input-wrap">
                    <Search size={18} className="echo-search-icon-active" />
                    <input
                      ref={inputRef}
                      type="text"
                      className="echo-search-input"
                      placeholder="Search events, artists, genres, or cities..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    {query && (
                      <button
                        type="button"
                        className="echo-search-clear-btn"
                        onClick={() => setQuery("")}
                        aria-label="Clear search input"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>

                  <button
                    type="button"
                    className="echo-search-close-btn"
                    onClick={closeSearch}
                    aria-label="Close search"
                    title="Close (Esc)"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* 2. Main Navigation Tabs (Well-spaced distinct pill buttons) */}
                <div className="echo-search-nav-tabs-bar" role="tablist" aria-label="Search Mode Tabs">
                  <div className="echo-search-nav-tabs">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeTab === "SUGGESTIONS"}
                      className={`echo-search-tab-btn ${activeTab === "SUGGESTIONS" ? "is-active" : ""}`}
                      onClick={() => handleTabSwitch("SUGGESTIONS")}
                    >
                      <Sparkles size={14} />
                      <span>Featured Suggestions</span>
                    </button>

                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeTab === "CATEGORY"}
                      className={`echo-search-tab-btn ${activeTab === "CATEGORY" ? "is-active" : ""}`}
                      onClick={() => handleTabSwitch("CATEGORY")}
                    >
                      <Layers size={14} />
                      <span>By Category</span>
                    </button>

                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeTab === "LOCATION"}
                      className={`echo-search-tab-btn ${activeTab === "LOCATION" ? "is-active" : ""}`}
                      onClick={() => handleTabSwitch("LOCATION")}
                    >
                      <MapPin size={14} />
                      <span>
                        By Location {selectedCity !== "ALL" ? `(${selectedCity})` : ""}
                      </span>
                    </button>
                  </div>
                </div>

                {/* 3. Dedicated Sub-Filter Chips Bar (No overlap, clear separate strip) */}
                {activeTab === "CATEGORY" && !query && (
                  <div className="echo-search-subfilters-bar" aria-label="Category Filters">
                    <div className="echo-search-subfilters">
                      {searchCategoryTabs.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          className={`echo-filter-chip ${selectedGenre === (cat.genre || "ALL") ? "is-active" : ""}`}
                          onClick={() => setSelectedGenre(cat.genre || "ALL")}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Trending Tags (When on suggestions & no query) */}
                {activeTab === "SUGGESTIONS" && !query && (
                  <div className="echo-search-subfilters-bar" aria-label="Trending Tags">
                    <div className="echo-search-subfilters">
                      <span className="echo-trending-label">
                        TRENDING:
                      </span>
                      {quickSearchTags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          className="echo-filter-chip"
                          onClick={() => handleQuickTagClick(tag)}
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Location Filter Tag Bar when active */}
                {activeTab === "LOCATION" && !query && (
                  <div className="echo-search-subfilters-bar" aria-label="Active Location">
                    <div className="echo-search-subfilters">
                      <span className="echo-trending-label">
                        FILTERED REGION:
                      </span>
                      <button
                        type="button"
                        className="echo-filter-chip is-active"
                        onClick={() => {
                          setTempSelectedCity(selectedCity);
                          setIsLocationPickerOpen(true);
                        }}
                      >
                        📍 {selectedCity === "ALL" ? "All Locations (Worldwide)" : selectedCity} · Change
                      </button>
                    </div>
                  </div>
                )}

                {/* 4. Scrollable Content Body with data-lenis-prevent */}
                <div className="echo-search-body" data-lenis-prevent="true">
                  <div className="echo-search-results-meta">
                    <span>
                      {query
                        ? `Results for "${query}"`
                        : activeTab === "SUGGESTIONS"
                        ? "Curated Headliners & Trending Picks"
                        : activeTab === "CATEGORY"
                        ? `Category: ${selectedGenre}`
                        : `Location: ${selectedCity}`}
                    </span>
                    <span className="echo-search-results-count">
                      {filteredEvents.length} {filteredEvents.length === 1 ? "Event" : "Events"}
                    </span>
                  </div>

                  {filteredEvents.length > 0 ? (
                    <div className="echo-search-grid">
                      {filteredEvents.map((event) => (
                        <article key={event.id} className="echo-search-card">
                          <div className="echo-search-card__media">
                            <img
                              src={event.image}
                              alt={event.title}
                              className="echo-search-card__img"
                              loading="lazy"
                            />
                            <div className="echo-search-card__overlay" />
                            <span className="echo-search-card__tag">{event.tag}</span>
                            <span className="echo-search-card__price-badge">{event.price}</span>
                          </div>

                          <div className="echo-search-card__body">
                            <div>
                              <h3 className="echo-search-card__title">{event.title}</h3>
                              <div className="echo-search-card__meta-list">
                                <div className="echo-search-card__meta-item">
                                  <Calendar size={10.5} />
                                  <span>{event.date} · {event.time}</span>
                                </div>
                                <div className="echo-search-card__meta-item">
                                  <MapPin size={10.5} />
                                  <span>{event.venue}, {event.city}</span>
                                </div>
                              </div>
                            </div>

                            <div className="echo-search-card__footer">
                              <button
                                type="button"
                                className="echo-search-card__book-btn"
                                onClick={() => handleBookEvent(event)}
                                aria-label={`Get passes for ${event.title}`}
                              >
                                <span>GET PASSES</span>
                                <ArrowUpRight size={11} />
                              </button>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <div className="echo-search-empty">
                      <div className="echo-search-empty-icon">
                        <Search size={24} />
                      </div>
                      <h3>NO EVENTS FOUND</h3>
                      <p>
                        We couldn't find any events matching your search criteria. Try a different artist, genre, or city.
                      </p>
                      <button
                        type="button"
                        className="echo-search-empty-reset-btn"
                        onClick={resetFilters}
                      >
                        Reset Search & Filters
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
