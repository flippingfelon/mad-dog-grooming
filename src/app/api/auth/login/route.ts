import { NextRequest, NextResponse } from "next/server";
import { computeSessionToken, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const expected = process.env.AUTH_PASSWORD;

  if (!expected || password !== expected) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = await computeSessionToken(process.env.AUTH_SECRET!);
  const res = NextResponse.json({ ok: true });

  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  return res;
}
