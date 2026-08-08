import { Reveal } from "./Reveal";

const SWATCHES = [
  { label: "Research", color: "var(--purple)", hex: "A259FF" },
  { label: "Interaction", color: "var(--blue)", hex: "0D99FF" },
  { label: "Prototyping", color: "var(--green)", hex: "0ACF83" },
  { label: "Wireframing", color: "var(--orange)", hex: "FF7262" },
  { label: "Usability", color: "var(--red)", hex: "F24E1E" },
];

export function StylesStrip() {
  return (
    <Reveal className="wrap styles-strip" aria-hidden="true">
      <div className="styles-head">Local styles — what I work with</div>
      <div className="swatches">
        {SWATCHES.map((s) => (
          <div className="sw" key={s.label}>
            <i style={{ background: s.color }} />
            {s.label}
            <span>{s.hex}</span>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
