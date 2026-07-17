"use client";

import { usePortfolioMode } from "./PortfolioModeContext";

export function ModeStatus() {
  const { mode } = usePortfolioMode();
  const recruiterMode = mode === "recruiter";

  return (
    <div className="mode-note" aria-live="polite">
      <div className="mode-transition" key={mode}>
        Viewing as <b>{recruiterMode ? "a recruiter" : "an engineer"}</b>
        <span>
          {recruiterMode
            ? "Business outcomes, scope and capabilities are foregrounded."
            : "Architecture, technical decisions and quality are foregrounded."}
        </span>
      </div>
    </div>
  );
}
