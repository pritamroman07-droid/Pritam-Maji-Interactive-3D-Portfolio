"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="aurora aurora--blue -left-20 top-20 h-96 w-96 animate-blob" aria-hidden />
      <div className="aurora aurora--purple -right-20 bottom-20 h-96 w-96 animate-blob [animation-delay:-8s]" aria-hidden />

      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
      >
        <p className="font-display text-[9rem] font-black leading-none text-gradient sm:text-[13rem]">
          404
        </p>
        <p className="font-mono text-sm uppercase tracking-[0.35em] text-faint">
          Lost in hyperspace
        </p>
        <p className="mx-auto mt-4 max-w-md text-muted">
          The page you&apos;re looking for drifted past the event horizon. Let&apos;s get you
          back to the mission.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full btn-primary px-6 py-3 font-semibold"
          >
            <ArrowLeft size={16} aria-hidden />
            Back Home
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 font-semibold transition hover:border-accent/60"
          >
            <Compass size={16} aria-hidden />
            Contact Me
          </Link>
        </div>
      </motion.div>
    </main>
  );
}