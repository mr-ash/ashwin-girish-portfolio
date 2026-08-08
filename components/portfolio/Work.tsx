import { Reveal } from "./Reveal";

export function Work() {
  return (
    <section className="wrap" id="work">
      <Reveal className="sec-head">
        <h2 className="sec-title">Selected work</h2>
        <span className="sec-note">Featured case studies · 2</span>
      </Reveal>

      <div className="collab orange c2" style={{ top: "34px", right: "9%" }}>
        <svg viewBox="0 0 24 24">
          <path
            stroke="#fff"
            strokeWidth="1.5"
            d="M5 3l14 8-6.5 1.5L9 19z"
          />
        </svg>
        <span>Hiring manager 👀</span>
      </div>

      <Reveal className="case-card" data-name="Frame 2 · Case study" aria-hidden>
        <div className="case-info">
          <div className="case-chips">
            <span className="case-chip">Mewurk Technologies</span>
            <span className="case-chip">HRMS Application</span>
            <span className="case-chip">UI/UX Case Study</span>
          </div>
          <h3 className="case-title">Mewurk — Timesheet</h3>
          <p className="case-desc">
            Time tracking had become a challenge — scattered entries, delayed
            approvals, and recurring payroll errors. I set out to{" "}
            <strong>simplify the process</strong>: effortless logging for
            employees, real-time visibility for managers, and accuracy &amp;
            compliance for HR.
          </p>
          <div className="case-stats">
            <div>
              <b>8</b>
              <span>Interviews</span>
            </div>
            <div>
              <b>3</b>
              <span>Personas</span>
            </div>
            <div>
              <b>6</b>
              <span>Solutions</span>
            </div>
            <div>
              <b>P0→P1</b>
              <span>Prioritised</span>
            </div>
          </div>
          <div className="case-cta">
            <a className="btn btn-blue" href="/mewurk-timesheet-case-study.html">
              Open case study
              <svg viewBox="0 0 24 24">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
        <a
          className="case-cover"
          href="/mewurk-timesheet-case-study.html"
          aria-label="Open the Mewurk Timesheet case study"
        >
          <div className="cover-word">TIMESHEET</div>
          <div className="mini-app" aria-hidden="true">
            <div className="mini-bar">
              <i />
              <i />
              <i />
            </div>
            <div className="mini-head">
              My Timesheet · Week 27 <span>Submit</span>
            </div>
            <div className="mini-row">
              <b className="w1" />
              <em>8.0 h</em>
              <i className="ok">OK</i>
            </div>
            <div className="mini-row">
              <b className="w2" />
              <em>6.5 h</em>
              <i className="ok">OK</i>
            </div>
            <div className="mini-row">
              <b className="w3" />
              <em>7.5 h</em>
              <i className="pend">···</i>
            </div>
            <div className="mini-row">
              <b className="w4" />
              <em>4.0 h</em>
              <i className="ok">OK</i>
            </div>
          </div>
        </a>
      </Reveal>

      <Reveal
        className="case-card green"
        data-name="Frame 2.1 · Case study"
        aria-hidden
      >
        <div className="case-info">
          <div className="case-chips">
            <span className="case-chip green">Maynooth University</span>
            <span className="case-chip green">Community Service Design</span>
            <span className="case-chip green">UX Research Case Study</span>
          </div>
          <h3 className="case-title">Spot-to-Plot — The Liberties</h3>
          <p className="case-desc">
            Residents of Dublin&apos;s Liberties notice neglected corners every
            day — but there&apos;s no shared way to act on them. I designed a
            lightweight tool to{" "}
            <strong>pin micro-plots, gather ideas, and rally volunteers</strong>{" "}
            — then let honest community feedback reshape it from a standalone
            app into a grassroots-friendly coordination layer.
          </p>
          <div className="case-stats">
            <div>
              <b>6</b>
              <span>ARRIVE phases</span>
            </div>
            <div>
              <b>4</b>
              <span>Ideations</span>
            </div>
            <div>
              <b>1</b>
              <span>Community pivot</span>
            </div>
            <div>
              <b>2→4</b>
              <span>Inclusion score</span>
            </div>
          </div>
          <div className="case-cta">
            <a
              className="btn btn-blue"
              href="/spot-to-plot-case-study.html"
              style={{ background: "var(--green)" }}
            >
              Open case study
              <svg viewBox="0 0 24 24">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
        <a
          className="case-cover green"
          href="/spot-to-plot-case-study.html"
          aria-label="Open the Spot-to-Plot case study"
        >
          <div className="cover-word">SPOT·TO·PLOT</div>
          <div className="mini-map" aria-hidden="true">
            <div className="mini-bar">
              <i />
              <i />
              <i />
            </div>
            <div className="mini-head">
              Micro-plots · The Liberties{" "}
              <span style={{ background: "#0E7A50" }}>+ Add plot</span>
            </div>
            <div className="map-canvas">
              <div className="map-road h" />
              <div className="map-road v" />
              <span className="map-pin red" />
              <span className="map-pin amber" />
              <span className="map-pin grn" />
            </div>
            <div className="map-legend">
              <span>
                <i className="r" />
                Identified
              </span>
              <span>
                <i className="a" />
                Ideas forming
              </span>
              <span>
                <i className="g" />
                Cared for
              </span>
            </div>
          </div>
        </a>
      </Reveal>
    </section>
  );
}
