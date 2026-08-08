"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  CSS_SIZE,
  badgeCanvas,
  buildStickerPNG,
  emojiCanvas,
} from "@/lib/sticker-utils";

const COLORS = [
  "#1E1E1E",
  "#F24E1E",
  "#FF7262",
  "#FFC700",
  "#0ACF83",
  "#0D99FF",
  "#A259FF",
  "#FFFFFF",
];

const EMOJIS = ["🔥", "❤️", "👏", "🚀", "✨", "💡", "🎯", "😎", "🫶", "⭐"];

const BADGES = [
  { text: "HIRE ME", bg: "#0ACF83" },
  { text: "WOW", bg: "#A259FF" },
  { text: "SHIP IT", bg: "#0D99FF" },
  { text: "NICE ✦", bg: "#FF7262" },
];

function enableDrag(el: HTMLDivElement) {
  const canHover = window.matchMedia("(hover: hover)").matches;
  let sx = 0;
  let sy = 0;
  let ox = 0;
  let oy = 0;
  let moved = false;

  const onDown = (e: PointerEvent) => {
    if ((e.target as HTMLElement).classList.contains("stk-x")) return;
    e.preventDefault();
    el.setPointerCapture(e.pointerId);
    el.classList.add("dragging");
    sx = e.clientX;
    sy = e.clientY;
    ox = parseFloat(el.style.left);
    oy = parseFloat(el.style.top);
    moved = false;
  };

  const onMove = (e: PointerEvent) => {
    if (!el.classList.contains("dragging")) return;
    const dx = e.clientX - sx;
    const dy = e.clientY - sy;
    if (Math.abs(dx) + Math.abs(dy) > 3) moved = true;
    const maxX = document.documentElement.scrollWidth - 130;
    el.style.left = `${Math.max(4, Math.min(maxX, ox + dx))}px`;
    el.style.top = `${Math.max(4, oy + dy)}px`;
  };

  const onUp = () => {
    el.classList.remove("dragging");
    if (!moved && !canHover) {
      el.classList.add("show-x");
      setTimeout(() => el.classList.remove("show-x"), 2200);
    }
  };

  el.addEventListener("pointerdown", onDown);
  el.addEventListener("pointermove", onMove);
  el.addEventListener("pointerup", onUp);
  el.addEventListener("pointercancel", onUp);
}

