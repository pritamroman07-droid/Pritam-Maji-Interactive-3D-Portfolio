"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-semibold transition hover:border-accent/60"
    >
      <Printer size={14} aria-hidden />
      Print
    </button>
  );
}