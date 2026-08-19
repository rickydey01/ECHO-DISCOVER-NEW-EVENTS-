"use client";

import { useState } from "react";
import {
  BarChart3,
  Layers,
  Sparkles,
  Ticket,
  Image as ImageIcon,
  BookOpen,
  Tag,
  ArrowLeft,
  Flame,
  LayoutDashboard,
} from "lucide-react";
import type { AdminTab } from "./admin.types";
import { initialAdminMetrics, initialInventoryStock } from "./admin.data";
import LiveStatsOverview from "./components/LiveStatsOverview";
import TicketInventory from "./components/TicketInventory";
import HeroEditor from "./components/HeroEditor";
import PassDeckEditor from "./components/PassDeckEditor";
import FeaturedEditor from "./components/FeaturedEditor";
import CategoriesEditor from "./components/CategoriesEditor";
import GalleryEditor from "./components/GalleryEditor";
import DiscountsManager from "./components/DiscountsManager";
import "./admin.css";

export default function AdminDashboard() {
  const [currentTab, setCurrentTab] = useState<AdminTab>("OVERVIEW");

  return (
    <div className="echo-admin-root">
      {/* Executive Sidebar */}
      <aside className="echo-admin-sidebar">
        <div>
          <div className="echo-admin-brand">
            <h2>ECHO STUDIO</h2>
            <span className="echo-admin-badge">ADMIN</span>
          </div>

          <nav className="echo-admin-nav">
            <span className="echo-admin-nav-group-title">BUSINESS & TELEMETRY</span>
            <button
              type="button"
              className={`echo-admin-nav-btn ${currentTab === "OVERVIEW" ? "is-active" : ""}`}
              onClick={() => setCurrentTab("OVERVIEW")}
            >
              <LayoutDashboard size={16} />
              <span>Executive Overview</span>
            </button>

            <button
              type="button"
              className={`echo-admin-nav-btn ${currentTab === "INVENTORY" ? "is-active" : ""}`}
              onClick={() => setCurrentTab("INVENTORY")}
            >
              <Ticket size={16} />
              <span>Ticket Inventory</span>
            </button>

            <button
              type="button"
              className={`echo-admin-nav-btn ${currentTab === "DISCOUNTS" ? "is-active" : ""}`}
              onClick={() => setCurrentTab("DISCOUNTS")}
            >
              <Tag size={16} />
              <span>Discounts & Promos</span>
            </button>

            <span className="echo-admin-nav-group-title">CONTENT & CMS</span>
            <button
              type="button"
              className={`echo-admin-nav-btn ${currentTab === "HERO_CMS" ? "is-active" : ""}`}
              onClick={() => setCurrentTab("HERO_CMS")}
            >
              <Flame size={16} />
              <span>Hero Stage CMS</span>
            </button>

            <button
              type="button"
              className={`echo-admin-nav-btn ${currentTab === "PASSES_CMS" ? "is-active" : ""}`}
              onClick={() => setCurrentTab("PASSES_CMS")}
            >
              <Ticket size={16} />
              <span>3D Pass Deck CMS</span>
            </button>

            <button
              type="button"
              className={`echo-admin-nav-btn ${currentTab === "FEATURED_CMS" ? "is-active" : ""}`}
              onClick={() => setCurrentTab("FEATURED_CMS")}
            >
              <Layers size={16} />
              <span>Headliners CMS</span>
            </button>

            <button
              type="button"
              className={`echo-admin-nav-btn ${currentTab === "CATEGORIES_CMS" ? "is-active" : ""}`}
              onClick={() => setCurrentTab("CATEGORIES_CMS")}
            >
              <BookOpen size={16} />
              <span>Universes CMS</span>
            </button>

            <button
              type="button"
              className={`echo-admin-nav-btn ${currentTab === "GALLERY_CMS" ? "is-active" : ""}`}
              onClick={() => setCurrentTab("GALLERY_CMS")}
            >
              <ImageIcon size={16} />
              <span>Velocity Archive CMS</span>
            </button>
          </nav>
        </div>

        <div className="echo-admin-sidebar-footer">
          <a href="/" className="echo-admin-exit-btn">
            <ArrowLeft size={15} />
            <span>Return to Live Website</span>
          </a>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <main className="echo-admin-main">
        <header className="echo-admin-topbar">
          <div>
            <h1>
              {currentTab === "OVERVIEW" && "EXECUTIVE BUSINESS OVERVIEW"}
              {currentTab === "INVENTORY" && "REAL-TIME TICKET INVENTORY"}
              {currentTab === "DISCOUNTS" && "DISCOUNT & PROMO CODES"}
              {currentTab === "HERO_CMS" && "HERO STAGE CMS"}
              {currentTab === "PASSES_CMS" && "3D PASS DECK CMS"}
              {currentTab === "FEATURED_CMS" && "FEATURED HEADLINERS CMS"}
              {currentTab === "CATEGORIES_CMS" && "CATEGORIES & UNIVERSES CMS"}
              {currentTab === "GALLERY_CMS" && "VELOCITY ARCHIVE CMS"}
            </h1>
            <p>Authenticated as Owner · ECHO Super-Admin Role</p>
          </div>

          <div className="echo-admin-live-ticker">
            <span className="echo-live-blip" />
            <span>142 LIVE CUSTOMERS ON SITE</span>
          </div>
        </header>

        {/* Tab Switching Content */}
        {currentTab === "OVERVIEW" && (
          <>
            <LiveStatsOverview metrics={initialAdminMetrics} />
            <TicketInventory inventory={initialInventoryStock} />
          </>
        )}

        {currentTab === "INVENTORY" && <TicketInventory inventory={initialInventoryStock} />}

        {currentTab === "DISCOUNTS" && <DiscountsManager />}

        {currentTab === "HERO_CMS" && <HeroEditor />}

        {currentTab === "PASSES_CMS" && <PassDeckEditor />}

        {currentTab === "FEATURED_CMS" && <FeaturedEditor />}

        {currentTab === "CATEGORIES_CMS" && <CategoriesEditor />}

        {currentTab === "GALLERY_CMS" && <GalleryEditor />}
      </main>
    </div>
  );
}