export function StickerStudio() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const undoStack = useRef<ImageData[]>([]);
  const lastRef = useRef<{ x: number; y: number } | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [packTab, setPackTab] = useState(false);
  const [color, setColor] = useState("#1E1E1E");
  const [size, setSize] = useState(4);
  const [erasing, setErasing] = useState(false);
  const [hasInk, setHasInk] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);

  const pos = useCallback((e: PointerEvent | React.PointerEvent) => {
    const cv = canvasRef.current!;
    const r = cv.getBoundingClientRect();
    return {
      x: ((e.clientX - r.left) * CSS_SIZE) / r.width,
      y: ((e.clientY - r.top) * CSS_SIZE) / r.height,
    };
  }, []);

  const snapshot = useCallback(() => {
    const ctx = ctxRef.current;
    const cv = canvasRef.current;
    if (!ctx || !cv) return;
    if (undoStack.current.length > 24) undoStack.current.shift();
    undoStack.current.push(ctx.getImageData(0, 0, cv.width, cv.height));
  }, []);

  const placeSticker = useCallback((dataURL: string) => {
    const el = document.createElement("div");
    el.className = "sticker";
    el.style.transform = `rotate(${(Math.random() * 16 - 8).toFixed(1)}deg)`;
    const img = new Image();
    img.src = dataURL;
    img.alt = "Visitor sticker";
    el.appendChild(img);
    const x = document.createElement("button");
    x.className = "stk-x";
    x.setAttribute("aria-label", "Remove sticker");
    x.textContent = "✕";
    x.addEventListener("click", (ev) => {
      ev.stopPropagation();
      el.remove();
    });
    el.appendChild(x);
    const w = 120;
    el.style.left = `${window.scrollX + window.innerWidth / 2 - w / 2 + (Math.random() * 80 - 40)}px`;
    el.style.top = `${window.scrollY + window.innerHeight / 2 - w / 2 + (Math.random() * 60 - 30)}px`;
    document.body.appendChild(el);
    enableDrag(el);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2400);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);
  const open = useCallback(() => {
    setIsOpen(true);
    setHintVisible(false);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("stk-open", isOpen);
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = CSS_SIZE * DPR;
    cv.height = CSS_SIZE * DPR;
    cv.style.height = "auto";
    const ctx = cv.getContext("2d")!;
    ctx.scale(DPR, DPR);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctxRef.current = ctx;
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!isOpen) setHintVisible(true);
      setTimeout(() => setHintVisible(false), 6000);
    }, 3000);
    return () => clearTimeout(t);
  }, [isOpen]);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 1.5) setHintVisible(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    const cv = canvasRef.current!;
    const ctx = ctxRef.current!;
    cv.setPointerCapture(e.pointerId);
    snapshot();
    setDrawing(true);
    const p = pos(e);
    lastRef.current = p;
    ctx.globalCompositeOperation = erasing ? "destination-out" : "source-over";
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, (erasing ? size * 2 : size) / 2, 0, Math.PI * 2);
    ctx.fill();
    if (!erasing) setHasInk(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drawing || !lastRef.current) return;
    const ctx = ctxRef.current!;
    const p = pos(e);
    ctx.globalCompositeOperation = erasing ? "destination-out" : "source-over";
    ctx.strokeStyle = color;
    ctx.lineWidth = erasing ? size * 2 : size;
    ctx.beginPath();
    ctx.moveTo(lastRef.current.x, lastRef.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    lastRef.current = p;
  };

  const stopDraw = () => {
    setDrawing(false);
    lastRef.current = null;
  };

  const undo = () => {
    const ctx = ctxRef.current!;
    const img = undoStack.current.pop();
    if (img) ctx.putImageData(img, 0, 0);
  };

  const clear = () => {
    snapshot();
    ctxRef.current!.clearRect(0, 0, CSS_SIZE, CSS_SIZE);
    setHasInk(false);
  };

  const makeSticker = () => {
    if (!hasInk || !canvasRef.current) return;
    const png = buildStickerPNG(canvasRef.current);
    close();
    placeSticker(png);
    snapshot();
    ctxRef.current!.clearRect(0, 0, CSS_SIZE, CSS_SIZE);
    setHasInk(false);
  };

  const placeFromCanvas = (c: HTMLCanvasElement) => {
    const png = buildStickerPNG(c);
    close();
    placeSticker(png);
  };

  return (
    <>
      <button className="stk-fab" onClick={open} aria-label="Open sticker studio" type="button">
        <span className="stk-fab-ico">🏷️</span>
        <span className="stk-fab-txt">Sticker studio</span>
        <i className="stk-new">NEW</i>
      </button>
      <div className={`stk-hintbubble${hintVisible ? " show" : ""}`}>
        Psst — draw a sticker or grab one from the pack, and stick it anywhere on
        my portfolio 🎨
      </div>

      <div className="stk-overlay" onClick={close} aria-hidden="true" />
      <div
        className="stk-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Sticker studio"
      >
        <div className="stk-head">
          <div className="stk-title">
            <i>🎨</i> Sticker studio
          </div>
          <button className="stk-close" onClick={close} aria-label="Close" type="button">
            ✕
          </button>
        </div>

        <div className="stk-tabs" role="tablist">
          <button
            className={`stk-tab${!packTab ? " active" : ""}`}
            role="tab"
            aria-selected={!packTab}
            onClick={() => setPackTab(false)}
            type="button"
          >
            ✏️ Draw your own
          </button>
          <button
            className={`stk-tab${packTab ? " active" : ""}`}
            role="tab"
            aria-selected={packTab}
            onClick={() => setPackTab(true)}
            type="button"
          >
            ✨ Sticker pack
          </button>
        </div>

        <div className={`stk-pane${!packTab ? " active" : ""}`} role="tabpanel">
          <div className="stk-canvas-wrap">
            <canvas
              ref={canvasRef}
              className="stk-canvas"
              width={320}
              height={320}
              aria-label="Sticker drawing canvas"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={stopDraw}
              onPointerCancel={stopDraw}
            />
          </div>
          <div className="stk-row">
            <span className="lbl">Color</span>
            {COLORS.map((c) => (
              <button
                key={c}
                className={`swatch${color === c ? " active" : ""}`}
                style={{
                  background: c,
                  border: c === "#FFFFFF" ? "1px solid #E4E3DF" : undefined,
                }}
                data-color={c}
                aria-label={c}
                onClick={() => {
                  setColor(c);
                  setErasing(false);
                }}
                type="button"
              />
            ))}
          </div>
          <div className="stk-row">
            <span className="lbl">Brush &amp; tools</span>
            {[4, 9, 16].map((s) => (
              <button
                key={s}
                className={`size-dot${size === s ? " active" : ""}`}
                data-size={s}
                aria-label={`Brush size ${s}`}
                onClick={() => setSize(s)}
                type="button"
              >
                <i
                  style={{
                    width: s === 4 ? 5 : s === 9 ? 10 : 16,
                    height: s === 4 ? 5 : s === 9 ? 10 : 16,
                  }}
                />
              </button>
            ))}
            <button
              className={`stk-tool${erasing ? " active" : ""}`}
              onClick={() => setErasing((e) => !e)}
              type="button"
            >
              ◻ Eraser
            </button>
            <button className="stk-tool" onClick={undo} type="button">
              ↺ Undo
            </button>
            <button className="stk-tool" onClick={clear} type="button">
              🗑 Clear
            </button>
          </div>
          <div className="stk-actions">
            <button
              className="stk-make"
              disabled={!hasInk}
              onClick={makeSticker}
              type="button"
            >
              Stick it on the portfolio →
            </button>
          </div>
          <p className="stk-hint">
            Draw anything — it gets a die-cut sticker edge. Then drag it anywhere
            on the page.
          </p>
        </div>

        <div className={`stk-pane${packTab ? " active" : ""}`} role="tabpanel">
          <div className="pack-grid">
            {EMOJIS.map((emoji) => (
              <button
                key={emoji}
                className="pack-item"
                aria-label={`${emoji} sticker`}
                onClick={() => placeFromCanvas(emojiCanvas(emoji))}
                type="button"
              >
                {emoji}
              </button>
            ))}
            <div className="pack-badge">
              {BADGES.map((b) => (
                <button
                  key={b.text}
                  className="pack-badge-btn"
                  style={{ background: b.bg }}
                  onClick={() => placeFromCanvas(badgeCanvas(b.text, b.bg))}
                  type="button"
                >
                  {b.text}
                </button>
              ))}
            </div>
          </div>
          <p className="pack-note">
            Tap any sticker — it lands on the page with a die-cut edge, ready to
            drag.
          </p>
        </div>
      </div>

      <div className={`stk-toast${toastVisible ? " show" : ""}`}>
        ✨ Sticker placed — drag it anywhere!
      </div>
    </>
  );
}
