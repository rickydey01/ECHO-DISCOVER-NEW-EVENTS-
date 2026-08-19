"use client";

import { Home, Compass, Ticket } from "lucide-react";
import { useBooking } from "../../context/BookingContext";
import { assetUrl } from "../../utils/assetHelper";

export default function MobileAppDock() {
  const { openMyPasses, openUserProfile, passes, profile } = useBooking();

  return (
    <aside className="echo-mobile-app-dock" aria-label="Mobile App Dock">
      <div className="echo-dock-pill">
        <a href="#home" className="echo-dock-item" aria-label="Home">
          <Home size={18} />
          <span>Home</span>
        </a>

        <a href="#featured-events" className="echo-dock-item" aria-label="Featured">
          <Compass size={18} />
          <span>Events</span>
        </a>

        <button
          type="button"
          className="echo-dock-item echo-dock-item-badge"
          onClick={openMyPasses}
          aria-label="My Passes"
        >
          <Ticket size={18} />
          <span>Passes</span>
          {passes.length > 0 && <span className="echo-dock-badge-dot" />}
        </button>

        {/* Story Gradient Ring Avatar Button */}
        <button
          type="button"
          className="echo-dock-item echo-dock-story-btn"
          onClick={openUserProfile}
          aria-label="VIP Profile"
        >
          <div className="echo-story-ring echo-story-ring-dock">
            <div className="echo-story-inner">
              <img
                src={profile?.avatar || assetUrl("/images/hero/hero1.webp")}
                alt="User VIP Profile"
                className="echo-story-avatar-img"
              />
            </div>
          </div>
          <span>Profile</span>
        </button>
      </div>
    </aside>
  );
}
