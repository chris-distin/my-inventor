import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PREFIXES = ["/_next", "/api", "/static", "/favicon.ico", "/robots.txt", "/sitemap.xml"];
const PASSWORD = process.env.SITE_PASSWORD;

function isPublic(pathname: string) {
  return PUBLIC_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/") );
}

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Protected"',
    },
  });
}

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Allow public assets and internal routes
  if (isPublic(pathname)) return NextResponse.next();

  // If no password set, do not block (avoids accidental lockout)
  if (!PASSWORD) return NextResponse.next();

  const auth = req.headers.get("authorization");
  if (!auth) return unauthorized();

  const parts = auth.split(" ");
  if (parts.length !== 2) return unauthorized();
  const scheme = parts[0];
  const encoded = parts[1];
  if (scheme.toLowerCase() !== "basic") return unauthorized();

  try {
    // atob is available in the edge runtime; fall back to Buffer if available in Node
    const decoded = (typeof atob === "function")
      ? atob(encoded)
      : Buffer.from(encoded, "base64").toString("utf-8");
    // decoded format: username:password (username may contain colons)
    const idx = decoded.indexOf(":");
    const suppliedUser = idx === -1 ? decoded : decoded.slice(0, idx);
    const suppliedPassword = idx === -1 ? "" : decoded.slice(idx + 1);
    if (suppliedUser === "distin" && suppliedPassword === PASSWORD) return NextResponse.next();
  } catch (e) {
    // ignore and fall through to unauthorized
  }

  return unauthorized();
}

// Run middleware for all routes by default; internal exclusions are handled above
export const config = {
  matcher: "/:path*",
};
