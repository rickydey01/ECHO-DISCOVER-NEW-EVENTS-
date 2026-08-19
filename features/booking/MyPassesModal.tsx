"use client";

import { useState } from "react";
import {
  X,
  Sparkles,
  Calendar,
  MapPin,
  QrCode,
  ArrowUpRight,
  Share2,
  Download,
  CheckCircle2,
  Ticket,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useBooking } from "../../context/BookingContext";
import { assetUrl } from "../../utils/assetHelper";
import "./booking.css";

export default function MyPassesModal() {
  const { isMyPassesOpen, closeMyPasses, passes, openBooking } = useBooking();
  const [selectedPassId, setSelectedPassId] = useState<string>(passes[0]?.id || "");
  const [activeTab, setActiveTab] = useState<"ACTIVE" | "PAST">("ACTIVE");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);

  const currentPass = passes.find((p) => p.id === selectedPassId) || passes[0];

  const handleShare = (passNumber: string) => {
    navigator.clipboard?.writeText(`ECHO DIGITAL PASS #${passNumber}`);
    setCopiedId(passNumber);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClose = () => {
    setIsMobileDetailOpen(false);
    closeMyPasses();
  };

  const handleTopCrossClick = () => {
    if (isMobileDetailOpen) {
      // Step backward from full ticket to list of tickets tab
      setIsMobileDetailOpen(false);
    } else {
      // Close the modal
      handleClose();
    }
  };

  const handleBookMore = () => {
    handleClose();
    openBooking({
      title: "Neon Nights",
      category: "Music & Visuals",
      date: "Friday, 22 August 2026",
      time: "08:00 PM",
      venue: "Echo Arena Main Hall",
      city: "Guwahati, Assam",
      image: assetUrl("/images/events/event1.webp"),
      basePrice: 899,
    });
  };

  return (
    <AnimatePresence>
      {isMyPassesOpen && (
        <div className="echo-modal-root" role="dialog" aria-modal="true" aria-label="My Digital Passes Wallet">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="echo-modal-backdrop"
            onClick={handleClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="echo-passes-modal-container"
          >
            {/* Unified Top Header */}
            <div className="echo-passes-modal-header">
              <div className="echo-passes-head-left">
                <div className="echo-wallet-icon">
                  <Ticket size={18} className="echo-text-orange" />
                </div>
                <div>
                  <h3>MY DIGITAL PASSES</h3>
                  <small>
                    {isMobileDetailOpen
                      ? "TAP CROSS (X) TO RETURN TO PASSES"
                      : `AUTHENTICATED VIP WALLET · ${passes.length} PASSES ACTIVE`}
                  </small>
                </div>
              </div>

              {/* Universal Top Cross: Step Backward on Mobile Ticket, or Close Modal */}
              <button
                type="button"
                className="echo-modal-close"
                onClick={handleTopCrossClick}
                aria-label={isMobileDetailOpen ? "Back to ticket list" : "Close digital wallet"}
                title={isMobileDetailOpen ? "Back to ticket list" : "Close wallet"}
              >
                <X size={16} />
              </button>
            </div>

            {/* Content Flex */}
            <div className="echo-passes-modal-body">
              {/* Left Column: Pass Selection List */}
              <div className={`echo-passes-list-column ${isMobileDetailOpen ? "hide-on-mobile" : ""}`}>
                <div className="echo-passes-tabs">
                  <button
                    type="button"
                    className={`echo-pass-tab-btn ${activeTab === "ACTIVE" ? "is-active" : ""}`}
                    onClick={() => setActiveTab("ACTIVE")}
                  >
                    ACTIVE PASSES ({passes.length})
                  </button>
                  <button
                    type="button"
                    className={`echo-pass-tab-btn ${activeTab === "PAST" ? "is-active" : ""}`}
                    onClick={() => setActiveTab("PAST")}
                  >
                    HISTORY
                  </button>
                </div>

                <div className="echo-passes-items">
                  {passes.map((pass) => {
                    const isSelected = pass.id === (currentPass?.id || "");
                    return (
                      <div
                        key={pass.id}
                        className={`echo-pass-list-item ${isSelected ? "is-selected" : ""}`}
                        onClick={() => {
                          setSelectedPassId(pass.id);
                          setIsMobileDetailOpen(true);
                        }}
                        role="button"
                        tabIndex={0}
                      >
                        <img src={pass.image} alt={pass.eventTitle} className="echo-pass-thumb" />
                        <div className="echo-pass-item-info">
                          <span className="echo-pass-tier-tag">{pass.tierName}</span>
                          <h4>{pass.eventTitle}</h4>
                          <small>{pass.date} · {pass.venue}</small>
                        </div>
                        <div className="echo-pass-active-blip" />
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  className="echo-book-more-passes-btn"
                  onClick={handleBookMore}
                >
                  <Sparkles size={14} />
                  <span>BOOK ANOTHER EXPERIENCE</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>

              {/* Right Column: Spacious Full Ticket Pass Display */}
              {currentPass && (
                <div className={`echo-passes-detail-column ${isMobileDetailOpen ? "show-on-mobile" : ""}`}>
                  <div className="echo-wallet-ticket-card">
                    {/* Holographic Foil Header */}
                    <div className="echo-wallet-ticket-foil">
                      <div className="echo-wallet-foil-text">
                        <span>ECHO VERIFIED PASS</span>
                        <span>•</span>
                        <span>{currentPass.serialNumber}</span>
                      </div>
                      <div className="echo-foil-shimmer" />
                    </div>

                    {/* Ticket Visual Hero */}
                    <div className="echo-wallet-hero">
                      <img src={currentPass.image} alt={currentPass.eventTitle} />
                      <div className="echo-wallet-hero-overlay" />
                      <div className="echo-wallet-hero-content">
                        <span className="echo-wallet-category">{currentPass.category}</span>
                        <h2>{currentPass.eventTitle}</h2>
                        <p>{currentPass.tierName} · {currentPass.quantity} {currentPass.quantity === 1 ? "Guest" : "Guests"}</p>
                      </div>
                    </div>

                    {/* Metadata Specs Grid (Clean, Responsive & Well-Spaced) */}
                    <div className="echo-wallet-specs">
                      {/* Date & Time */}
                      <div className="echo-spec-item">
                        <div className="echo-spec-icon-wrap">
                          <Calendar size={13} className="echo-text-orange" />
                        </div>
                        <div className="echo-spec-content">
                          <small>DATE & TIME</small>
                          <strong>{currentPass.date}</strong>
                          <span className="echo-spec-sub">{currentPass.time}</span>
                        </div>
                      </div>

                      {/* Entry Gate */}
                      <div className="echo-spec-item">
                        <div className="echo-spec-icon-wrap">
                          <CheckCircle2 size={13} className="echo-text-orange" />
                        </div>
                        <div className="echo-spec-content">
                          <small>ENTRY GATE</small>
                          <strong>{currentPass.gate}</strong>
                          <span className="echo-spec-sub">Priority Lane</span>
                        </div>
                      </div>

                      {/* Venue & Location (Full Width Span) */}
                      <div className="echo-spec-item echo-spec-span-2">
                        <div className="echo-spec-icon-wrap">
                          <MapPin size={13} className="echo-text-orange" />
                        </div>
                        <div className="echo-spec-content">
                          <small>VENUE & LOCATION</small>
                          <strong>{currentPass.venue}</strong>
                          <span className="echo-spec-sub">{currentPass.city}</span>
                        </div>
                      </div>

                      {/* Zone / Seat Access (Full Width Span) */}
                      <div className="echo-spec-item echo-spec-span-2">
                        <div className="echo-spec-icon-wrap">
                          <Sparkles size={13} className="echo-text-orange" />
                        </div>
                        <div className="echo-spec-content">
                          <small>ZONE / SEAT ACCESS</small>
                          <strong className="echo-text-orange">{currentPass.seatZone}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Perforation Divider */}
                    <div className="echo-pass-divider">
                      <div className="echo-notch-left" />
                      <div className="echo-notch-line" />
                      <div className="echo-notch-right" />
                    </div>

                    {/* QR Code & Scanner Stub */}
                    <div className="echo-wallet-qr-section">
                      <div className="echo-wallet-qr-box">
                        <QrCode size={78} />
                      </div>

                      <div className="echo-wallet-qr-info">
                        <span className="echo-scan-badge">SHOW QR AT GATE</span>
                        <div className="echo-serial-code">
                          <small>PASS SERIAL ID</small>
                          <strong>{currentPass.serialNumber}</strong>
                        </div>
                        <div className="echo-wallet-actions">
                          <button
                            type="button"
                            className="echo-wallet-action-btn"
                            onClick={() => handleShare(currentPass.serialNumber)}
                            title="Copy Pass ID"
                          >
                            <Share2 size={12} />
                            <span>{copiedId === currentPass.serialNumber ? "COPIED!" : "SHARE"}</span>
                          </button>

                          <button
                            type="button"
                            className="echo-wallet-action-btn"
                            onClick={() => alert("Pass saved to offline wallet!")}
                            title="Download Digital Pass"
                          >
                            <Download size={12} />
                            <span>SAVE PASS</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
