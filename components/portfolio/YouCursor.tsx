"use client";

import { useEffect, useRef } from "react";

export function YouCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover)").matches;
    const el = ref.current;
    if (!canHover || !el) {
      document.body.classList.remove("fig-cursor");
      return;
    }

    const onMove = (e: PointerEvent) => {
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="you-cursor" ref={ref} aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path
          fill="#0D99FF"
          stroke="#fff"
          strokeWidth="1.5"
          d="M5 3l14 8-6.5 1.5L9 19z"
        />
      </svg>
      <span className="you-tag">You</span>
    </div>
  );
}
