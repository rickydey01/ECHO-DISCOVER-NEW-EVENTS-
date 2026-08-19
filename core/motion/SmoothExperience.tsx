"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothExperience() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Butterfly spring momentum smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.5,
      infinite: false,
      autoRaf: false,
    });

    // Synchronize Lenis with GSAP Ticker for 60-144hz displays
    const onTick = (time: number) => {
      lenis.raf(time * 1000);
      ScrollTrigger.update();
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Track scroll progress for the top indicator
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;
      document.documentElement.style.setProperty(
        "--echo-scroll-progress",
        progress.toFixed(4)
      );
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      gsap.ticker.remove(onTick);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="echo-scroll-ui" aria-hidden="true">
      <div className="echo-scroll-progress" />
    </div>
  );
}
