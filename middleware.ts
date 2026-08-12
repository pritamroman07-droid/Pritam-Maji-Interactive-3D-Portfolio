import { NextResponse, type NextRequest } from "next/server";

const ADMIN_USER = process.env.ADMIN_USER || "pritam";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin Dashboard"' },
  });
}

function verify(request: NextRequest): boolean {
  const header = request.headers.get("authorization");
  if (!header || !header.startsWith("Basic ")) return false;

  const credentials = Buffer.from(header.slice(6), "base64").toString("utf-8");
  const [user, ...rest] = credentials.split(":");
  const password = rest.join(":");
  return user === ADMIN_USER && password === ADMIN_PASSWORD;
}

export function middleware(request: NextRequest) {
  if (!verify(request)) {
    return unauthorized();
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
