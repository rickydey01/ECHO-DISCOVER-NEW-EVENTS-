"use client";

import { useEffect, useRef } from "react";
import "./atmosphere.css";

export default function EchoAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;
    let scrollY = window.scrollY;
    let targetScrollY = scrollY;
    let scrollSpeed = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      scrollSpeed = Math.min(Math.abs(currentScroll - scrollY) * 0.05, 4);
      targetScrollY = currentScroll;
      scrollY = currentScroll;
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Particle nodes for subtle floating ambient dust
    const PARTICLE_COUNT = 36;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.6,
      baseAlpha: Math.random() * 0.35 + 0.1,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      pulse: Math.random() * Math.PI * 2,
    }));

    let time = 0;

    const render = () => {
      time += 0.012 + scrollSpeed * 0.004;
      scrollSpeed *= 0.92;

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // 1. Ambient Dynamic Glow Orbs (Subtle Nocturne)
      const grad1 = ctx.createRadialGradient(
        mouseX * 0.8 + width * 0.1,
        mouseY * 0.7 + height * 0.15,
        0,
        mouseX * 0.8 + width * 0.1,
        mouseY * 0.7 + height * 0.15,
        Math.max(width, height) * 0.55
      );
      grad1.addColorStop(0, "rgba(255, 85, 32, 0.045)");
      grad1.addColorStop(0.5, "rgba(99, 102, 241, 0.025)");
      grad1.addColorStop(1, "rgba(5, 5, 8, 0)");

      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      // Secondary floating aura orb (rhythmic breathing)
      const breath = Math.sin(time * 0.8) * 40;
      const grad2 = ctx.createRadialGradient(
        width * 0.85 + Math.cos(time * 0.5) * 80,
        height * 0.4 + breath,
        0,
        width * 0.85 + Math.cos(time * 0.5) * 80,
        height * 0.4 + breath,
        width * 0.45
      );
      grad2.addColorStop(0, "rgba(236, 72, 153, 0.03)");
      grad2.addColorStop(0.6, "rgba(56, 189, 248, 0.015)");
      grad2.addColorStop(1, "rgba(5, 5, 8, 0)");

      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // 2. Continuous Soundwave Lines (ECHO Kinetic Continuum)
      ctx.save();
      const waveCount = 3;
      for (let w = 0; w < waveCount; w++) {
        ctx.beginPath();
        const waveOffset = (w * Math.PI) / 3;
        const waveY = height * (0.35 + w * 0.15) + Math.sin(time * 0.6 + waveOffset) * 25;
        const alpha = 0.035 - w * 0.008;

        ctx.strokeStyle = `rgba(255, 107, 53, ${alpha})`;
        ctx.lineWidth = 1.2;

        for (let x = 0; x <= width; x += 18) {
          const distToMouse = Math.abs(x - mouseX);
          const mouseDisplacement = Math.max(0, 1 - distToMouse / 350) * 40 * Math.sin(time * 2 + x * 0.02);
          const y =
            waveY +
            Math.sin(x * 0.004 + time * 1.2 + waveOffset) * 35 +
            Math.cos(x * 0.008 - time * 0.8) * 20 +
            mouseDisplacement;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }
      ctx.restore();

      // 3. Floating Micro-particles
      ctx.save();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += 0.02;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const currentAlpha = p.baseAlpha * (0.6 + Math.sin(p.pulse) * 0.4);
        ctx.fillStyle = `rgba(245, 245, 245, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="echo-atmosphere" aria-hidden="true">
      <canvas ref={canvasRef} className="echo-atmosphere__canvas" />
      <div className="echo-atmosphere__vignette" />
      <div className="echo-atmosphere__noise" />
    </div>
  );
}
