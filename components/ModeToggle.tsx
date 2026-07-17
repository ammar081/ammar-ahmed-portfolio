"use client";
import type { Mode } from "@/data/portfolio";
import { BriefcaseBusiness, Check, Code2 } from "lucide-react";
export function ModeToggle({
  mode,
  onChange,
}: {
  mode: Mode;
  onChange: (mode: Mode) => void;
}) {
  return (
    <div
      className="mode"
      data-mode={mode}
      role="group"
      aria-label="Portfolio view"
    >
      <span className="mode-indicator" aria-hidden="true" />
      <button
        type="button"
        aria-pressed={mode === "recruiter"}
        onClick={() => onChange("recruiter")}
      >
        <BriefcaseBusiness size={15} /> Recruiter{" "}
        {mode === "recruiter" && (
          <Check className="mode-check" aria-hidden="true" />
        )}
      </button>
      <button
        type="button"
        aria-pressed={mode === "engineer"}
        onClick={() => onChange("engineer")}
      >
        <Code2 size={15} /> Engineer{" "}
        {mode === "engineer" && (
          <Check className="mode-check" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
