import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  const db = getDb();

  const owner = db.prepare("SELECT * FROM owners WHERE id = ?").get(id);
  if (!owner) {
    return NextResponse.json({ error: "Owner not found" }, { status: 404 });
  }

  const dogs = db
    .prepare("SELECT * FROM dogs WHERE owner_id = ? ORDER BY name")
    .all(id);

  const appointments = db
    .prepare(
      `SELECT a.*, d.name AS dog_name
       FROM appointments a
       JOIN dogs d ON d.id = a.dog_id
       WHERE a.owner_id = ? AND a.status = 'completed'
       ORDER BY a.start_at DESC`
    )
    .all(id);

  return NextResponse.json({ owner, dogs, appointments });
}

export async function PUT(req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  const body = await req.json();
  const { full_name, phone, address, grooming_notes } = body;

  if (!full_name?.trim() || !phone?.trim() || !address?.trim()) {
    return NextResponse.json(
      { error: "full_name, phone, and address are required" },
      { status: 400 }
    );
  }

  const db = getDb();
  const result = db
    .prepare(
      `UPDATE owners SET full_name = ?, phone = ?, address = ?, grooming_notes = ?, updated_at = datetime('now')
       WHERE id = ?`
    )
    .run(full_name.trim(), phone.trim(), address.trim(), grooming_notes?.trim() ?? "", id);

  if (result.changes === 0) {
    return NextResponse.json({ error: "Owner not found" }, { status: 404 });
  }

  const owner = db.prepare("SELECT * FROM owners WHERE id = ?").get(id);
  return NextResponse.json({ owner });
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  const db = getDb();
  const result = db.prepare("DELETE FROM owners WHERE id = ?").run(id);
  if (result.changes === 0) {
    return NextResponse.json({ error: "Owner not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
