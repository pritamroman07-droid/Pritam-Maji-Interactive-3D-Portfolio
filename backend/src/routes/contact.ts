import { Router } from "express";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { config } from "../config";
import { saveMessage } from "../db";
import { rateLimit } from "../middleware/rate-limit";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().trim().email("Please enter a valid email").max(120),
  subject: z.string().trim().min(3, "Subject must be at least 3 characters").max(120),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
});

const router = Router();

router.post("/", rateLimit({ windowMs: 60_000, max: 5 }), async (req, res) => {
  const parsed = contactSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" });
  }

  const message = {
    id: randomUUID(),
    ...parsed.data,
    createdAt: new Date().toISOString(),
  };

  try {
    await saveMessage(message);
  } catch {
    return res.status(500).json({ ok: false, error: "Could not store message" });
  }

  // Optional webhook notification (Zapier / Make / Discord etc.)
  if (config.contactWebhook) {
    fetch(config.contactWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    }).catch(() => {
      /* webhook is best-effort */
    });
  }

  return res.status(201).json({ ok: true });
});

export default router;
