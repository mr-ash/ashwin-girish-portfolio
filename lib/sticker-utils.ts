const CSS_SIZE = 320;

export function buildStickerPNG(src: HTMLCanvasElement): string {
  const pad = 14;
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  const sil = document.createElement("canvas");
  sil.width = src.width;
  sil.height = src.height;
  const sctx = sil.getContext("2d")!;
  sctx.drawImage(src, 0, 0);
  sctx.globalCompositeOperation = "source-in";
  sctx.fillStyle = "#FFFFFF";
  sctx.fillRect(0, 0, sil.width, sil.height);

  const out = document.createElement("canvas");
  out.width = src.width + pad * 2 * DPR;
  out.height = src.height + pad * 2 * DPR;
  const octx = out.getContext("2d")!;
  const R = 7 * DPR;
  const steps = 24;

  for (let i = 0; i < steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    octx.drawImage(
      sil,
      pad * DPR + Math.cos(a) * R,
      pad * DPR + Math.sin(a) * R,
    );
  }
  octx.drawImage(src, pad * DPR, pad * DPR);
  return out.toDataURL("image/png");
}

export function emojiCanvas(emoji: string): HTMLCanvasElement {
  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  const c = document.createElement("canvas");
  c.width = CSS_SIZE * DPR;
  c.height = CSS_SIZE * DPR;
  const cctx = c.getContext("2d")!;
  cctx.scale(DPR, DPR);
  cctx.font =
    '200px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
  cctx.textAlign = "center";
  cctx.textBaseline = "middle";
  cctx.fillText(emoji, CSS_SIZE / 2, CSS_SIZE / 2 + 12);
  return c;
}

export function badgeCanvas(text: string, bg: string): HTMLCanvasElement {
  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  const c = document.createElement("canvas");
  c.width = CSS_SIZE * DPR;
  c.height = CSS_SIZE * DPR;
  const cctx = c.getContext("2d")!;
  cctx.scale(DPR, DPR);
  const w = 272;
  const h = 104;
  const x = (CSS_SIZE - w) / 2;
  const y = (CSS_SIZE - h) / 2;
  const r = 26;
  cctx.save();
  cctx.translate(CSS_SIZE / 2, CSS_SIZE / 2);
  cctx.rotate(-0.05);
  cctx.translate(-CSS_SIZE / 2, -CSS_SIZE / 2);
  cctx.fillStyle = bg;
  cctx.beginPath();
  cctx.moveTo(x + r, y);
  cctx.arcTo(x + w, y, x + w, y + h, r);
  cctx.arcTo(x + w, y + h, x, y + h, r);
  cctx.arcTo(x, y + h, x, y, r);
  cctx.arcTo(x, y, x + w, y, r);
  cctx.closePath();
  cctx.fill();
  cctx.fillStyle = "#FFFFFF";
  cctx.font = "800 46px Inter,sans-serif";
  cctx.textAlign = "center";
  cctx.textBaseline = "middle";
  cctx.fillText(text, CSS_SIZE / 2, CSS_SIZE / 2 + 2);
  cctx.restore();
  return c;
}

export { CSS_SIZE };
