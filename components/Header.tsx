"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { usePortfolioMode } from "./PortfolioModeContext";

const navigation = [
  "Work",
  "Experience",
  "Capabilities",
  "About",
  "Contact",
] as const;

export function Header() {
  const { mode, setMode } = usePortfolioMode();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navigationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() =>
      navigationRef.current?.querySelector("a")?.focus(),
    );

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <a href="#top" className="brand" aria-label="Ammar Ahmed, home">
        AA<span>.</span>
      </a>
      <nav
        id="primary-navigation"
        ref={navigationRef}
        className={menuOpen ? "nav open" : "nav"}
        aria-label="Primary navigation"
      >
        {navigation.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={() => setMenuOpen(false)}
          >
            {item}
          </a>
        ))}
        <div className="nav-mode">
          <span>Choose portfolio view</span>
          <ModeToggle mode={mode} onChange={setMode} />
        </div>
      </nav>
      <div className="header-actions">
        <ModeToggle mode={mode} onChange={setMode} />
        <button
          ref={menuButtonRef}
          type="button"
          className="menu-button"
          aria-label="Toggle navigation"
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
