"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Clipboard, CircleAlert } from "lucide-react";
import { profile } from "@/data/portfolio";

type CopyState = "idle" | "copied" | "error";

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.select();
  const copied = document.execCommand("copy");
  textArea.remove();
  if (!copied) throw new Error("Clipboard copy failed");
}

export function ContactSection() {
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const timeoutRef = useRef(0);

  useEffect(
    () => () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    },
    [],
  );

  const handleCopy = async () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    try {
      await copyText(profile.email);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
    timeoutRef.current = window.setTimeout(() => setCopyState("idle"), 2500);
  };

  const feedback =
    copyState === "copied"
      ? "Email copied to clipboard"
      : copyState === "error"
        ? "Could not copy email. Use the email link instead."
        : "";

  return (
    <section id="contact" className="contact" data-reveal="up">
      <p className="eyebrow">LET’S BUILD SOMETHING USEFUL</p>
      <h2>
        Have a product problem
        <br />
        worth solving?
      </h2>
      <a href={`mailto:${profile.email}`} data-magnetic>
        {profile.email} <ArrowRight />
      </a>
      <button type="button" onClick={handleCopy} data-magnetic>
        {copyState === "copied" ? (
          <>
            <Check /> Copied
          </>
        ) : copyState === "error" ? (
          <>
            <CircleAlert /> Copy failed
          </>
        ) : (
          <>
            <Clipboard /> Copy email
          </>
        )}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {feedback}
      </span>
    </section>
  );
}
