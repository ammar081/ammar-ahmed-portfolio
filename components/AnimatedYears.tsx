"use client";

import { useEffect, useRef, useState } from "react";

export function AnimatedYears() {
  const elementRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef(0);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    const reducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    );
    if (reducedMotion?.matches || !("IntersectionObserver" in window)) {
      setValue(3);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const startedAt = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - startedAt) / 950, 1);
          setValue(Math.round(3 * (1 - Math.pow(1 - progress, 4))));
          if (progress < 1)
            animationFrameRef.current = window.requestAnimationFrame(tick);
        };
        animationFrameRef.current = window.requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.45 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      if (animationFrameRef.current)
        window.cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <div ref={elementRef} className="about-number">
      <span className="years-value">{value}</span>
      <span>+</span>
      <small>
        YEARS BUILDING
        <br />
        SOFTWARE
      </small>
    </div>
  );
}
