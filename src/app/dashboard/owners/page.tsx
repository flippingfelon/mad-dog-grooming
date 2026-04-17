"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import type { OwnerWithDogCount } from "@/lib/types";

export default function OwnersPage() {
  const [owners, setOwners] = useState<OwnerWithDogCount[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    const qs = search ? `?search=${encodeURIComponent(search)}` : "";
    fetch(`/api/owners${qs}`)
      .then((r) => r.json())
      .then((d) => setOwners(d.owners ?? []))
      .catch(() => setOwners([]))
      .finally(() => setLoading(false));
  }, [search]);

  useEffect(() => {
    const t = setTimeout(load, 300);
    return () => clearTimeout(t);
  }, [load]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-brown">Owners</h1>
        <button
          onClick={() => setShowForm(true)}
          className="rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-warm-white shadow-sm hover:bg-gold-dark transition-colors"
        >
          + New Owner
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by owner name, phone, or dog name…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-xl border border-gold-light/40 bg-warm-white px-4 py-3 text-sm shadow-sm placeholder:text-brown/30 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
      />

      {loading && (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        </div>
      )}

      {!loading && owners.length === 0 && (
        <div className="rounded-xl border border-dashed border-gold-light/40 bg-warm-white py-12 text-center text-sm text-brown/40">
          {search ? "No owners matching your search" : "No owners yet — add one to get started"}
        </div>
      )}

      {!loading && owners.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {owners.map((o) => (
            <Link
              key={o.id}
              href={`/dashboard/owners/${o.id}`}
              className="group rounded-xl border border-gold-light/30 bg-warm-white p-4 shadow-sm transition-all hover:shadow-md hover:border-gold/40"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-brown group-hover:text-gold-dark transition-colors">{o.full_name}</h3>
                  <p className="mt-0.5 text-sm text-brown/60">{o.phone}</p>
                </div>
                <span className="rounded-full bg-cream-dark px-2.5 py-0.5 text-xs font-medium text-brown/60">
                  {o.dog_count} {o.dog_count === 1 ? "dog" : "dogs"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {showForm && (
        <NewOwnerDialog
          onClose={() => setShowForm(false)}
          onSaved={() => {
            setShowForm(false);
            load();
          }}
        />
      )}
    </div>
  );
}

function NewOwnerDialog({ onClose, onSaved }: { onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({ full_name: "", phone: "", address: "", grooming_notes: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    if (!form.full_name.trim() || !form.phone.trim() || !form.address.trim()) {
      setError("Name, phone, and address are required");
      return;
    }
    setSaving(true);
    setError("");
    const res = await fetch("/api/owners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Failed to save");
      setSaving(false);
      return;
    }
    onSaved();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brown/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl bg-warm-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="mb-4 text-xl font-bold text-brown">New Owner</h2>
        {error && <p className="mb-3 rounded-lg bg-red/10 px-3 py-2 text-sm text-red">{error}</p>}

        <div className="space-y-3">
          <Field label="Owner Name *" value={form.full_name} onChange={(v) => set("full_name", v)} />
          <Field label="Phone *" value={form.phone} onChange={(v) => set("phone", v)} type="tel" />
          <Field label="Address *" value={form.address} onChange={(v) => set("address", v)} />
          <Field label="Grooming Notes" value={form.grooming_notes} onChange={(v) => set("grooming_notes", v)} multiline />
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-lg border border-gold-light/40 px-4 py-2 text-sm font-medium text-brown hover:bg-cream-dark transition-colors">
            Cancel
          </button>
          <button onClick={save} disabled={saving} className="rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-warm-white hover:bg-gold-dark transition-colors disabled:opacity-50">
            {saving ? "Saving…" : "Save Owner"}
          </button>
        </div>
      </div>
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
    "w-full rounded-lg border border-gold-light/40 bg-cream/30 px-3 py-2.5 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20";
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold text-brown/60 uppercase tracking-wide">{label}</label>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className={cls} />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
      )}
    </div>
  );
}
