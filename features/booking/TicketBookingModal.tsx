"use client";

import { useState, useEffect } from "react";
import {
  X,
  Check,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  QrCode,
  CreditCard,
  Smartphone,
  Building2,
  Lock,
  Ticket,
  User,
  Mail,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useBooking } from "../../context/BookingContext";
import { soundEngine } from "../../utils/audioSynthesizer";
import { assetUrl } from "../../utils/assetHelper";
import "./booking.css";

type BookingStep = "RESERVATION" | "PAYMENT" | "PROCESSING" | "CONFIRMED";
type PaymentMethod = "UPI" | "CARD" | "NETBANKING";

export default function TicketBookingModal() {
  const { isOpen, booking, closeBooking, addPass, openMyPasses, profile } = useBooking();

  // Step flow state
  const [step, setStep] = useState<BookingStep>("RESERVATION");
  const [tier, setTier] = useState<"GA" | "VIP" | "BACKSTAGE">(booking.initialTier || "GA");
  const [quantity, setQuantity] = useState(1);

  // Customer Contact Info
  const [customerName, setCustomerName] = useState(profile?.name || "Alex Bordoloi");
  const [customerEmail, setCustomerEmail] = useState(profile?.email || "alex.bordoloi@echo.live");

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("UPI");
  const [selectedUpiApp, setSelectedUpiApp] = useState("gpay");
  const [selectedBank, setSelectedBank] = useState("HDFC");
  const [cardNumber, setCardNumber] = useState("4532 8900 1234 8819");
  const [cardExpiry, setCardExpiry] = useState("08/29");
  const [cardCvv, setCardCvv] = useState("742");
  const [cardHolder, setCardHolder] = useState(customerName);

  // Processing telemetry
  const [processingStatus, setProcessingStatus] = useState("CONNECTING TO BANK GATEWAY...");
  const [passCode, setPassCode] = useState("ECH-9942-VIP");

  // Sync tier from booking details when opened
  useEffect(() => {
    if (booking.initialTier) {
      setTier(booking.initialTier);
    }
  }, [booking.initialTier]);

  // Pricing calculations
  const tierMultiplier = tier === "GA" ? 1 : tier === "VIP" ? 2.2 : 3.8;
  const tierName =
    tier === "GA"
      ? "General Admission"
      : tier === "VIP"
      ? "VIP Mezzanine Pass"
      : "All-Access Backstage Experience";
  const singlePrice = Math.round((booking.basePrice || 899) * tierMultiplier);
  const subtotal = singlePrice * quantity;
  const bookingFee = Math.round(subtotal * 0.05);
  const totalPrice = subtotal + bookingFee;

  // Processing step timer animation (3.8s total duration)
  useEffect(() => {
    let t1: NodeJS.Timeout;
    let t2: NodeJS.Timeout;
    let t3: NodeJS.Timeout;
    let t4: NodeJS.Timeout;

    if (step === "PROCESSING") {
      soundEngine.playSfx("select");
      setProcessingStatus("AUTHENTICATING SECURE BANKING GATEWAY...");

      t1 = setTimeout(() => {
        setProcessingStatus("VERIFYING 256-BIT CRYPTOGRAPHIC LEDGER...");
      }, 1000);

      t2 = setTimeout(() => {
        setProcessingStatus("RESERVING STAGE SEAT & MINTING QR PASS...");
      }, 2100);

      t3 = setTimeout(() => {
        setProcessingStatus("PAYMENT CONFIRMED! ISSUING VIP DIGITAL PASS...");
      }, 3100);

      t4 = setTimeout(() => {
        const newCode = `ECH-2026-${Math.floor(1000 + Math.random() * 9000)}-${tier}`;
        setPassCode(newCode);

        // Add to digital wallet context
        addPass({
          id: `pass-${Date.now()}`,
          serialNumber: newCode,
          eventTitle: booking.title,
          category: booking.category.toUpperCase(),
          date: booking.date,
          time: booking.time,
          venue: booking.venue,
          city: booking.city,
          image: booking.image || assetUrl("/images/events/event1.webp"),
          tierName: tierName,
          quantity: quantity,
          totalPaid: totalPrice,
          status: "ACTIVE",
          gate: tier === "GA" ? "NORTH GATE 01" : tier === "VIP" ? "FAST TRACK GATE 02" : "ALL-ACCESS BACKSTAGE GATE",
          seatZone: tier === "GA" ? "MAIN ARENA FLOOR" : tier === "VIP" ? "MEZZANINE LOUNGE · ROW A" : "VIP ARTIST ENCLAVE",
        });

        soundEngine.playSfx("hover");
        setStep("CONFIRMED");
      }, 3800);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [step, booking, tier, quantity, tierName, totalPrice, addPass]);

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playSfx("select");
    setStep("PAYMENT");
  };

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playSfx("select");
    setStep("PROCESSING");
  };

  const handleClose = () => {
    setStep("RESERVATION");
    setQuantity(1);
    setTier("GA");
    closeBooking();
  };

  const handleOpenWallet = () => {
    handleClose();
    setTimeout(() => {
      openMyPasses();
    }, 200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="echo-modal-root" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="echo-modal-backdrop"
            onClick={step === "PROCESSING" ? undefined : handleClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="echo-modal-container"
          >
            {/* Close Button */}
            {step !== "PROCESSING" && (
              <button
                type="button"
                className="echo-modal-close"
                onClick={handleClose}
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            )}

            {/* =========================================================
                STEP 1: RESERVATION & PASS SELECTION (Compact One-Page Fit)
                ========================================================= */}
            {step === "RESERVATION" && (
              <div className="echo-modal-body-fit">
                {/* Compact Header Row */}
                <div className="echo-compact-event-header">
                  <div className="echo-compact-thumb-wrap">
                    <img
                      src={booking.image || assetUrl("/images/events/event1.webp")}
                      alt={booking.title}
                      className="echo-compact-thumb"
                    />
                  </div>
                  <div className="echo-compact-header-info">
                    <div className="echo-compact-tag-row">
                      <span className="echo-compact-tag">{booking.category || "ECHO PASS"}</span>
                      <span className="echo-compact-date">{booking.date}</span>
                    </div>
                    <h4>{booking.title}</h4>
                    <p>{booking.venue}, {booking.city}</p>
                  </div>
                </div>

                <form onSubmit={handleProceedToPayment} className="echo-compact-form">
                  {/* Step Tracker Indicator */}
                  <div className="echo-checkout-tracker">
                    <span className="echo-tracker-step is-active">01 RESERVATION</span>
                    <span className="echo-tracker-divider" />
                    <span className="echo-tracker-step">02 PAYMENT</span>
                    <span className="echo-tracker-divider" />
                    <span className="echo-tracker-step">03 TICKET PASS</span>
                  </div>

                  {/* 3-Column Compact Tier Selector */}
                  <div className="echo-compact-section">
                    <label className="echo-compact-label">SELECT PASS TIER</label>
                    <div className="echo-compact-tiers-grid">
                      <button
                        type="button"
                        className={`echo-tier-pill ${tier === "GA" ? "is-active" : ""}`}
                        onClick={() => setTier("GA")}
                      >
                        <span className="echo-tier-pill-badge">GA</span>
                        <div className="echo-tier-pill-name">General</div>
                        <div className="echo-tier-pill-price">₹{Math.round(booking.basePrice * 1)}</div>
                      </button>

                      <button
                        type="button"
                        className={`echo-tier-pill ${tier === "VIP" ? "is-active" : ""}`}
                        onClick={() => setTier("VIP")}
                      >
                        <span className="echo-tier-pill-badge is-vip">VIP</span>
                        <div className="echo-tier-pill-name">Mezzanine</div>
                        <div className="echo-tier-pill-price">₹{Math.round(booking.basePrice * 2.2)}</div>
                      </button>

                      <button
                        type="button"
                        className={`echo-tier-pill ${tier === "BACKSTAGE" ? "is-active" : ""}`}
                        onClick={() => setTier("BACKSTAGE")}
                      >
                        <span className="echo-tier-pill-badge is-backstage">STAGE</span>
                        <div className="echo-tier-pill-name">Backstage</div>
                        <div className="echo-tier-pill-price">₹{Math.round(booking.basePrice * 3.8)}</div>
                      </button>
                    </div>
                  </div>

                  {/* Guest Contact Row */}
                  <div className="echo-compact-section">
                    <label className="echo-compact-label">GUEST CONTACT</label>
                    <div className="echo-checkout-inputs-grid">
                      <div className="echo-checkout-input-wrap">
                        <User size={13} className="echo-input-icon" />
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="echo-checkout-input"
                          required
                        />
                      </div>
                      <div className="echo-checkout-input-wrap">
                        <Mail size={13} className="echo-input-icon" />
                        <input
                          type="email"
                          placeholder="your.email@echo.live"
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          className="echo-checkout-input"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Quantity Stepper & Price Summary Row */}
                  <div className="echo-compact-summary-row">
                    <div className="echo-qty-picker">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span>{quantity} {quantity === 1 ? "Pass" : "Passes"}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.min(8, quantity + 1))}
                        disabled={quantity >= 8}
                      >
                        +
                      </button>
                    </div>

                    <div className="echo-compact-total-box">
                      <small>TOTAL PAYABLE</small>
                      <strong>₹{totalPrice.toLocaleString("en-IN")}</strong>
                    </div>
                  </div>

                  {/* Trust Badge */}
                  <div className="echo-modal-trust">
                    <ShieldCheck size={14} className="echo-text-orange" />
                    <span>Official Entry Guarantee · Instant QR Pass · 100% Refund Protection</span>
                  </div>

                  {/* Bottom Action CTA Button (100% Visible & Centered) */}
                  <div className="echo-compact-cta-wrap">
                    <button type="submit" className="echo-modal-submit-btn">
                      <span>COMPLETE RESERVATION · PAY ₹{totalPrice.toLocaleString("en-IN")}</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* =========================================================
                STEP 2: PAYMENT METHOD & GATEWAY SELECTION
                ========================================================= */}
            {step === "PAYMENT" && (
              <div className="echo-modal-body-fit">
                <form onSubmit={handleConfirmPayment} className="echo-compact-form echo-payment-flow">
                  {/* Step Tracker Header */}
                  <div className="echo-checkout-tracker">
                    <span className="echo-tracker-step is-completed">
                      <Check size={11} /> RESERVATION
                    </span>
                    <span className="echo-tracker-divider is-active" />
                    <span className="echo-tracker-step is-active">02 PAYMENT</span>
                    <span className="echo-tracker-divider" />
                    <span className="echo-tracker-step">03 TICKET PASS</span>
                  </div>

                  {/* Order Quick Summary Header */}
                  <div className="echo-payment-header">
                    <div>
                      <h3>Select Payment Method</h3>
                      <p style={{ fontSize: "11px", color: "var(--echo-muted)" }}>
                        {booking.title} · {tierName} ({quantity} {quantity === 1 ? "Pass" : "Passes"})
                      </p>
                    </div>
                    <div className="echo-payment-amount-badge">
                      <span>TOTAL</span>
                      <strong>₹{totalPrice.toLocaleString("en-IN")}</strong>
                    </div>
                  </div>

                  {/* Payment Method Selector Tabs */}
                  <div className="echo-payment-tabs">
                    <button
                      type="button"
                      className={`echo-payment-tab-btn ${paymentMethod === "UPI" ? "is-active" : ""}`}
                      onClick={() => setPaymentMethod("UPI")}
                    >
                      <Smartphone size={14} />
                      <span>UPI / QR</span>
                    </button>

                    <button
                      type="button"
                      className={`echo-payment-tab-btn ${paymentMethod === "CARD" ? "is-active" : ""}`}
                      onClick={() => setPaymentMethod("CARD")}
                    >
                      <CreditCard size={14} />
                      <span>Card</span>
                    </button>

                    <button
                      type="button"
                      className={`echo-payment-tab-btn ${paymentMethod === "NETBANKING" ? "is-active" : ""}`}
                      onClick={() => setPaymentMethod("NETBANKING")}
                    >
                      <Building2 size={14} />
                      <span>Net Banking</span>
                    </button>
                  </div>

                  {/* TAB 1: UPI PAYMENT */}
                  {paymentMethod === "UPI" && (
                    <div className="echo-payment-panel">
                      {/* Desktop / Tablet: Dynamic QR Code */}
                      <div className="echo-upi-desktop-box">
                        <div className="echo-qr-code-frame">
                          <QrCode size={88} className="echo-qr-svg" />
                          <span className="echo-qr-brand">ECHO SECURE UPI</span>
                        </div>

                        <div className="echo-upi-qr-meta">
                          <div className="echo-upi-badge">SCAN TO PAY ₹{totalPrice.toLocaleString("en-IN")}</div>
                          <p>Scan using Google Pay, PhonePe, Paytm, or CRED.</p>
                          <div className="echo-upi-id-row">
                            <span>UPI ID:</span>
                            <strong>echo.vip@hdfcbank</strong>
                          </div>
                        </div>
                      </div>

                      {/* Mobile: App Selector */}
                      <div className="echo-upi-mobile-box">
                        <label className="echo-compact-label">INSTANT UPI APPS</label>
                        <div className="echo-upi-apps-grid">
                          {[
                            { id: "gpay", name: "Google Pay", color: "#4285F4" },
                            { id: "phonepe", name: "PhonePe", color: "#5f259f" },
                            { id: "paytm", name: "Paytm UPI", color: "#00baf2" },
                            { id: "cred", name: "CRED UPI", color: "#e11d48" },
                          ].map((app) => (
                            <button
                              key={app.id}
                              type="button"
                              className={`echo-upi-app-btn ${selectedUpiApp === app.id ? "is-active" : ""}`}
                              onClick={() => setSelectedUpiApp(app.id)}
                            >
                              <div
                                className="echo-upi-app-dot"
                                style={{ background: app.color }}
                              />
                              <span>{app.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: CREDIT / DEBIT CARD */}
                  {paymentMethod === "CARD" && (
                    <div className="echo-payment-panel">
                      <div className="echo-card-entry-container">
                        <div className="echo-card-field">
                          <label>CARD NUMBER</label>
                          <div className="echo-checkout-input-wrap">
                            <CreditCard size={13} className="echo-input-icon" />
                            <input
                              type="text"
                              placeholder="4532 8900 1234 8819"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              className="echo-checkout-input"
                            />
                          </div>
                        </div>

                        <div className="echo-checkout-inputs-grid">
                          <div className="echo-card-field">
                            <label>EXPIRY</label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              className="echo-checkout-input"
                            />
                          </div>

                          <div className="echo-card-field">
                            <label>CVV / CVC</label>
                            <div className="echo-checkout-input-wrap">
                              <Lock size={13} className="echo-input-icon" />
                              <input
                                type="password"
                                placeholder="•••"
                                maxLength={4}
                                value={cardCvv}
                                onChange={(e) => setCardCvv(e.target.value)}
                                className="echo-checkout-input"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: NETBANKING */}
                  {paymentMethod === "NETBANKING" && (
                    <div className="echo-payment-panel">
                      <label className="echo-compact-label">POPULAR BANKS</label>
                      <div className="echo-banks-grid">
                        {[
                          { id: "HDFC", name: "HDFC Bank" },
                          { id: "ICICI", name: "ICICI Bank" },
                          { id: "SBI", name: "State Bank of India" },
                          { id: "AXIS", name: "Axis Bank" },
                          { id: "KOTAK", name: "Kotak Mahindra" },
                          { id: "OTHER", name: "All Other Banks" },
                        ].map((bank) => (
                          <button
                            key={bank.id}
                            type="button"
                            className={`echo-bank-btn ${selectedBank === bank.id ? "is-active" : ""}`}
                            onClick={() => setSelectedBank(bank.id)}
                          >
                            <Building2 size={13} />
                            <span>{bank.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Security Note */}
                  <div className="echo-modal-trust">
                    <Lock size={13} className="echo-text-orange" />
                    <span>256-Bit SSL Bank Level Encryption · PCI-DSS Compliant Demo Gateway</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="echo-compact-cta-wrap echo-dual-actions">
                    <button
                      type="button"
                      className="echo-back-btn"
                      onClick={() => setStep("RESERVATION")}
                    >
                      Back
                    </button>
                    <button type="submit" className="echo-modal-submit-btn">
                      <span>CONFIRM & PAY ₹{totalPrice.toLocaleString("en-IN")}</span>
                      <Check size={15} />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* =========================================================
                STEP 3: PAYMENT PROCESSING RADAR (3.8 SECONDS)
                ========================================================= */}
            {step === "PROCESSING" && (
              <div className="echo-modal-processing">
                <div className="echo-processing-radar">
                  <div className="echo-radar-pulse-ring" />
                  <div className="echo-radar-pulse-ring delay-1" />
                  <div className="echo-radar-pulse-ring delay-2" />
                  <div className="echo-radar-center">
                    <Lock size={24} className="echo-text-orange" />
                  </div>
                </div>

                <span className="echo-processing-eyebrow">SECURING TRANSACTION</span>
                <h3 className="echo-processing-title">{processingStatus}</h3>
                <p className="echo-processing-sub">
                  Authorizing ₹{totalPrice.toLocaleString("en-IN")} with banking ledger...
                </p>

                <div className="echo-processing-bar-wrap">
                  <div className="echo-processing-bar-fill" />
                </div>
              </div>
            )}

            {/* =========================================================
                STEP 4: FINAL CONFIRMED PASS VIEW (Zero Cutoff)
                ========================================================= */}
            {step === "CONFIRMED" && (
              <div className="echo-modal-body-fit echo-modal-confirmed-view">
                <div className="echo-success-head-row">
                  <div className="echo-success-icon">
                    <Check size={20} strokeWidth={3} />
                  </div>
                  <div>
                    <span className="echo-success-eyebrow">RESERVATION CONFIRMED</span>
                    <h3>You're on the Guestlist!</h3>
                  </div>
                </div>

                {/* Digital Ticket Pass Card */}
                <div className="echo-digital-pass">
                  <div className="echo-pass-glow" />

                  <div className="echo-pass-top">
                    <div>
                      <span className="echo-pass-brand">ECHO // OFFICIAL ACCESS PASS</span>
                      <h4>{booking.title}</h4>
                      <small>
                        {tierName} · {quantity} {quantity === 1 ? "Guest Pass" : "Guest Passes"}
                      </small>
                    </div>
                    <div className="echo-pass-badge">
                      <Sparkles size={11} /> VERIFIED
                    </div>
                  </div>

                  <div className="echo-pass-divider">
                    <div className="echo-notch-left" />
                    <div className="echo-notch-line" />
                    <div className="echo-notch-right" />
                  </div>

                  <div className="echo-pass-bottom">
                    <div className="echo-pass-qr-wrap">
                      <QrCode size={64} />
                      <span style={{ fontSize: "7.5px", color: "var(--echo-muted)", marginTop: "2px" }}>GATE SCAN</span>
                    </div>

                    <div className="echo-pass-info">
                      <div className="echo-pass-code">
                        <small>PASS SERIAL ID</small>
                        <strong>{passCode}</strong>
                      </div>
                      <div className="echo-pass-meta-grid-2">
                        <div>
                          <small>DATE & TIME</small>
                          <p>{booking.date}</p>
                          <p style={{ color: "var(--echo-orange)" }}>{booking.time}</p>
                        </div>
                        <div>
                          <small>VENUE</small>
                          <p>{booking.venue}</p>
                          <p style={{ color: "var(--echo-muted)" }}>{booking.city}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Confirmation Footer Actions (Comfortably visible, zero cutoff) */}
                <div className="echo-confirmed-footer-actions">
                  <button
                    type="button"
                    className="echo-modal-submit-btn"
                    onClick={handleOpenWallet}
                  >
                    <Ticket size={14} />
                    <span>VIEW IN MY PASSES WALLET</span>
                  </button>

                  <button
                    type="button"
                    className="echo-back-btn"
                    onClick={handleClose}
                  >
                    Return to Experience
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
