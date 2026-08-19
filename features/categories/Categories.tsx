"use client";

import { useState } from "react";
import { ArrowUpRight, Calendar, MapPin, Sparkles } from "lucide-react";
import { categoryNavTabs, curatedCategoryEvents, type CategoryEvent } from "./categories.data";
import { useBooking } from "../../context/BookingContext";
import "./categories.css";

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const { openBooking } = useBooking();

  const activeTab = categoryNavTabs.find((t) => t.id === selectedCategory) || categoryNavTabs[0];

  const filteredEvents =
    selectedCategory === "ALL"
      ? curatedCategoryEvents
      : curatedCategoryEvents.filter((item) => item.category === selectedCategory);

  const handleBook = (event: CategoryEvent) => {
    openBooking({
      title: event.title,
      category: event.subtitle,
      date: event.date,
      time: event.time,
      venue: event.venue,
      city: event.place,
      image: event.image,
      basePrice: parseInt(event.price.replace(/[^0-9]/g, "")) || 899,
    });
  };

  return (
    <section id="categories" className="echo-category-section" aria-labelledby="category-title">
      <div className="echo-category-watermark" aria-hidden="true">
        UNIVERSES
      </div>

      <div className="echo-container">
        <div className="echo-category-frame">
          <div className="echo-category-glow" />

          {/* Section Header */}
          <header className="echo-category-head">
            <div className="echo-category-head-left">
              <div className="echo-section-badge">
                <span className="echo-section-badge-dot" />
                <span>03 / EXPLORE BY UNIVERSE</span>
              </div>
              <h2 id="category-title" className="echo-category-title">
                DISCOVER <br />
                <em>SONIC</em> WORLDS.
              </h2>
            </div>

            <div className="echo-category-head-right">
              <span className="echo-category-curated-badge">
                <Sparkles size={12} />
                <span>{activeTab.tagline}</span>
              </span>
              <p className="echo-category-lead">{activeTab.description}</p>
            </div>
          </header>

          {/* Category Filter Tabs */}
          <nav className="echo-category-tabs" role="tablist" aria-label="Universe filter categories">
            {categoryNavTabs.map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  id={`tab-${tab.id}`}
                  className={`echo-category-tab ${isActive ? "is-active" : ""}`}
                  onClick={() => setSelectedCategory(tab.id)}
                >
                  <span>{tab.name}</span>
                  <span className="echo-tab-count">{tab.count}</span>
                  {isActive && <div className="echo-tab-underline" />}
                </button>
              );
            })}
          </nav>

          {/* Magazine Category Grid (Clean 3-Card Grid) */}
          <div
            className={`echo-category-grid ${filteredEvents.length === 1 ? "echo-category-grid--single" : ""}`}
            role="list"
          >
            {filteredEvents.map((item) => (
              <article
                key={item.id}
                className="echo-cat-card"
                onClick={() => handleBook(item)}
                role="listitem"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleBook(item)}
                aria-label={`${item.title}, ${item.date} at ${item.place}`}
              >
                <div className="echo-cat-card__media">
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <div className="echo-cat-card__overlay" />
                  <span className="echo-cat-card__num">{item.num}</span>
                  <span className="echo-cat-card__tag">{item.tag}</span>
                </div>

                <div className="echo-cat-card__body">
                  <div>
                    <div className="echo-cat-card__meta">
                      <span><Calendar size={11} /> {item.date}</span>
                      <span><MapPin size={11} /> {item.place}</span>
                    </div>

                    <h3 className="echo-cat-card__title">{item.title}</h3>
                    <p className="echo-cat-card__sub">{item.subtitle}</p>
                  </div>

                  <div className="echo-cat-card__footer">
                    <div className="echo-cat-card__price">
                      <small>PASSES FROM</small>
                      <strong>{item.price}</strong>
                    </div>

                    <button
                      type="button"
                      className="echo-cat-card__btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBook(item);
                      }}
                    >
                      <span>GET TICKETS</span>
                      <ArrowUpRight size={13} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
