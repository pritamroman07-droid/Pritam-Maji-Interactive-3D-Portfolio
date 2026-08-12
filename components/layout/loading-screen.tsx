"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const start = performance.now();
    const duration = 1400;
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setProgress(Math.round(t * 100));
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
            <motion.div
              className="h-full bg-gradient-to-r from-accent to-accent-alt"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-3 font-mono text-xs tracking-widest text-faint">
            LOADING EXPERIENCE — {progress}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
