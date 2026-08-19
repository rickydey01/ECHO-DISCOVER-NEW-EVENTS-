"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent,
  type MouseEvent,
} from "react";
import { Calendar, Music } from "lucide-react";
import { heroEventsData } from "./hero.data";
import { heroMotionConfig } from "./hero.animations";
import { useBooking } from "../../context/BookingContext";
import { soundEngine } from "../../utils/audioSynthesizer";
import "./hero.css";

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [isArrived, setIsArrived] = useState(false);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const isDraggingMouse = useRef(false);
  const mouseStartX = useRef(0);
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);
  const { openBooking } = useBooking();

  const activeEvent = heroEventsData[activeIndex];

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % heroEventsData.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + heroEventsData.length) % heroEventsData.length);
  }, []);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  // Arrival entrance trigger on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsArrived(true);
    }, 80);
    return () => clearTimeout(timer);
  }, []);

  // Autoplay loop
  useEffect(() => {
    if (isPaused) return;
    autoplayTimer.current = setInterval(nextSlide, heroMotionConfig.autoplayIntervalMs);
    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    };
  }, [nextSlide, isPaused]);

  // Audio Engine Synchronization
  useEffect(() => {
    const unsubscribe = soundEngine.subscribe((playing) => {
      setIsPlayingPreview(playing);
    });
    return () => unsubscribe();
  }, []);

  // Touch Swipe Handling for Mobile / Tablet
  const handleTouchStart = (e: TouchEvent<HTMLElement>) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (e: TouchEvent<HTMLElement>) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    if (touchDeltaX.current > heroMotionConfig.swipeThresholdPx) {
      prevSlide();
    } else if (touchDeltaX.current < -heroMotionConfig.swipeThresholdPx) {
      nextSlide();
    }
    touchDeltaX.current = 0;
    setIsPaused(false);
  };

  // Desktop Mouse Drag / Swipe Handling
  const handleMouseDown = (e: MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).closest("button, a, input")) return;
    isDraggingMouse.current = true;
    mouseStartX.current = e.clientX;
    setIsPaused(true);
  };

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!isDraggingMouse.current) return;
    const delta = e.clientX - mouseStartX.current;
    if (delta > heroMotionConfig.dragThresholdPx) {
      prevSlide();
      isDraggingMouse.current = false;
    } else if (delta < -heroMotionConfig.dragThresholdPx) {
      nextSlide();
      isDraggingMouse.current = false;
    }
  };

  const handleMouseUp = () => {
    isDraggingMouse.current = false;
    setIsPaused(false);
  };

  const handleBookCurrent = () => {
    openBooking({
      title: activeEvent.title,
      category: activeEvent.category,
      date: activeEvent.fullDate,
      time: activeEvent.time,
      venue: activeEvent.venue,
      city: activeEvent.location,
      image: activeEvent.image,
      basePrice: parseInt(activeEvent.price.replace(/[^0-9]/g, "")) || 899,
    });
  };

  return (
    <section
      id="home"
      className={`echo-hero ${isArrived ? "is-arrived" : "is-entering"}`}
      aria-label="ECHO stage gateway"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        isDraggingMouse.current = false;
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Background Image Carousel with Cross-fade */}
      <div className="echo-hero__backdrop-deck">
        {heroEventsData.map((event, idx) => {
          const isCurrent = idx === activeIndex;
          return (
            <div
              key={event.id}
              className={`echo-hero__backdrop-slide ${isCurrent ? "is-active" : ""}`}
              aria-hidden={!isCurrent}
            >
              <img
                src={event.image}
                alt={event.title}
                className="echo-hero__backdrop-image"
                loading={idx === 0 ? "eager" : "lazy"}
                draggable={false}
              />
              <div className="echo-hero__gradient-curtain" />
              <div className="echo-hero__radial-vignette" />
            </div>
          );
        })}
      </div>

      {/* Main Hero Stage with Orchestrated Arrival Stagger */}
      <div className="echo-container echo-hero__stage">
        {/* Top bar: Clean live status pill + Sweet Pill-Shaped Music Preview */}
        <div className="echo-hero__telemetry echo-arrival-item echo-arrival-1">
          <div className="echo-hero__status-pill">
            <span className="echo-live-blip" />
            <span>{activeEvent.label}</span>
          </div>

          {/* Sweet Pill Shaped Music Toggle */}
          <button
            type="button"
            className={`echo-hero__sound-sweet-pill ${isPlayingPreview ? "is-playing" : ""}`}
            onClick={() => {
              const active = soundEngine.toggle();
              setIsPlayingPreview(active);
            }}
            aria-label="Toggle live audio preview"
            title={isPlayingPreview ? "Stop Live Music" : "Play Live Electronic Music"}
          >
            <div className={`echo-waveform ${isPlayingPreview ? "is-playing" : ""}`}>
              <span /><span /><span /><span />
            </div>
            <div className="echo-sweet-music-meta">
              <Music size={11} className="echo-text-orange" />
              <span>{isPlayingPreview ? "PLAYING AUDIO" : activeEvent.soundPreviewName}</span>
            </div>
          </button>
        </div>

        {/* Cinematic Headline & Story */}
        <div className="echo-hero__main-headline">
          <div className="echo-hero__kicker echo-arrival-item echo-arrival-2">
            <span className="echo-hero__kicker-num">0{activeEvent.id}</span>
            <span className="echo-hero__kicker-sep">/</span>
            <span className="echo-hero__kicker-cat">{activeEvent.category}</span>
          </div>

          <h1 className="echo-hero__title echo-arrival-item echo-arrival-3" key={activeEvent.id}>
            <span className="echo-hero__title-line">{activeEvent.title}</span>
          </h1>

          <p className="echo-hero__tagline echo-arrival-item echo-arrival-4">{activeEvent.tagline}</p>
        </div>

        {/* Free-Floating Info Row with Left-Shifted Fat Pill Button */}
        <div className="echo-hero__dock-clean echo-arrival-item echo-arrival-5">
          {/* Left: Date & Location stacked with generous spacing */}
          <div className="echo-hero__meta-group">
            <div className="echo-hero__meta-item">
              <Calendar size={14} className="echo-text-orange" />
              <div>
                <small>DATE & TIME</small>
                <strong>{activeEvent.date} · {activeEvent.time}</strong>
              </div>
            </div>

            <div className="echo-hero__meta-item">
              <div className="echo-meta-dot" />
              <div>
                <small>LOCATION</small>
                <strong>{activeEvent.venue}, {activeEvent.city}</strong>
              </div>
            </div>
          </div>

          {/* Right: Master Glass-Shine "GET PASSES" Button (Centered Two-Line Luxury Layout) */}
          <div className="echo-hero__actions">
            <button
              type="button"
              className="echo-hero__primary-btn"
              onClick={handleBookCurrent}
              aria-label={`Get passes for ${activeEvent.title} starting at ${activeEvent.price}`}
            >
              <span className="echo-btn-glass-glare" />
              <div className="echo-btn-content-centered">
                <span className="echo-btn-title">GET PASSES</span>
                <span className="echo-btn-price">{activeEvent.price}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Centered, Minimal Dot Indicators */}
        <div className="echo-hero__pagination-center echo-arrival-item echo-arrival-6" aria-label="Hero slide indicators">
          {heroEventsData.map((evt, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={evt.id}
                type="button"
                className={`echo-hero__dot-btn ${isActive ? "is-active" : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`Jump to slide ${index + 1}: ${evt.title}`}
              >
                <span className="echo-dot-bar" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
