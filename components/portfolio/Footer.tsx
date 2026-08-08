"use client";

import { useEffect, useState } from "react";

function formatTime(tz: string) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: tz,
  }).format(new Date());
}

export function Footer() {
  const [dubTime, setDubTime] = useState("--:--");
  const [kocTime, setKocTime] = useState("--:--");

  useEffect(() => {
    const tick = () => {
      setDubTime(formatTime("Europe/Dublin"));
      setKocTime(formatTime("Asia/Kolkata"));
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer>
      <div className="foot-inner">
        <span className="saved">All changes saved · © 2026 Ashwin Girish</span>
        <span>
          Dublin <b>{dubTime}</b> · Kochi <b>{kocTime}</b>
        </span>
        <span className="zoom">100%</span>
      </div>
    </footer>
  );
}
