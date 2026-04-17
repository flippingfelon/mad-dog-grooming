import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export function GET(req: NextRequest) {
  const db = getDb();
  const ownerId = req.nextUrl.searchParams.get("owner_id");

  if (ownerId) {
    const dogs = db
      .prepare("SELECT * FROM dogs WHERE owner_id = ? ORDER BY name")
      .all(ownerId);
    return NextResponse.json({ dogs });
  }

  const dogs = db.prepare("SELECT * FROM dogs ORDER BY name").all();
  return NextResponse.json({ dogs });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { owner_id, name, breed, grooming_notes } = body;

  if (!owner_id || !name?.trim()) {
    return NextResponse.json(
      { error: "owner_id and name are required" },
      { status: 400 }
    );
  }

  const db = getDb();

  const owner = db.prepare("SELECT id FROM owners WHERE id = ?").get(owner_id);
  if (!owner) {
    return NextResponse.json({ error: "Owner not found" }, { status: 404 });
  }

  const id = crypto.randomUUID();
  db.prepare(
    `INSERT INTO dogs (id, owner_id, name, breed, grooming_notes) VALUES (?, ?, ?, ?, ?)`
  ).run(id, owner_id, name.trim(), breed?.trim() ?? "", grooming_notes?.trim() ?? "");

  const dog = db.prepare("SELECT * FROM dogs WHERE id = ?").get(id);
  return NextResponse.json({ dog }, { status: 201 });
}
