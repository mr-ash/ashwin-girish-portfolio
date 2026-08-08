"use client";

import { useEffect, useRef } from "react";

const STAMPS = ["👋", "❤️", "🔥", "✨", "💜", "👏"];

export function BuddyCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const buddy = ref.current;
    const canHover = window.matchMedia("(hover: hover)").matches;
    const noMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!buddy || !canHover || noMotion) {
      if (buddy) buddy.style.display = "none";
      return;
    }

    let bx = window.innerWidth * 0.72;
    let by = window.innerHeight * 0.55;
    let tx = bx;
    let ty = by;
    let lastMove = Date.now();
    let lastStamp = Date.now();
    let stampIx = 0;
    const OFFX = 38;
    const OFFY = 30;
    let rafId = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      lastMove = Date.now();
    };

    const dropStamp = () => {
      const s = document.createElement("div");
      s.className = "stamp";
      s.textContent = STAMPS[stampIx++ % STAMPS.length];
      s.style.left = `${bx + 8}px`;
      s.style.top = `${by - 4}px`;
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 1700);
    };

    const loop = () => {
      const idle = Date.now() - lastMove > 2600;
      const t = performance.now() / 1000;
      const gx = tx + OFFX + (idle ? Math.sin(t * 1.3) * 20 : 0);
      const gy = ty + OFFY + (idle ? Math.cos(t * 1.05) * 14 : 0);
      bx += (gx - bx) * 0.055;
      by += (gy - by) * 0.055;
      buddy.style.left = `${bx}px`;
      buddy.style.top = `${by}px`;

      if (idle && Date.now() - lastStamp > 3600) {
        lastStamp = Date.now();
        dropStamp();
      }
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="buddy" ref={ref} aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path
          fill="#A259FF"
          stroke="#fff"
          strokeWidth="1.5"
          d="M5 3l14 8-6.5 1.5L9 19z"
        />
      </svg>
      <span>Ashwin</span>
    </div>
  );
}
