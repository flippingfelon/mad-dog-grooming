export const SESSION_COOKIE = "mad-dog-session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function computeSessionToken(secret: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(secret)
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
