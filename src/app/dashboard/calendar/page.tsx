"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { AppointmentWithDetails, AppointmentStatus } from "@/lib/types";

type ViewMode = "month" | "week" | "day";

const STATUS_STYLES: Record<AppointmentStatus, string> = {
  scheduled: "bg-gold/15 border-gold text-brown",
  completed: "bg-green/15 border-green text-green-dark",
  canceled: "bg-red/15 border-red/60 text-red line-through opacity-60",
};

const STATUS_DOT: Record<AppointmentStatus, string> = {
  scheduled: "bg-gold",
  completed: "bg-green",
  canceled: "bg-red",
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
function addDays(d: Date, n: number) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}
function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function fmt(d: Date) {
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}
function fmtWeek(d: Date) {
  const end = addDays(d, 6);
  return `${d.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
}
function fmtDay(d: Date) {
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}
function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}
function getMonthDays(year: number, month: number): Date[] {
  const first = new Date(year, month, 1);
  const startDow = first.getDay();
  const start = addDays(first, -startDow);
  const days: Date[] = [];
  for (let i = 0; i < 42; i++) days.push(addDays(start, i));
  return days;
}
function getWeekStart(d: Date) {
  return addDays(d, -d.getDay());
}

export default function CalendarPage() {
  const [view, setView] = useState<ViewMode>("month");
  const [currentDate, setCurrentDate] = useState(startOfDay(new Date()));
  const [selectedDate, setSelectedDate] = useState(startOfDay(new Date()));
  const [appointments, setAppointments] = useState<AppointmentWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchRange = useCallback(() => {
    let start: Date, end: Date;
    if (view === "month") {
      const first = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      start = addDays(first, -first.getDay());
      end = addDays(start, 42);
    } else if (view === "week") {
      start = getWeekStart(currentDate);
      end = addDays(start, 7);
    } else {
      start = startOfDay(currentDate);
      end = addDays(start, 1);
    }
    return { start: start.toISOString(), end: end.toISOString() };
  }, [view, currentDate]);

  useEffect(() => {
    setLoading(true);
    const { start, end } = fetchRange();
    fetch(`/api/appointments?start=${start}&end=${end}`)
      .then((r) => r.json())
      .then((data) => setAppointments(data.appointments ?? []))
      .catch(() => setAppointments([]))
      .finally(() => setLoading(false));
  }, [fetchRange]);

  const navigate = (dir: -1 | 0 | 1) => {
    if (dir === 0) {
      setCurrentDate(startOfDay(new Date()));
      setSelectedDate(startOfDay(new Date()));
      return;
    }
    const d = new Date(currentDate);
    if (view === "month") d.setMonth(d.getMonth() + dir);
    else if (view === "week") d.setDate(d.getDate() + dir * 7);
    else d.setDate(d.getDate() + dir);
    setCurrentDate(d);
  };

  const dayAppts = (d: Date) =>
    appointments.filter((a) => isSameDay(new Date(a.start_at), d));

  const selectedAppts = dayAppts(selectedDate);

  const title =
    view === "month" ? fmt(currentDate) : view === "week" ? fmtWeek(getWeekStart(currentDate)) : fmtDay(currentDate);

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="rounded-lg border border-gold-light/40 bg-warm-white px-3 py-2 text-sm font-medium hover:bg-cream-dark transition-colors">
            ←
          </button>
          <button onClick={() => navigate(0)} className="rounded-lg border border-gold-light/40 bg-warm-white px-3 py-2 text-sm font-medium hover:bg-cream-dark transition-colors">
            Today
          </button>
          <button onClick={() => navigate(1)} className="rounded-lg border border-gold-light/40 bg-warm-white px-3 py-2 text-sm font-medium hover:bg-cream-dark transition-colors">
            →
          </button>
          <h2 className="ml-2 text-lg font-bold text-brown">{title}</h2>
        </div>

        <div className="flex rounded-lg border border-gold-light/40 bg-warm-white p-0.5">
          {(["month", "week", "day"] as ViewMode[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
                view === v ? "bg-gold text-warm-white" : "text-brown hover:bg-cream-dark"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        </div>
      )}

      {!loading && view === "month" && (
        <MonthView
          currentDate={currentDate}
          selectedDate={selectedDate}
          appointments={appointments}
          onSelectDate={(d) => setSelectedDate(d)}
        />
      )}

      {!loading && view === "week" && (
        <WeekView
          currentDate={currentDate}
          selectedDate={selectedDate}
          appointments={appointments}
          onSelectDate={(d) => {
            setSelectedDate(d);
          }}
          onClickAppt={(id) => router.push(`/dashboard/appointments/${id}/edit`)}
        />
      )}

      {!loading && view === "day" && (
        <DayList
          appointments={dayAppts(currentDate)}
          onClickAppt={(id) => router.push(`/dashboard/appointments/${id}/edit`)}
          emptyLabel="No appointments this day"
        />
      )}

      {!loading && view === "month" && (
        <div className="mt-4">
          <h3 className="mb-3 text-sm font-semibold text-brown/70 uppercase tracking-wide">
            {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </h3>
          <DayList
            appointments={selectedAppts}
            onClickAppt={(id) => router.push(`/dashboard/appointments/${id}/edit`)}
            emptyLabel="No appointments"
          />
        </div>
      )}
    </div>
  );
}

/* ── Month Grid ──────────────────────────────────────────────── */
function MonthView({
  currentDate,
  selectedDate,
  appointments,
  onSelectDate,
}: {
  currentDate: Date;
  selectedDate: Date;
  appointments: AppointmentWithDetails[];
  onSelectDate: (d: Date) => void;
}) {
  const days = getMonthDays(currentDate.getFullYear(), currentDate.getMonth());
  const today = startOfDay(new Date());

  const apptsByDay = new Map<string, AppointmentWithDetails[]>();
  for (const a of appointments) {
    const key = new Date(a.start_at).toDateString();
    if (!apptsByDay.has(key)) apptsByDay.set(key, []);
    apptsByDay.get(key)!.push(a);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gold-light/40 bg-warm-white shadow-sm">
      <div className="grid grid-cols-7">
        {DAYS.map((d) => (
          <div key={d} className="border-b border-gold-light/30 bg-cream-dark/50 py-2 text-center text-xs font-semibold text-brown/60 uppercase">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {days.map((d, i) => {
          const inMonth = d.getMonth() === currentDate.getMonth();
          const isToday = isSameDay(d, today);
          const isSelected = isSameDay(d, selectedDate);
          const dayAppts = apptsByDay.get(d.toDateString()) ?? [];

          return (
            <button
              key={i}
              onClick={() => onSelectDate(d)}
              className={`relative min-h-[72px] border-b border-r border-gold-light/20 p-1.5 text-left transition-colors hover:bg-cream-dark/40 ${
                !inMonth ? "opacity-40" : ""
              } ${isSelected ? "bg-gold/10 ring-1 ring-inset ring-gold/40" : ""}`}
            >
              <span
                className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
                  isToday ? "bg-gold text-warm-white" : ""
                }`}
              >
                {d.getDate()}
              </span>
              <div className="mt-0.5 space-y-0.5">
                {dayAppts.slice(0, 3).map((a) => (
                  <div key={a.id} className="flex items-center gap-1 truncate">
                    <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${STATUS_DOT[a.status]}`} />
                    <span className="truncate text-[10px] leading-tight text-brown/80">
                      {fmtTime(a.start_at)} {a.dog_name}
                    </span>
                  </div>
                ))}
                {dayAppts.length > 3 && (
                  <span className="text-[10px] text-brown/50">+{dayAppts.length - 3} more</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Week View ───────────────────────────────────────────────── */
function WeekView({
  currentDate,
  selectedDate,
  appointments,
  onSelectDate,
  onClickAppt,
}: {
  currentDate: Date;
  selectedDate: Date;
  appointments: AppointmentWithDetails[];
  onSelectDate: (d: Date) => void;
  onClickAppt: (id: string) => void;
}) {
  const weekStart = getWeekStart(currentDate);
  const today = startOfDay(new Date());
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const apptsByDay = new Map<string, AppointmentWithDetails[]>();
  for (const a of appointments) {
    const key = new Date(a.start_at).toDateString();
    if (!apptsByDay.has(key)) apptsByDay.set(key, []);
    apptsByDay.get(key)!.push(a);
  }

  return (
    <div className="grid gap-3 md:grid-cols-7">
      {weekDays.map((d) => {
        const isToday = isSameDay(d, today);
        const isSelected = isSameDay(d, selectedDate);
        const dayAppts = apptsByDay.get(d.toDateString()) ?? [];

        return (
          <div
            key={d.toDateString()}
            className={`rounded-xl border bg-warm-white p-3 transition-colors ${
              isSelected ? "border-gold ring-1 ring-gold/30" : "border-gold-light/30"
            }`}
          >
            <button onClick={() => onSelectDate(d)} className="mb-2 flex items-center gap-1.5">
              <span className="text-xs font-medium text-brown/50">{DAYS[d.getDay()]}</span>
              <span
                className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${
                  isToday ? "bg-gold text-warm-white" : "text-brown"
                }`}
              >
                {d.getDate()}
              </span>
            </button>
            {dayAppts.length === 0 && (
              <p className="py-2 text-center text-xs text-brown/30">—</p>
            )}
            <div className="space-y-1.5">
              {dayAppts.map((a) => (
                <button
                  key={a.id}
                  onClick={() => onClickAppt(a.id)}
                  className={`w-full rounded-lg border-l-2 px-2 py-1.5 text-left transition-colors hover:shadow-sm ${STATUS_STYLES[a.status]}`}
                >
                  <p className="text-[11px] font-semibold">{fmtTime(a.start_at)}</p>
                  <p className="truncate text-xs">{a.dog_name} • {a.service || "Grooming"}</p>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Day List ────────────────────────────────────────────────── */
function DayList({
  appointments,
  onClickAppt,
  emptyLabel,
}: {
  appointments: AppointmentWithDetails[];
  onClickAppt: (id: string) => void;
  emptyLabel: string;
}) {
  if (appointments.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gold-light/40 bg-warm-white py-8 text-center text-sm text-brown/40">
        {emptyLabel}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {appointments.map((a) => (
        <button
          key={a.id}
          onClick={() => onClickAppt(a.id)}
          className={`flex w-full items-start gap-4 rounded-xl border-l-4 bg-warm-white px-4 py-3 text-left shadow-sm transition-all hover:shadow-md ${STATUS_STYLES[a.status]}`}
        >
          <div className="shrink-0 text-right">
            <p className="text-sm font-bold">{fmtTime(a.start_at)}</p>
            <p className="text-xs opacity-60">{fmtTime(a.end_at)}</p>
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold">{a.owner_name}</p>
            <p className="truncate text-sm opacity-80">
              {a.dog_name} • {a.service || "Grooming"}
            </p>
          </div>
          <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${STATUS_STYLES[a.status]}`}>
            {a.status}
          </span>
        </button>
      ))}
    </div>
  );
}
