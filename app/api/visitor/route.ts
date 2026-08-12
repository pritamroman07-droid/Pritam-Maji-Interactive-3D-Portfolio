import { NextResponse } from "next/server";
import { getVisitors, incrementVisitors } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const visitors = await getVisitors();
  return NextResponse.json({ ok: true, visitors });
}

export async function POST() {
  const visitors = await incrementVisitors();
  return NextResponse.json({ ok: true, visitors });
}