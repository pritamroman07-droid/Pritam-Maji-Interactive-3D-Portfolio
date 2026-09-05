"use client";

import { useEffect, useRef, useState } from "react";

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function useCountUp(target: number, duration = 1800): {
  ref: React.RefObject<HTMLSpanElement | null>;
  display: string;
} {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(() => target.toFixed(2));
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDisplay(target.toFixed(2));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;

        const start = performance.now();
        const animate = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = easeOutExpo(progress);
          const current = eased * target;
          if (el) {
            el.textContent = current.toFixed(2);
          }
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setDisplay(target.toFixed(2));
            if (el) {
              el.textContent = target.toFixed(2);
            }
          }
        };
        requestAnimationFrame(animate);
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, [target, duration]);

  return { ref, display };
}
