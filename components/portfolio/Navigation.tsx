import { ThemeToggle } from "./ThemeProvider";
import { QuickConnectButton } from "./QuickConnectContext";

export function Navigation() {
  return (
    <nav>
      <div className="toolbar">
        <a className="tb-file" href="#top">
          <span className="tb-logo">
            <i aria-hidden="true" />
            <i aria-hidden="true" />
            <i aria-hidden="true" />
            <i aria-hidden="true" />
          </span>
          <span className="tb-name">
            ashwin-girish<span>.fig</span>
          </span>
        </a>
        <ul className="tb-links">
          <li>
            <a href="#work">Work</a>
          </li>
          <li>
            <a href="#experience">Experience</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a
              href="/Ashwin_Girish_Resume_2025.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Résumé
            </a>
          </li>
        </ul>
        <div className="tb-right">
          <span className="avatars" aria-hidden="true">
            <i>A</i>
            <i>R</i>
            <i>+</i>
          </span>
          <ThemeToggle />
          <QuickConnectButton className="btn-share">Quick connect</QuickConnectButton>
        </div>
      </div>
    </nav>
  );
}
