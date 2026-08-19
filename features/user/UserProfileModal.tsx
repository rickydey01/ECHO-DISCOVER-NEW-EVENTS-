"use client";

import { useState } from "react";
import { X, Sparkles, MapPin, Bell, Shield, Ticket, Check, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useBooking } from "../../context/BookingContext";
import "./user.css";

export default function UserProfileModal() {
  const { isProfileOpen, closeProfile, profile, updateProfile, openMyPasses, passes } = useBooking();
  const [selectedCity, setSelectedCity] = useState(profile.city);
  const [notifications, setNotifications] = useState(true);

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    updateProfile({ city });
  };

  const handleGoToPasses = () => {
    closeProfile();
    openMyPasses();
  };

  const cities = ["Guwahati, Assam", "Shillong, Meghalaya", "Jorhat, Assam", "Dibrugarh, Assam"];

  return (
    <AnimatePresence>
      {isProfileOpen && (
        <div className="echo-modal-root" role="dialog" aria-modal="true" aria-label="User Profile & VIP Membership">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="echo-modal-backdrop"
            onClick={closeProfile}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="echo-profile-modal-container"
          >
            {/* Header */}
            <div className="echo-profile-head">
              <div className="echo-profile-avatar-wrap">
                <img src={profile.avatar} alt={profile.name} className="echo-profile-avatar-img" />
                <div className="echo-profile-vip-star">★</div>
              </div>

              <button
                type="button"
                className="echo-modal-close"
                onClick={closeProfile}
                aria-label="Close profile modal"
              >
                <X size={18} />
              </button>

              <div className="echo-profile-user-info">
                <span className="echo-profile-tier-badge">
                  <Sparkles size={13} /> {profile.membership}
                </span>
                <h2>{profile.name}</h2>
                <small>{profile.email} · {profile.phone}</small>
              </div>
            </div>

            {/* Profile Body */}
            <div className="echo-profile-body">
              {/* Quick Passes Shortcut */}
              <div className="echo-profile-section" onClick={handleGoToPasses} role="button" tabIndex={0}>
                <div className="echo-profile-pass-shortcut">
                  <div className="echo-shortcut-left">
                    <Ticket size={20} className="echo-text-orange" />
                    <div>
                      <strong>MY ACTIVE PASSES</strong>
                      <small>{passes.length} tickets in your digital wallet</small>
                    </div>
                  </div>
                  <ChevronRight size={18} className="echo-shortcut-arrow" />
                </div>
              </div>

              {/* City Hub Selection */}
              <div className="echo-profile-section">
                <label className="echo-profile-label">
                  <MapPin size={13} className="echo-text-orange" />
                  <span>PRIMARY REGIONAL HUB</span>
                </label>
                <div className="echo-city-pills">
                  {cities.map((c) => (
                    <button
                      key={c}
                      type="button"
                      className={`echo-city-pill ${selectedCity === c ? "is-active" : ""}`}
                      onClick={() => handleCityChange(c)}
                    >
                      {selectedCity === c && <Check size={12} />}
                      <span>{c.split(",")[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* VIP Perks Grid */}
              <div className="echo-profile-section">
                <label className="echo-profile-label">
                  <Shield size={13} className="echo-text-orange" />
                  <span>CITIZEN PERKS & TELEMETRY</span>
                </label>
                <div className="echo-perks-grid">
                  <div className="echo-perk-card">
                    <small>ECHO REWARD POINTS</small>
                    <strong>{profile.points.toLocaleString()} PTS</strong>
                    <span>Convertible to VIP upgrades</span>
                  </div>
                  <div className="echo-perk-card">
                    <small>FAST-TRACK QUEUE</small>
                    <strong>PRIORITY UNLOCKED</strong>
                    <span>Direct lane at all venues</span>
                  </div>
                </div>
              </div>

              {/* Notifications Toggle */}
              <div className="echo-profile-section echo-toggle-row">
                <div className="echo-toggle-text">
                  <div className="echo-toggle-title">
                    <Bell size={14} className="echo-text-orange" />
                    <strong>Secret Stage Coordinates & Drops</strong>
                  </div>
                  <small>Receive instant alerts when underground coordinates are revealed</small>
                </div>
                <button
                  type="button"
                  className={`echo-switch ${notifications ? "is-on" : ""}`}
                  onClick={() => setNotifications(!notifications)}
                  aria-label="Toggle secret notifications"
                >
                  <span className="echo-switch-knob" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
