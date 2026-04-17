import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  const body = await req.json();
  const { name, breed, grooming_notes } = body;

  if (!name?.trim()) {
    return NextResponse.json({ error: "name is required" }, { status: 400 });
  }

  const db = getDb();
  const result = db
    .prepare(
      `UPDATE dogs SET name = ?, breed = ?, grooming_notes = ?, updated_at = datetime('now')
       WHERE id = ?`
    )
    .run(name.trim(), breed?.trim() ?? "", grooming_notes?.trim() ?? "", id);

  if (result.changes === 0) {
    return NextResponse.json({ error: "Dog not found" }, { status: 404 });
  }

  const dog = db.prepare("SELECT * FROM dogs WHERE id = ?").get(id);
  return NextResponse.json({ dog });
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  const db = getDb();
  const result = db.prepare("DELETE FROM dogs WHERE id = ?").run(id);
  if (result.changes === 0) {
    return NextResponse.json({ error: "Dog not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
