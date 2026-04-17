import { NextRequest, NextResponse } from "next/server";
import { computeSessionToken, SESSION_COOKIE } from "@/lib/auth";

const PROTECTED_PREFIXES = ["/dashboard", "/api/owners", "/api/dogs", "/api/appointments", "/api/seed"];
const PUBLIC_API = ["/api/auth/"];

function isProtected(pathname: string) {
  if (PUBLIC_API.some((p) => pathname.startsWith(p))) return false;
  return PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!isProtected(pathname)) return NextResponse.next();

  const secret = process.env.AUTH_SECRET;
  if (!secret) return NextResponse.next();

  const cookie = req.cookies.get(SESSION_COOKIE)?.value;
  const expected = await computeSessionToken(secret);

  if (cookie === expected) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = "/login";
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
