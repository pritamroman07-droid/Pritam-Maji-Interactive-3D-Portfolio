import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { saveMessage } from "@/lib/db";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().trim().email("Please enter a valid email").max(120),
  subject: z.string().trim().min(3, "Subject must be at least 3 characters").max(120),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 },
      );
    }

    const message = {
      id: randomUUID(),
      ...parsed.data,
      createdAt: new Date().toISOString(),
    };

    await saveMessage(message);

    // Optional webhook notification (Zapier / Make / Discord etc.)
    const webhook = process.env.CONTACT_WEBHOOK_URL;
    if (webhook) {
      fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      }).catch(() => {
        /* webhook is best-effort */
      });
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }
}