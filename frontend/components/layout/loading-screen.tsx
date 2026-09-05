"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const start = performance.now();
    const duration = 900;
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const pct = Math.round(t * 100);
      if (progressRef.current) {
        progressRef.current.style.width = `${pct}%`;
      }
      if (textRef.current) {
        textRef.current.textContent = `Loading — ${pct}%`;
      }
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setLoading(false);
          document.body.style.overflow = "";
        }, 250);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-base"
          exit={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="relative mb-8 flex h-20 w-20 items-center justify-center rounded-2xl neon-border"
          >
            <span className="font-display text-3xl font-black text-gradient">P</span>
            <span className="absolute inset-0 rounded-2xl bg-accent/10 animate-pulseglow" />
          </motion.div>
          <div className="h-px w-48 overflow-hidden rounded-full bg-border/50">
            <div
              ref={progressRef}
              className="h-full bg-gradient-to-r from-accent to-accent-alt"
              style={{ width: "0%" }}
            />
          </div>
          <p
            ref={textRef}
            className="mt-3 font-mono text-xs tracking-widest text-muted"
          >
            Loading — 0%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
