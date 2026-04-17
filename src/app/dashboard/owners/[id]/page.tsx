"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import type { Owner, Dog, AppointmentWithDetails } from "@/lib/types";

export default function OwnerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [owner, setOwner] = useState<Owner | null>(null);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [history, setHistory] = useState<AppointmentWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ full_name: "", phone: "", address: "", grooming_notes: "" });
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    fetch(`/api/owners/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((data) => {
        setOwner(data.owner);
        setDogs(data.dogs ?? []);
        setHistory(data.appointments ?? []);
        setForm({
          full_name: data.owner.full_name,
          phone: data.owner.phone,
          address: data.owner.address,
          grooming_notes: data.owner.grooming_notes ?? "",
        });
      })
      .catch(() => router.push("/dashboard/owners"))
      .finally(() => setLoading(false));
  };

  useEffect(load, [id, router]);

  const saveOwner = async () => {
    setSaving(true);
    await fetch(`/api/owners/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setEditing(false);
    load();
  };

  const deleteOwner = async () => {
    if (!confirm("Delete this owner and all their dogs + appointments? This cannot be undone.")) return;
    await fetch(`/api/owners/${id}`, { method: "DELETE" });
    router.push("/dashboard/owners");
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
      </div>
    );
  }

  if (!owner) return null;

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="space-y-6">
      {/* Back link */}
      <button onClick={() => router.push("/dashboard/owners")} className="text-sm font-medium text-gold-dark hover:underline">
        ← All Owners
      </button>

      {/* Owner Info */}
      <section className="rounded-2xl border border-gold-light/30 bg-warm-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h1 className="text-2xl font-bold text-brown">{owner.full_name}</h1>
          <div className="flex gap-2">
            {!editing && (
              <button onClick={() => setEditing(true)} className="rounded-lg border border-gold-light/40 px-3 py-1.5 text-xs font-medium text-brown hover:bg-cream-dark transition-colors">
                Edit
              </button>
            )}
            <button onClick={deleteOwner} className="rounded-lg border border-red/30 px-3 py-1.5 text-xs font-medium text-red hover:bg-red/10 transition-colors">
              Delete
            </button>
          </div>
        </div>

        {editing ? (
          <div className="space-y-3">
            <Field label="Name *" value={form.full_name} onChange={(v) => set("full_name", v)} />
            <Field label="Phone *" value={form.phone} onChange={(v) => set("phone", v)} type="tel" />
            <Field label="Address *" value={form.address} onChange={(v) => set("address", v)} />
            <Field label="Owner Grooming Notes" value={form.grooming_notes} onChange={(v) => set("grooming_notes", v)} multiline />
            <div className="flex gap-2 pt-2">
              <button onClick={saveOwner} disabled={saving} className="rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-warm-white hover:bg-gold-dark transition-colors disabled:opacity-50">
                {saving ? "Saving…" : "Save"}
              </button>
              <button onClick={() => setEditing(false)} className="rounded-lg border border-gold-light/40 px-4 py-2 text-sm font-medium text-brown hover:bg-cream-dark transition-colors">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <dl className="grid gap-3 sm:grid-cols-2">
            <InfoItem label="Phone" value={owner.phone} />
            <InfoItem label="Address" value={owner.address} />
            {owner.grooming_notes && <InfoItem label="Grooming Notes" value={owner.grooming_notes} span />}
          </dl>
        )}
      </section>

      {/* Dogs */}
      <section className="rounded-2xl border border-gold-light/30 bg-warm-white p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-brown">Dogs ({dogs.length})</h2>
        </div>

        {dogs.length === 0 && (
          <p className="py-4 text-center text-sm text-brown/40">No dogs yet</p>
        )}

        <div className="space-y-3">
          {dogs.map((dog) => (
            <DogCard key={dog.id} dog={dog} onUpdated={load} />
          ))}
        </div>

        <AddDogForm ownerId={id} onAdded={load} />
      </section>

      {/* Appointment History */}
      <section className="rounded-2xl border border-gold-light/30 bg-warm-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-brown">Completed Appointments</h2>
        {history.length === 0 && (
          <p className="py-4 text-center text-sm text-brown/40">No completed appointments yet</p>
        )}
        <div className="space-y-2">
          {history.map((a) => (
            <div key={a.id} className="flex items-start gap-4 rounded-lg border border-green/20 bg-green/5 px-4 py-3">
              <div className="shrink-0 text-sm font-medium text-brown/70">
                {new Date(a.start_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-brown">{a.dog_name}</p>
                <p className="text-sm text-brown/60">{a.service || "Grooming"}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function DogCard({ dog, onUpdated }: { dog: Dog; onUpdated: () => void }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: dog.name, breed: dog.breed, grooming_notes: dog.grooming_notes });
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    await fetch(`/api/dogs/${dog.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setEditing(false);
    onUpdated();
  };

  const remove = async () => {
    if (!confirm(`Delete ${dog.name}? This will also delete their appointments.`)) return;
    await fetch(`/api/dogs/${dog.id}`, { method: "DELETE" });
    onUpdated();
  };

  if (editing) {
    return (
      <div className="rounded-xl border border-gold/30 bg-cream/30 p-4 space-y-2">
        <Field label="Dog Name *" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} />
        <Field label="Breed" value={form.breed} onChange={(v) => setForm((f) => ({ ...f, breed: v }))} />
        <Field label="Dog Grooming Notes" value={form.grooming_notes} onChange={(v) => setForm((f) => ({ ...f, grooming_notes: v }))} multiline />
        <div className="flex gap-2 pt-1">
          <button onClick={save} disabled={saving} className="rounded-lg bg-gold px-3 py-1.5 text-xs font-semibold text-warm-white hover:bg-gold-dark disabled:opacity-50">
            {saving ? "Saving…" : "Save"}
          </button>
          <button onClick={() => setEditing(false)} className="rounded-lg border border-gold-light/40 px-3 py-1.5 text-xs font-medium text-brown hover:bg-cream-dark">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start justify-between rounded-xl border border-gold-light/20 bg-cream/20 p-4">
      <div>
        <h3 className="font-semibold text-brown">{dog.name}</h3>
        {dog.breed && <p className="text-sm text-brown/60">{dog.breed}</p>}
        {dog.grooming_notes && <p className="mt-1 text-sm text-brown/50 italic">{dog.grooming_notes}</p>}
      </div>
      <div className="flex gap-1.5">
        <button onClick={() => setEditing(true)} className="rounded-lg border border-gold-light/40 px-2.5 py-1 text-xs font-medium text-brown hover:bg-cream-dark">
          Edit
        </button>
        <button onClick={remove} className="rounded-lg border border-red/30 px-2.5 py-1 text-xs font-medium text-red hover:bg-red/10">
          Delete
        </button>
      </div>
    </div>
  );
}

function AddDogForm({ ownerId, onAdded }: { ownerId: string; onAdded: () => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", breed: "", grooming_notes: "" });
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!form.name.trim()) return;
    setSaving(true);
    await fetch("/api/dogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ owner_id: ownerId, ...form }),
    });
    setSaving(false);
    setForm({ name: "", breed: "", grooming_notes: "" });
    setOpen(false);
    onAdded();
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="mt-3 w-full rounded-xl border-2 border-dashed border-gold-light/40 py-3 text-sm font-medium text-gold-dark hover:bg-cream-dark/30 transition-colors"
      >
        + Add Dog
      </button>
    );
  }

  return (
    <div className="mt-3 rounded-xl border border-gold/30 bg-cream/30 p-4 space-y-2">
      <Field label="Dog Name *" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} />
      <Field label="Breed" value={form.breed} onChange={(v) => setForm((f) => ({ ...f, breed: v }))} />
      <Field label="Dog Grooming Notes" value={form.grooming_notes} onChange={(v) => setForm((f) => ({ ...f, grooming_notes: v }))} multiline />
      <div className="flex gap-2 pt-1">
        <button onClick={save} disabled={saving || !form.name.trim()} className="rounded-lg bg-gold px-3 py-1.5 text-xs font-semibold text-warm-white hover:bg-gold-dark disabled:opacity-50">
          {saving ? "Saving…" : "Add Dog"}
        </button>
        <button onClick={() => setOpen(false)} className="rounded-lg border border-gold-light/40 px-3 py-1.5 text-xs font-medium text-brown hover:bg-cream-dark">
          Cancel
        </button>
      </div>
    </div>
  );
}

function InfoItem({ label, value, span }: { label: string; value: string; span?: boolean }) {
  return (
    <div className={span ? "sm:col-span-2" : ""}>
      <dt className="text-xs font-semibold text-brown/50 uppercase tracking-wide">{label}</dt>
      <dd className="mt-0.5 text-sm text-brown">{value}</dd>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  multiline?: boolean;
}) {
  const cls =
    "w-full rounded-lg border border-gold-light/40 bg-warm-white px-3 py-2.5 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20";
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold text-brown/60 uppercase tracking-wide">{label}</label>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={2} className={cls} />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
      )}
    </div>
  );
}
