"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { memo, useEffect, useState } from "react";

export const CursorGlow = memo(function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 120, damping: 25, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 120, damping: 25, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !reduced);
    if (!fine || reduced) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX - 250);
      y.set(e.clientY - 250);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[500px] w-[500px] rounded-full will-change-transform"
      style={{
        x: sx,
        y: sy,
        background:
          "radial-gradient(circle, hsl(var(--accent-glow) / 0.14) 0%, transparent 60%)",
      }}
    />
  );
});
