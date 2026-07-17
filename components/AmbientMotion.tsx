"use client";

import { useEffect, useRef } from "react";

type NodePoint = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
};

const seededValue = (index: number, salt: number) => {
  const value = Math.sin(index * 91.73 + salt * 17.31) * 43758.5453;
  return value - Math.floor(value);
};

export function AmbientMotion() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const aura = auraRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !aura || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    const pointer = { x: -1000, y: -1000 };
    let width = 0;
    let height = 0;
    let nodes: NodePoint[] = [];
    let frame = 0;
    let pageVisible = !document.hidden;
    let canvasVisible = true;

    const shouldAnimate = () =>
      pageVisible &&
      canvasVisible &&
      !reducedMotion.matches &&
      finePointer.matches;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.6);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const nodeCount = Math.max(18, Math.min(38, Math.round(width / 38)));
      nodes = Array.from({ length: nodeCount }, (_, index) => ({
        x: seededValue(index, 1) * width,
        y: seededValue(index, 2) * height,
        vx: (seededValue(index, 3) - 0.5) * 0.22,
        vy: (seededValue(index, 4) - 0.5) * 0.18,
        radius: 1.1 + seededValue(index, 5) * 1.7,
      }));
    };

    const draw = () => {
      frame = 0;
      if (!shouldAnimate()) return;

      context.clearRect(0, 0, width, height);
      const engineerMode =
        document.documentElement.dataset.portfolioMode === "engineer";
      const rgb = engineerMode ? "58,168,181" : "88,185,140";

      nodes.forEach((node) => {
        const dx = pointer.x - node.x;
        const dy = pointer.y - node.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 170 && distance > 1) {
          const pull = (1 - distance / 170) * 0.016;
          node.vx += (dx / distance) * pull;
          node.vy += (dy / distance) * pull;
        }

        node.vx *= 0.992;
        node.vy *= 0.992;
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        if (node.y > height + 20) node.y = -20;
      });

      for (let index = 0; index < nodes.length; index += 1) {
        const node = nodes[index];
        for (
          let otherIndex = index + 1;
          otherIndex < nodes.length;
          otherIndex += 1
        ) {
          const other = nodes[otherIndex];
          const distance = Math.hypot(node.x - other.x, node.y - other.y);
          if (distance > 145) continue;
          context.beginPath();
          context.moveTo(node.x, node.y);
          context.lineTo(other.x, other.y);
          context.strokeStyle = `rgba(${rgb},${(1 - distance / 145) * 0.16})`;
          context.lineWidth = 0.8;
          context.stroke();
        }
        context.beginPath();
        context.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(${rgb},0.34)`;
        context.fill();
      }

      frame = window.requestAnimationFrame(draw);
    };

    const syncAnimation = () => {
      aura.hidden = reducedMotion.matches || !finePointer.matches;
      if (shouldAnimate() && !frame) frame = window.requestAnimationFrame(draw);
      if (!shouldAnimate() && frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (reducedMotion.matches || !finePointer.matches) return;
      aura.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      aura.dataset.active = "true";
      if (!canvasVisible) return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };
    const handlePointerLeave = () => {
      aura.dataset.active = "false";
    };
    const handleVisibility = () => {
      pageVisible = !document.hidden;
      syncAnimation();
    };

    const resizeObserver =
      "ResizeObserver" in window ? new ResizeObserver(resize) : null;
    resizeObserver?.observe(canvas);
    if (!resizeObserver) window.addEventListener("resize", resize);

    const visibilityObserver =
      "IntersectionObserver" in window
        ? new IntersectionObserver(([entry]) => {
            canvasVisible = entry.isIntersecting;
            syncAnimation();
          })
        : null;
    visibilityObserver?.observe(canvas);

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.documentElement.addEventListener(
      "pointerleave",
      handlePointerLeave,
    );
    document.addEventListener("visibilitychange", handleVisibility);
    reducedMotion.addEventListener("change", syncAnimation);
    finePointer.addEventListener("change", syncAnimation);
    resize();
    syncAnimation();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      visibilityObserver?.disconnect();
      if (!resizeObserver) window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener(
        "pointerleave",
        handlePointerLeave,
      );
      document.removeEventListener("visibilitychange", handleVisibility);
      reducedMotion.removeEventListener("change", syncAnimation);
      finePointer.removeEventListener("change", syncAnimation);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="ambient-canvas" aria-hidden="true" />
      <div ref={auraRef} className="cursor-aura" aria-hidden="true" />
    </>
  );
}
