"use client";

import { useEffect, useRef, useState } from "react";
import { usePortfolioMode } from "./PortfolioModeContext";
import { usePremiumMotion } from "./usePremiumMotion";

export function MotionController() {
  const { mode, transitionVersion } = usePortfolioMode();
  const [showEcho, setShowEcho] = useState(false);
  const mounted = useRef(false);
  usePremiumMotion();

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    setShowEcho(true);
    const timeout = window.setTimeout(() => setShowEcho(false), 950);
    return () => window.clearTimeout(timeout);
  }, [transitionVersion]);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      {showEcho && (
        <div
          className="mode-echo"
          key={`${mode}-${transitionVersion}`}
          aria-hidden="true"
        >
          {mode === "recruiter" ? "OUTCOMES" : "SYSTEMS"}
        </div>
      )}
    </>
  );
}
