"use client";

import { useEffect, useState } from "react";
import { ArrowUp, ArrowUpRight, Sparkles, Check, Send, MapPin } from "lucide-react";
import { activeHubsData, footerLinksData } from "./footer.data";
import { useBooking } from "../../context/BookingContext";
import { assetUrl } from "../../utils/assetHelper";
import "./footer.css";

export default function Footer() {
  const [time, setTime] = useState("");
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { openBooking } = useBooking();

  // Live IST local clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenPasses = () => {
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
    <footer id="footer" className="echo-footer">
      {/* Upper Footer CTA Stage */}
      <div className="echo-container echo-footer-top">
        <div className="echo-footer-cta-block">
          <span className="echo-section-badge">
            <span className="echo-section-badge-dot" />
            <span>06 / THE CONCLUSION</span>
          </span>

          <h2 className="echo-footer-headline">
            SEE YOU <br />
            <em>OUT THERE.</em>
          </h2>

          <p className="echo-footer-lead">
            The next chapter in live culture begins the moment you step outside. Secure your pass or join the ECHO VIP circle for secret coordinate drops.
          </p>

          <div className="echo-footer-actions">
            <button
              type="button"
              className="echo-footer-cta-btn"
              onClick={handleOpenPasses}
            >
              <span>GET DIGITAL PASSES</span>
              <ArrowUpRight size={16} />
            </button>

            <a href="#featured-events" className="echo-footer-secondary-btn">
              <span>EXPLORE ALL EVENTS</span>
            </a>
          </div>
        </div>

        {/* VIP Access Newsletter Form */}
        <div className="echo-footer-vip-card">
          <div className="echo-vip-header">
            <Sparkles size={16} className="echo-text-orange" />
            <h4>JOIN THE ECHO VIP GUESTLIST</h4>
          </div>
          <p>Get private secret location alerts, early bird pricing & backstage access codes before public releases.</p>

          {!isSubscribed ? (
            <form onSubmit={handleSubscribe} className="echo-vip-form">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="echo-vip-input"
              />
              <button type="submit" className="echo-vip-submit" aria-label="Subscribe to VIP guestlist">
                <Send size={15} />
              </button>
            </form>
          ) : (
            <div className="echo-vip-success">
              <Check size={16} />
              <span>You're on the list. Watch your inbox for secret drops.</span>
            </div>
          )}

          {/* Real-time IST Clock */}
          <div className="echo-clock-box">
            <small>NORTHEAST INDIA TIME (IST)</small>
            <strong>{time || "16:00:00 PM"}</strong>
          </div>
        </div>
      </div>

      {/* Hubs Grid */}
      <div className="echo-container echo-footer-hubs">
        <div className="echo-hubs-title">ACTIVE HUBS & CITIES</div>
        <div className="echo-hubs-grid">
          {activeHubsData.map((hub) => (
            <div key={hub.city} className="echo-hub-card">
              <div className="echo-hub-top">
                <MapPin size={13} className="echo-text-orange" />
                <strong>{hub.city}</strong>
                <span className="echo-hub-tag">{hub.tag}</span>
              </div>
              <small>{hub.venues}</small>
            </div>
          ))}
        </div>
      </div>

      {/* Giant Animated ECHO Wordmark */}
      <div className="echo-container echo-footer-wordmark-wrap">
        <div className="echo-footer-wordmark">
          ECHO<span className="echo-footer-dot">.</span>
        </div>
      </div>

      {/* Footline Navigation & Credits */}
      <div className="echo-container echo-footer-bottom">
        <div className="echo-footer-links">
          {footerLinksData.map((link) => (
            <a key={link.label} href={link.href}>{link.label}</a>
          ))}
        </div>

        <div className="echo-footer-copy">
          <span>© 2026 ECHO EVENT UNIVERSE. ALL RIGHTS RESERVED.</span>
          <span>CRAFTED FOR THE UNFORGETTABLE NIGHTS.</span>
        </div>

        <button
          type="button"
          className="echo-footer-top-btn"
          onClick={scrollToTop}
          aria-label="Return to top of experience"
        >
          <span>APEX</span>
          <ArrowUp size={14} />
        </button>
      </div>
    </footer>
  );
}
