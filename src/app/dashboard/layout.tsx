"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [seeded, setSeeded] = useState(false);

  useEffect(() => {
    if (seeded) return;
    fetch("/api/seed", { method: "POST" })
      .then(() => setSeeded(true))
      .catch(() => {});
  }, [seeded]);

  return (
    <>
      <Header />
      <main className="flex-1 bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">{children}</div>
      </main>
      <Footer />
    </>
  );
}
