"use client";

import { useEffect } from "react";

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max);

export function usePremiumMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-reveal], [data-reveal-item]",
      ),
    );
    const navigationLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(".nav a[href^='#']"),
    );
    const navigationSections = navigationLinks
      .map((link) => document.querySelector<HTMLElement>(link.hash))
      .filter((section): section is HTMLElement => Boolean(section));

    revealElements.forEach((element, index) => {
      element.style.setProperty(
        "--reveal-delay",
        `${Math.min(index % 4, 3) * 70}ms`,
      );
    });

    const revealObserver =
      "IntersectionObserver" in window && !reducedMotion.matches
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                revealObserver?.unobserve(entry.target);
              });
            },
            { threshold: 0.12, rootMargin: "0px 0px -45px" },
          )
        : null;

    if (revealObserver)
      revealElements.forEach((element) => revealObserver.observe(element));
    else
      revealElements.forEach((element) => element.classList.add("is-visible"));

    const updateActiveNavigation = () => {
      const marker = window.scrollY + window.innerHeight * 0.38;
      const activeSection =
        window.scrollY < window.innerHeight * 0.6
          ? null
          : ([...navigationSections]
              .reverse()
              .find((section) => section.offsetTop <= marker) ?? null);

      navigationLinks.forEach((link) => {
        const current = activeSection
          ? link.hash === `#${activeSection.id}`
          : false;
        link.classList.toggle("is-current", current);
        if (current) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    };

    let frame = 0;
    const updateScrollState = () => {
      frame = 0;
      updateActiveNavigation();

      if (reducedMotion.matches) {
        root.style.setProperty("--scroll-progress", "1");
        root.style.setProperty("--hero-parallax", "0px");
        document
          .querySelector<HTMLElement>(".timeline")
          ?.style.setProperty("--timeline-progress", "1");
        return;
      }

      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      root.style.setProperty(
        "--scroll-progress",
        String(clamp(window.scrollY / maxScroll)),
      );
      root.style.setProperty(
        "--hero-parallax",
        `${Math.min(window.scrollY * 0.13, 115)}px`,
      );

      const timeline = document.querySelector<HTMLElement>(".timeline");
      if (!timeline) return;
      const rect = timeline.getBoundingClientRect();
      const start = window.innerHeight * 0.78;
      const progress = clamp(
        (start - rect.top) / Math.max(rect.height + start * 0.35, 1),
      );
      timeline.style.setProperty("--timeline-progress", String(progress));
    };

    const queueScrollUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScrollState);
    };

    const handleMotionPreference = () => {
      if (reducedMotion.matches) {
        revealElements.forEach((element) =>
          element.classList.add("is-visible"),
        );
      }
      queueScrollUpdate();
    };

    window.addEventListener("scroll", queueScrollUpdate, { passive: true });
    window.addEventListener("resize", queueScrollUpdate);
    reducedMotion.addEventListener("change", handleMotionPreference);
    updateScrollState();

    const cleanups: Array<() => void> = [];
    if (finePointer.matches) {
      document
        .querySelectorAll<HTMLElement>("[data-tilt]")
        .forEach((element) => {
          const handleMove = (event: PointerEvent) => {
            if (reducedMotion.matches) return;
            const rect = element.getBoundingClientRect();
            const x = clamp((event.clientX - rect.left) / rect.width);
            const y = clamp((event.clientY - rect.top) / rect.height);
            element.style.setProperty("--tilt-x", `${(0.5 - y) * 7}deg`);
            element.style.setProperty("--tilt-y", `${(x - 0.5) * 8}deg`);
            element.style.setProperty("--glow-x", `${x * 100}%`);
            element.style.setProperty("--glow-y", `${y * 100}%`);
            element.classList.add("is-tilting");
          };
          const handleLeave = () => {
            element.style.setProperty("--tilt-x", "0deg");
            element.style.setProperty("--tilt-y", "0deg");
            element.classList.remove("is-tilting");
          };
          element.addEventListener("pointermove", handleMove);
          element.addEventListener("pointerleave", handleLeave);
          cleanups.push(() => {
            element.removeEventListener("pointermove", handleMove);
            element.removeEventListener("pointerleave", handleLeave);
          });
        });

      document
        .querySelectorAll<HTMLElement>("[data-magnetic]")
        .forEach((element) => {
          const handleMove = (event: PointerEvent) => {
            if (reducedMotion.matches) return;
            const rect = element.getBoundingClientRect();
            const x = (event.clientX - (rect.left + rect.width / 2)) * 0.16;
            const y = (event.clientY - (rect.top + rect.height / 2)) * 0.16;
            element.style.setProperty("--magnetic-x", `${x}px`);
            element.style.setProperty("--magnetic-y", `${y}px`);
          };
          const handleLeave = () => {
            element.style.setProperty("--magnetic-x", "0px");
            element.style.setProperty("--magnetic-y", "0px");
          };
          element.addEventListener("pointermove", handleMove);
          element.addEventListener("pointerleave", handleLeave);
          cleanups.push(() => {
            element.removeEventListener("pointermove", handleMove);
            element.removeEventListener("pointerleave", handleLeave);
          });
        });

      document
        .querySelectorAll<HTMLElement>("[data-spotlight]")
        .forEach((element) => {
          const handleMove = (event: PointerEvent) => {
            if (reducedMotion.matches) return;
            const rect = element.getBoundingClientRect();
            element.style.setProperty(
              "--spotlight-x",
              `${event.clientX - rect.left}px`,
            );
            element.style.setProperty(
              "--spotlight-y",
              `${event.clientY - rect.top}px`,
            );
          };
          element.addEventListener("pointermove", handleMove);
          cleanups.push(() =>
            element.removeEventListener("pointermove", handleMove),
          );
        });
    }

    return () => {
      revealObserver?.disconnect();
      window.removeEventListener("scroll", queueScrollUpdate);
      window.removeEventListener("resize", queueScrollUpdate);
      reducedMotion.removeEventListener("change", handleMotionPreference);
      if (frame) window.cancelAnimationFrame(frame);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);
}
