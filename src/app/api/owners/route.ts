import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export function GET(req: NextRequest) {
  const db = getDb();
  const search = req.nextUrl.searchParams.get("search")?.trim() ?? "";

  let owners;
  if (search) {
    const pattern = `%${search}%`;
    owners = db
      .prepare(
        `SELECT o.*, (SELECT COUNT(*) FROM dogs d WHERE d.owner_id = o.id) AS dog_count
         FROM owners o
         WHERE o.full_name LIKE ? OR o.phone LIKE ?
            OR EXISTS (SELECT 1 FROM dogs d WHERE d.owner_id = o.id AND d.name LIKE ?)
         ORDER BY o.full_name`
      )
      .all(pattern, pattern, pattern);
  } else {
    owners = db
      .prepare(
        `SELECT o.*, (SELECT COUNT(*) FROM dogs d WHERE d.owner_id = o.id) AS dog_count
         FROM owners o ORDER BY o.full_name`
      )
      .all();
  }

  return NextResponse.json({ owners });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { full_name, phone, address, grooming_notes } = body;

  if (!full_name?.trim() || !phone?.trim() || !address?.trim()) {
    return NextResponse.json(
      { error: "full_name, phone, and address are required" },
      { status: 400 }
    );
  }

  const db = getDb();
  const id = crypto.randomUUID();
  db.prepare(
    `INSERT INTO owners (id, full_name, phone, address, grooming_notes) VALUES (?, ?, ?, ?, ?)`
  ).run(id, full_name.trim(), phone.trim(), address.trim(), grooming_notes?.trim() ?? "");

  const owner = db.prepare("SELECT * FROM owners WHERE id = ?").get(id);
  return NextResponse.json({ owner }, { status: 201 });
}
