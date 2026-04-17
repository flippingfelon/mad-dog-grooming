import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  const db = getDb();

  const appointment = db
    .prepare(
      `SELECT a.*, o.full_name AS owner_name, d.name AS dog_name
       FROM appointments a
       JOIN owners o ON o.id = a.owner_id
       JOIN dogs d ON d.id = a.dog_id
       WHERE a.id = ?`
    )
    .get(id);

  if (!appointment) {
    return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
  }

  return NextResponse.json({ appointment });
}

export async function PUT(req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  const body = await req.json();
  const { owner_id, dog_id, start_at, end_at, service, status, notes } = body;

  if (!owner_id || !dog_id || !start_at || !end_at) {
    return NextResponse.json(
      { error: "owner_id, dog_id, start_at, and end_at are required" },
      { status: 400 }
    );
  }

  if (new Date(end_at) <= new Date(start_at)) {
    return NextResponse.json(
      { error: "end_at must be after start_at" },
      { status: 400 }
    );
  }

  const db = getDb();

  const overlaps = db
    .prepare(
      `SELECT id FROM appointments
       WHERE status != 'canceled'
         AND start_at < ? AND end_at > ?
         AND id != ?`
    )
    .all(end_at, start_at, id);

  const result = db
    .prepare(
      `UPDATE appointments
       SET owner_id = ?, dog_id = ?, start_at = ?, end_at = ?, service = ?, status = ?, notes = ?, updated_at = datetime('now')
       WHERE id = ?`
    )
    .run(owner_id, dog_id, start_at, end_at, service?.trim() ?? "", status ?? "scheduled", notes?.trim() ?? "", id);

  if (result.changes === 0) {
    return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
  }

  const appointment = db
    .prepare(
      `SELECT a.*, o.full_name AS owner_name, d.name AS dog_name
       FROM appointments a
       JOIN owners o ON o.id = a.owner_id
       JOIN dogs d ON d.id = a.dog_id
       WHERE a.id = ?`
    )
    .get(id);

  return NextResponse.json({ appointment, overlaps: overlaps.length > 0 });
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  const db = getDb();
  const result = db.prepare("DELETE FROM appointments WHERE id = ?").run(id);
  if (result.changes === 0) {
    return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
