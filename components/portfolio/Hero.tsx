"use client";

import { useEffect, useRef, useState } from "react";
import { QuickConnectButton } from "./QuickConnectContext";

function CommentPin() {
  const [open, setOpen] = useState(false);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pin = pinRef.current;
    if (!pin) return;

    const canHover = window.matchMedia("(hover: hover)").matches;
    const onEnter = () => setOpen(true);
    const onLeave = () => setOpen(false);

    if (canHover) {
      pin.addEventListener("pointerenter", onEnter);
      pin.addEventListener("pointerleave", onLeave);
    }

    const onDocClick = () => setOpen(false);
    document.addEventListener("click", onDocClick);

    return () => {
      pin.removeEventListener("pointerenter", onEnter);
      pin.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("click", onDocClick);
    };
  }, []);

  return (
    <div
      ref={pinRef}
      className={`pin${open ? " open" : ""}`}
      style={{ top: "12%", right: "3.5%" }}
    >
      <button
        className="pin-dot"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        type="button"
      >
        1
      </button>
      <div className="pin-bubble" role="note">
        <b>
          <i style={{ background: "var(--green)" }}>R</i> Recruiter{" "}
          <span>just now</span>
        </b>
        Clean work. When can you start? 👀
      </div>
    </div>
  );
}

function HeroSelection() {
  const selRef = useRef<HTMLDivElement>(null);
  const [dim, setDim] = useState("0 × 0");

  useEffect(() => {
    const sel = selRef.current;
    if (!sel) return;

    const update = () => {
      const r = sel.getBoundingClientRect();
      setDim(`${Math.round(r.width)} × ${Math.round(r.height)}`);
    };

    const ro = new ResizeObserver(update);
    ro.observe(sel);
    update();
    return () => ro.disconnect();
  }, []);

  return (
    <div className="sel" ref={selRef}>
      <h1 className="hero-name">
        Ashwin <span className="grad">Girish</span>
      </h1>
      <span className="sel-box" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
      <span className="sel-dim">{dim}</span>
    </div>
  );
}

export function Hero() {
  return (
    <header className="hero wrap" id="top">
      <div className="frame-label">
        <svg viewBox="0 0 24 24">
          <path d="M6 2v20M18 2v20M2 6h20M2 18h20" />
        </svg>
        Frame 1 · Hero
      </div>
      <div className="hero-frame">
        <CommentPin />
        <div className="status-chip">Available for UX roles · Dublin, Ireland</div>
        <HeroSelection />
        <p className="hero-sub">
          UX designer who turns <strong>messy, human problems</strong> into
          products people enjoy using — from{" "}
          <strong>enterprise HR platforms</strong> to{" "}
          <strong>healthcare journeys</strong>. Currently pursuing an MSc in
          Design Innovation at Maynooth University.
        </p>
        <div className="hero-cta">
          <a
            className="btn btn-blue"
            href="/Ashwin_Girish_Resume_2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            View résumé
            <svg viewBox="0 0 24 24">
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </a>
          <QuickConnectButton className="btn btn-outline">
            Quick connect
          </QuickConnectButton>
        </div>
      </div>
    </header>
  );
}
