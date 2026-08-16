"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { useLenis } from "@/lib/lenis";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("#")) return;
      e.preventDefault();
      const target = href.slice(1);
      if (lenis) {
        lenis.scrollTo(`#${target}`, { offset: 0 });
      } else {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
      setOpen(false);
      window.history.pushState(null, "", href);
    },
    [lenis],
  );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[80] transition-all duration-500",
          scrolled
            ? "glass-strong py-3 shadow-card dark:shadow-glass"
            : "bg-transparent py-5",
        )}
      >
        <nav className="container-x flex items-center justify-between">
          <Link
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="group flex items-center gap-2 font-display text-lg font-bold tracking-tight"
            aria-label="Pritam Maji — home"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl neon-border font-black text-gradient">
              P
            </span>
            <span>
              Pritam Maji
            </span>
          </Link>

          <ul className="hidden items-center gap-0.5 lg:flex xl:gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="group relative rounded-full px-3 py-2 text-sm text-muted transition hover:text-fg xl:px-4"
                >
                  {link.label}
                  <span className="absolute inset-x-4 -bottom-0.5 h-px scale-x-0 bg-gradient-to-r from-accent to-accent-alt transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="rounded-full border border-border/60 p-2.5 text-muted transition hover:border-accent/60 hover:text-fg"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="rounded-full border border-border/60 p-2.5 text-muted transition hover:border-accent/60 hover:text-fg lg:hidden"
            >
              <Menu size={16} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex flex-col bg-base/95 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0, clipPath: "circle(0% at 92% 6%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 92% 6%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between px-5 py-5">
              <span className="font-display text-lg font-bold">
                Pritam Maji
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="rounded-full border border-border/60 p-2.5 text-muted"
              >
                <X size={16} />
              </button>
            </div>
            <ul className="flex flex-1 flex-col items-center justify-center gap-2">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="block px-6 py-3 font-display text-3xl font-bold text-muted transition hover:text-fg"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <p className="pb-8 text-center font-mono text-xs text-muted">
              Computer Science Student · Developer · Builder
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-[60] rounded-full glass p-3 text-muted transition hover:text-accent"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
