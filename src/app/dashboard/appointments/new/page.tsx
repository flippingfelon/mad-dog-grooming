"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Owner, Dog, AppointmentStatus } from "@/lib/types";

export default function NewAppointmentPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-16"><div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" /></div>}>
      <NewAppointmentForm />
    </Suspense>
  );
}

function NewAppointmentForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preDate = searchParams.get("date") ?? new Date().toISOString().slice(0, 10);

  const [owners, setOwners] = useState<Owner[]>([]);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [form, setForm] = useState({
    owner_id: "",
    dog_id: "",
    date: preDate,
    start_time: "09:00",
    end_time: "10:00",
    service: "",
    status: "scheduled" as AppointmentStatus,
    notes: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [overlapWarning, setOverlapWarning] = useState(false);

  useEffect(() => {
    fetch("/api/owners")
      .then((r) => r.json())
      .then((d) => setOwners(d.owners ?? []));
  }, []);

  useEffect(() => {
    if (!form.owner_id) {
      setDogs([]);
      return;
    }
    fetch(`/api/dogs?owner_id=${form.owner_id}`)
      .then((r) => r.json())
      .then((d) => setDogs(d.dogs ?? []));
  }, [form.owner_id]);

  const set = (k: string, v: string) => {
    setForm((f) => {
      const next = { ...f, [k]: v };
      if (k === "owner_id") next.dog_id = "";
      return next;
    });
  };

  const toIso = (date: string, time: string) => `${date}T${time}:00`;

  const save = async () => {
    if (!form.owner_id || !form.dog_id || !form.date || !form.start_time || !form.end_time) {
      setError("Please fill in all required fields");
      return;
    }

    const start_at = toIso(form.date, form.start_time);
    const end_at = toIso(form.date, form.end_time);

    if (new Date(end_at) <= new Date(start_at)) {
      setError("End time must be after start time");
      return;
    }

    setSaving(true);
    setError("");
    setOverlapWarning(false);

    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        owner_id: form.owner_id,
        dog_id: form.dog_id,
        start_at,
        end_at,
        service: form.service,
        status: form.status,
        notes: form.notes,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Failed to save");
      setSaving(false);
      return;
    }

    if (data.overlaps) {
      setOverlapWarning(true);
    }

    router.push("/dashboard/calendar");
  };

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brown">New Appointment</h1>
        <button onClick={() => router.back()} className="text-sm font-medium text-gold-dark hover:underline">
          Cancel
        </button>
      </div>

      {error && <p className="rounded-lg bg-red/10 px-4 py-2.5 text-sm font-medium text-red">{error}</p>}
      {overlapWarning && (
        <p className="rounded-lg bg-gold/15 px-4 py-2.5 text-sm font-medium text-gold-dark">
          ⚠ This appointment overlaps with another booking. Saved anyway.
        </p>
      )}

      <div className="rounded-2xl border border-gold-light/30 bg-warm-white p-5 shadow-sm space-y-4">
        {/* Date & Times */}
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Date *" type="date" value={form.date} onChange={(v) => set("date", v)} />
          <Field label="Start Time *" type="time" value={form.start_time} onChange={(v) => set("start_time", v)} />
          <Field label="End Time *" type="time" value={form.end_time} onChange={(v) => set("end_time", v)} />
        </div>

        {/* Owner */}
        <div>
          <label className="mb-1 block text-xs font-semibold text-brown/60 uppercase tracking-wide">Owner *</label>
          <select
            value={form.owner_id}
            onChange={(e) => set("owner_id", e.target.value)}
            className="w-full rounded-lg border border-gold-light/40 bg-cream/30 px-3 py-2.5 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
          >
            <option value="">Select owner…</option>
            {owners.map((o) => (
              <option key={o.id} value={o.id}>{o.full_name}</option>
            ))}
          </select>
        </div>

        {/* Dog */}
        <div>
          <label className="mb-1 block text-xs font-semibold text-brown/60 uppercase tracking-wide">Dog *</label>
          <select
            value={form.dog_id}
            onChange={(e) => set("dog_id", e.target.value)}
            disabled={!form.owner_id}
            className="w-full rounded-lg border border-gold-light/40 bg-cream/30 px-3 py-2.5 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 disabled:opacity-50"
          >
            <option value="">{form.owner_id ? "Select dog…" : "Select an owner first"}</option>
            {dogs.map((d) => (
              <option key={d.id} value={d.id}>{d.name}{d.breed ? ` (${d.breed})` : ""}</option>
            ))}
          </select>
        </div>

        {/* Service */}
        <Field label="Service" value={form.service} onChange={(v) => set("service", v)} placeholder="e.g. Full groom, Bath & brush, De-shed…" />

        {/* Status */}
        <div>
          <label className="mb-1 block text-xs font-semibold text-brown/60 uppercase tracking-wide">Status</label>
          <select
            value={form.status}
            onChange={(e) => set("status", e.target.value)}
            className="w-full rounded-lg border border-gold-light/40 bg-cream/30 px-3 py-2.5 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
          >
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>

        {/* Notes */}
        <Field label="Notes" value={form.notes} onChange={(v) => set("notes", v)} multiline placeholder="Optional appointment notes…" />
      </div>

      <button
        onClick={save}
        disabled={saving}
        className="w-full rounded-xl bg-gold py-3 text-base font-semibold text-warm-white shadow-sm hover:bg-gold-dark transition-colors disabled:opacity-50"
      >
        {saving ? "Saving…" : "Create Appointment"}
      </button>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  multiline,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  multiline?: boolean;
  placeholder?: string;
}) {
  const cls =
    "w-full rounded-lg border border-gold-light/40 bg-cream/30 px-3 py-2.5 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20";
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold text-brown/60 uppercase tracking-wide">{label}</label>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className={cls} placeholder={placeholder} />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className={cls} placeholder={placeholder} />
      )}
    </div>
  );
}
