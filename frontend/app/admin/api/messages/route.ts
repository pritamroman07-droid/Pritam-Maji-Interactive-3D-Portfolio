import { NextResponse } from "next/server";
import { deleteMessage, listMessages } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const messages = await listMessages();
  return NextResponse.json({ ok: true, messages });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ ok: false, error: "Missing message id" }, { status: 400 });
  }
  await deleteMessage(id);
  return NextResponse.json({ ok: true });
}