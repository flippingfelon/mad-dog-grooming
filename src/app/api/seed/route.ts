import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export function POST() {
  const db = getDb();

  const existing = db.prepare("SELECT COUNT(*) AS cnt FROM owners").get() as { cnt: number };
  if (existing.cnt > 0) {
    return NextResponse.json({ message: "Database already has data, skipping seed" });
  }

  const now = new Date();
  const iso = (d: Date) => d.toISOString().replace("T", " ").slice(0, 19);

  const owners = [
    { id: crypto.randomUUID(), full_name: "Sarah Johnson", phone: "(503) 555-0142", address: "2847 NE Glisan St, Portland, OR 97232", grooming_notes: "Prefers morning appointments. Allergic to certain shampoos — use hypoallergenic only." },
    { id: crypto.randomUUID(), full_name: "Chris Martinez", phone: "(971) 555-0298", address: "1205 SE Hawthorne Blvd, Portland, OR 97214", grooming_notes: "" },
    { id: crypto.randomUUID(), full_name: "Maria Petrova", phone: "(503) 555-0371", address: "4420 N Williams Ave, Portland, OR 97217", grooming_notes: "Sometimes runs 5-10 min late. Very particular about ear cleaning." },
  ];

  const dogs = [
    { id: crypto.randomUUID(), owner_id: owners[0].id, name: "Milo", breed: "Goldendoodle", grooming_notes: "Hand scissor trim preferred. Blueberry facial. Low dryer noise tolerance — use quiet setting." },
    { id: crypto.randomUUID(), owner_id: owners[0].id, name: "Biscuit", breed: "Pomeranian", grooming_notes: "Tangles easily behind ears. Gentle with dematting." },
    { id: crypto.randomUUID(), owner_id: owners[1].id, name: "Luna", breed: "Shih Tzu", grooming_notes: "Sanitary trim + nail grind. Prefers breaks during face trim." },
    { id: crypto.randomUUID(), owner_id: owners[2].id, name: "Rocky", breed: "German Shepherd", grooming_notes: "De-shed treatment. Sensitive around rear paws — go slow." },
    { id: crypto.randomUUID(), owner_id: owners[2].id, name: "Daisy", breed: "Labrador Retriever", grooming_notes: "Basic bath & brush. Loves the dryer." },
  ];

  const d = (daysOffset: number, hour: number, min: number) => {
    const dt = new Date(now);
    dt.setDate(dt.getDate() + daysOffset);
    dt.setHours(hour, min, 0, 0);
    return iso(dt);
  };

  const appointments = [
    { id: crypto.randomUUID(), owner_id: owners[0].id, dog_id: dogs[0].id, start_at: d(-14, 9, 0), end_at: d(-14, 11, 0), service: "Full groom + blueberry facial", status: "completed", notes: "Milo did great. Minor mat behind left ear." },
    { id: crypto.randomUUID(), owner_id: owners[0].id, dog_id: dogs[1].id, start_at: d(-14, 11, 30), end_at: d(-14, 12, 30), service: "Bath & brush + nail trim", status: "completed", notes: "" },
    { id: crypto.randomUUID(), owner_id: owners[1].id, dog_id: dogs[2].id, start_at: d(-7, 10, 0), end_at: d(-7, 11, 30), service: "Sanitary trim + nail grind + teeth brushing", status: "completed", notes: "Luna was nervous during face trim, took extra breaks." },
    { id: crypto.randomUUID(), owner_id: owners[2].id, dog_id: dogs[3].id, start_at: d(-3, 9, 0), end_at: d(-3, 10, 30), service: "De-shed treatment + bath", status: "completed", notes: "Used FURminator. Huge blowout. Rocky tolerated rear paws better this time." },
    { id: crypto.randomUUID(), owner_id: owners[0].id, dog_id: dogs[0].id, start_at: d(0, 9, 0), end_at: d(0, 11, 0), service: "Full groom + blueberry facial", status: "scheduled", notes: "Check ear mats from last visit" },
    { id: crypto.randomUUID(), owner_id: owners[2].id, dog_id: dogs[4].id, start_at: d(0, 13, 0), end_at: d(0, 14, 0), service: "Bath & brush", status: "scheduled", notes: "" },
    { id: crypto.randomUUID(), owner_id: owners[1].id, dog_id: dogs[2].id, start_at: d(1, 10, 0), end_at: d(1, 11, 30), service: "Full groom", status: "scheduled", notes: "" },
    { id: crypto.randomUUID(), owner_id: owners[2].id, dog_id: dogs[3].id, start_at: d(3, 9, 0), end_at: d(3, 10, 30), service: "De-shed treatment", status: "scheduled", notes: "" },
    { id: crypto.randomUUID(), owner_id: owners[0].id, dog_id: dogs[1].id, start_at: d(5, 14, 0), end_at: d(5, 15, 0), service: "Bath & nail trim", status: "scheduled", notes: "" },
  ];

  const insertOwner = db.prepare(
    "INSERT INTO owners (id, full_name, phone, address, grooming_notes) VALUES (?, ?, ?, ?, ?)"
  );
  const insertDog = db.prepare(
    "INSERT INTO dogs (id, owner_id, name, breed, grooming_notes) VALUES (?, ?, ?, ?, ?)"
  );
  const insertAppt = db.prepare(
    "INSERT INTO appointments (id, owner_id, dog_id, start_at, end_at, service, status, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
  );

  const seedAll = db.transaction(() => {
    for (const o of owners) insertOwner.run(o.id, o.full_name, o.phone, o.address, o.grooming_notes);
    for (const d of dogs) insertDog.run(d.id, d.owner_id, d.name, d.breed, d.grooming_notes);
    for (const a of appointments) insertAppt.run(a.id, a.owner_id, a.dog_id, a.start_at, a.end_at, a.service, a.status, a.notes);
  });

  seedAll();

  return NextResponse.json({
    message: "Seeded successfully",
    counts: { owners: owners.length, dogs: dogs.length, appointments: appointments.length },
  });
}
