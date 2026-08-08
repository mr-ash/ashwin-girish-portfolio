"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type QuickConnectContextValue = {
  open: () => void;
  close: () => void;
};

const QuickConnectContext = createContext<QuickConnectContextValue | null>(null);

export function useQuickConnect() {
  const ctx = useContext(QuickConnectContext);
  if (!ctx) {
    throw new Error("useQuickConnect must be used within QuickConnectProvider");
  }
  return ctx;
}

export function QuickConnectProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const lastFocus = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const open = useCallback(() => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    lastFocus.current?.focus();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("qc-open", isOpen);
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  return (
    <QuickConnectContext.Provider value={{ open, close }}>
      {children}
      <div className="qc-overlay" onClick={close} aria-hidden="true" />
      <div
        className="qc-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Quick connect"
      >
        <div className="qc-head">
          <div className="qc-title">Quick connect</div>
          <button
            ref={closeButtonRef}
            className="qc-close"
            onClick={close}
            aria-label="Close"
            type="button"
          >
            ✕
          </button>
        </div>
        <ul className="qc-list">
          <li>
            <a className="qc-item" href="mailto:agirish421@gmail.com">
              <span className="qc-ico">
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </span>
              <span>
                <b>Email</b>
                <span>agirish421@gmail.com</span>
              </span>
            </a>
          </li>
          <li>
            <a
              className="qc-item"
              href="https://www.linkedin.com/in/ashwingirish"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="qc-ico">
                <svg viewBox="0 0 24 24">
                  <path d="M8 11v5M8 8v.01M12 16v-5m0 0a2.5 2.5 0 0 1 5 0v5" />
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                </svg>
              </span>
              <span>
                <b>LinkedIn</b>
                <span>/in/ashwingirish</span>
              </span>
            </a>
          </li>
          <li>
            <a
              className="qc-item"
              href="https://www.behance.net/ashwingirish"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="qc-ico">
                <svg viewBox="0 0 24 24">
                  <path d="M3 7h6a3 3 0 0 1 0 6H3zM3 13h6.5a3 3 0 0 1 0 6H3zM14 9h6M14.5 15a3 3 0 0 0 6 0c0-2-1.3-3.5-3-3.5s-3 1.5-3 3.5z" />
                </svg>
              </span>
              <span>
                <b>Behance</b>
                <span>/ashwingirish</span>
              </span>
            </a>
          </li>
          <li>
            <a className="qc-item" href="tel:+919544262863">
              <span className="qc-ico">
                <svg viewBox="0 0 24 24">
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
                </svg>
              </span>
              <span>
                <b>Call / WhatsApp</b>
                <span>+91 95442 62863</span>
              </span>
            </a>
          </li>
          <li>
            <a
              className="qc-item"
              href="/Ashwin_Girish_Resume_2025.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="qc-ico">
                <svg viewBox="0 0 24 24">
                  <path d="M14 3v5h5M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM9 13h6M9 17h6" />
                </svg>
              </span>
              <span>
                <b>Résumé</b>
                <span>PDF · 2 pages</span>
              </span>
            </a>
          </li>
        </ul>
        <div className="qc-foot">Usually replies within a day — based in Dublin</div>
      </div>
    </QuickConnectContext.Provider>
  );
}

export function QuickConnectButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { open } = useQuickConnect();
  return (
    <button className={className} onClick={open} type="button">
      {children}
    </button>
  );
}
