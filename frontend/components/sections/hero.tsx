"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Download, Sparkles } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock } from "@/components/clock";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TypingText } from "@/components/ui/typing-text";
import { hero, marqueeItems } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const HeroScene = dynamic(() => import("@/components/three/hero-scene").then((m) => m.HeroScene), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center">
      <div className="h-16 w-16 animate-spin-slow rounded-full border-2 border-border border-t-accent" />
    </div>
  ),
});

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        yPercent: 22,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={sectionRef} className="relative flex min-h-screen flex-col overflow-hidden">
      {/* backdrop */}
      <div className="absolute inset-0 grid-bg" aria-hidden />
      <div className="aurora aurora--blue -left-32 top-10 h-[420px] w-[420px] animate-blob" aria-hidden />
      <div className="aurora aurora--purple right-0 top-1/3 h-[460px] w-[460px] animate-blob [animation-delay:-6s]" aria-hidden />
      <div className="aurora aurora--cyan bottom-0 left-1/3 h-[380px] w-[380px] animate-blob [animation-delay:-12s]" aria-hidden />

      <div ref={contentRef} className="container-x relative z-10 grid flex-1 items-center gap-10 pt-28 lg:grid-cols-2 lg:pt-20">
        {/* Copy */}
        <div className="relative">
          <p className="font-mono text-sm uppercase tracking-[0.35em] text-accent">
            {hero.greeting}
          </p>

          <h1 className="mt-3 font-display text-5xl font-black leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl">
            <motion.span
              initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="block"
            >
              Pritam
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
              className="block text-gradient"
            >
              Maji
            </motion.span>
          </h1>

          <div className="mt-5 flex items-center gap-3 font-display text-xl font-semibold sm:text-2xl">
            <Sparkles size={18} className="text-accent" aria-hidden />
            <TypingText words={hero.roles} className="text-fg" />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-5 max-w-lg text-lg leading-relaxed text-muted"
          >
            {hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <MagneticButton>
              <Link
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full btn-primary px-7 py-3.5 font-semibold"
              >
                View My Work
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                href="/resume"
                className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 font-semibold text-fg transition hover:border-accent/60"
              >
                <Download size={16} className="text-accent" />
                My Resume
              </Link>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-10 flex items-center justify-between gap-6 sm:max-w-md"
          >
            <p className="font-mono text-sm italic text-muted">Learning by building.</p>
            <Clock />
          </motion.div>
        </div>

        {/* 3D — skipped entirely when the user prefers reduced motion */}
        {!reducedMotion && (
          <div className="relative h-[360px] sm:h-[480px] lg:h-[640px]" aria-hidden>
            <HeroScene />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-base to-transparent" />
          </div>
        )}
      </div>

      {/* scroll hint */}
      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-muted transition hover:text-accent"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ArrowDown size={16} />
        </motion.div>
      </motion.a>
    </section>
  );
}

export function TechMarquee() {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div className="relative border-y border-border/40 py-5 [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
      <div className="flex w-max marquee-track gap-12">
        {items.map((item, i) => (
          <span
            key={i}
            className="font-display text-lg font-bold uppercase tracking-[0.3em] text-muted transition hover:text-accent"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}