import { NextResponse } from "next/server";
import { getVisitors, listMessages } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const [visitors, messages] = await Promise.all([getVisitors(), listMessages()]);
  return NextResponse.json({
    ok: true,
    visitors,
    messages: messages.length,
    started: new Date().getFullYear(),
  });
}