import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export function GET(req: NextRequest) {
  const db = getDb();
  const start = req.nextUrl.searchParams.get("start");
  const end = req.nextUrl.searchParams.get("end");

  let appointments;
  if (start && end) {
    appointments = db
      .prepare(
        `SELECT a.*, o.full_name AS owner_name, d.name AS dog_name
         FROM appointments a
         JOIN owners o ON o.id = a.owner_id
         JOIN dogs d ON d.id = a.dog_id
         WHERE a.start_at >= ? AND a.start_at < ?
         ORDER BY a.start_at`
      )
      .all(start, end);
  } else {
    appointments = db
      .prepare(
        `SELECT a.*, o.full_name AS owner_name, d.name AS dog_name
         FROM appointments a
         JOIN owners o ON o.id = a.owner_id
         JOIN dogs d ON d.id = a.dog_id
         ORDER BY a.start_at`
      )
      .all();
  }

  return NextResponse.json({ appointments });
}

export async function POST(req: NextRequest) {
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
         AND id != ''`
    )
    .all(end_at, start_at);

  const id = crypto.randomUUID();
  db.prepare(
    `INSERT INTO appointments (id, owner_id, dog_id, start_at, end_at, service, status, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    owner_id,
    dog_id,
    start_at,
    end_at,
    service?.trim() ?? "",
    status ?? "scheduled",
    notes?.trim() ?? ""
  );

  const appointment = db
    .prepare(
      `SELECT a.*, o.full_name AS owner_name, d.name AS dog_name
       FROM appointments a
       JOIN owners o ON o.id = a.owner_id
       JOIN dogs d ON d.id = a.dog_id
       WHERE a.id = ?`
    )
    .get(id);

  return NextResponse.json(
    { appointment, overlaps: overlaps.length > 0 },
    { status: 201 }
  );
}
