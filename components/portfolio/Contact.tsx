import { Reveal } from "./Reveal";
import { QuickConnectButton } from "./QuickConnectContext";

export function Contact() {
  return (
    <section className="wrap contact" id="contact">
      <Reveal className="frame-label">
        <svg viewBox="0 0 24 24">
          <path d="M6 2v20M18 2v20M2 6h20M2 18h20" />
        </svg>
        Frame 3 · Contact
      </Reveal>
      <Reveal className="contact-frame">
        <h2>
          Let&apos;s build something
          <br />
          <span className="grad">people love.</span>
        </h2>
        <p className="contact-sub">
          Open to UX roles across Ireland &amp; remote — usually replies within
          a day.
        </p>
        <div className="contact-cta">
          <a className="btn btn-blue" href="mailto:agirish421@gmail.com">
            agirish421@gmail.com
          </a>
          <QuickConnectButton className="btn btn-outline">
            Quick connect
          </QuickConnectButton>
        </div>
        <div className="contact-links">
          <a
            href="https://www.behance.net/ashwingirish"
            target="_blank"
            rel="noopener noreferrer"
          >
            Behance
          </a>
          <a
            href="https://www.linkedin.com/in/ashwingirish"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="/Ashwin_Girish_Resume_2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Résumé
          </a>
        </div>
      </Reveal>
    </section>
  );
}
