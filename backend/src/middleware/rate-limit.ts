import type { NextFunction, Request, Response } from "express";

/**
 * Minimal in-memory rate limiter (per IP).
 * Good enough for a portfolio contact form; swap for
 * express-rate-limit + Redis if you ever scale up.
 */
export function rateLimit({ windowMs = 60_000, max = 5 }: { windowMs?: number; max?: number } = {}) {
  const hits = new Map<string, number[]>();

  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || "unknown";
    const now = Date.now();
    const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);

    if (recent.length >= max) {
      return res.status(429).json({ ok: false, error: "Too many requests — slow down a little." });
    }
    recent.push(now);
    hits.set(ip, recent);
    next();
  };
}
