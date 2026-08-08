import { Reveal } from "./Reveal";

const STICKIES = [
  {
    text: "MSc Design Innovation, Maynooth",
    label: "2025 — present",
    className: "",
  },
  {
    text: "B.Tech CS — First Class with Distinction",
    label: "Model Engineering College",
    className: "sticky-2",
  },
  {
    text: "4× Google UX certificates",
    label: "Coursera",
    className: "sticky-3",
  },
  {
    text: "Dublin ↔ Kerala",
    label: "Two homes, one designer",
    className: "sticky-4",
  },
];

export function About() {
  return (
    <section className="wrap" id="about">
      <Reveal className="sec-head">
        <h2 className="sec-title">About</h2>
        <span className="sec-note">FigJam · notes to self</span>
      </Reveal>
      <Reveal className="about-grid">
        <div>
          <p className="about-lede">
            A designer with an <span className="hl">engineering brain</span> —
            the most interesting problems live between people and systems.
          </p>
          <div className="about-copy">
            <p>
              A Computer Science graduate turned UX designer, I speak fluently
              with developers while advocating fiercely for users. At Maynooth
              University I&apos;m researching how digital platforms sustain
              long-term community engagement.
            </p>
            <p>
              With 200+ hours of community service behind me, designing for
              social impact isn&apos;t a portfolio line — it&apos;s the
              through-line.
            </p>
          </div>
        </div>
        <div className="sticky-board">
          {STICKIES.map((s, i) => (
            <div className={`sticky${i === 0 ? "" : ""}`} key={s.text}>
              {s.text}
              <small>{s.label}</small>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
