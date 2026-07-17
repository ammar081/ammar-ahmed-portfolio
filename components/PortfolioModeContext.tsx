"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Mode } from "@/data/portfolio";

type PortfolioModeContextValue = {
  mode: Mode;
  setMode: (mode: Mode) => void;
  transitionVersion: number;
};

const PortfolioModeContext = createContext<PortfolioModeContextValue | null>(
  null,
);
const MODE_COOKIE = "portfolio-mode";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export function PortfolioModeProvider({
  children,
  initialMode,
}: {
  children: ReactNode;
  initialMode: Mode;
}) {
  const [mode, setModeState] = useState<Mode>(initialMode);
  const [transitionVersion, setTransitionVersion] = useState(0);

  useEffect(() => {
    const legacyMode = localStorage.getItem(MODE_COOKIE);
    if (legacyMode !== "recruiter" && legacyMode !== "engineer") return;
    if (legacyMode !== initialMode) setModeState(legacyMode);
    document.cookie = `${MODE_COOKIE}=${legacyMode}; Path=/; Max-Age=${ONE_YEAR_SECONDS}; SameSite=Lax`;
  }, [initialMode]);

  useEffect(() => {
    document.documentElement.dataset.portfolioMode = mode;
    return () => {
      delete document.documentElement.dataset.portfolioMode;
    };
  }, [mode]);

  const setMode = useCallback((nextMode: Mode) => {
    setModeState(nextMode);
    setTransitionVersion((version) => version + 1);
    localStorage.setItem(MODE_COOKIE, nextMode);
    document.cookie = `${MODE_COOKIE}=${nextMode}; Path=/; Max-Age=${ONE_YEAR_SECONDS}; SameSite=Lax`;
  }, []);

  const value = useMemo(
    () => ({ mode, setMode, transitionVersion }),
    [mode, setMode, transitionVersion],
  );

  return (
    <PortfolioModeContext.Provider value={value}>
      {children}
    </PortfolioModeContext.Provider>
  );
}

export function usePortfolioMode() {
  const context = useContext(PortfolioModeContext);
  if (!context)
    throw new Error(
      "usePortfolioMode must be used inside PortfolioModeProvider",
    );
  return context;
}
