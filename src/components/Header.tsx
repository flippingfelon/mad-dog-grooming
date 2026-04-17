"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const siteLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#why-us", label: "Why Us" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

const dashLinks = [
  { href: "/dashboard/calendar", label: "Calendar" },
  { href: "/dashboard/owners", label: "Owners" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isDashboard = pathname.startsWith("/dashboard");

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  const links = isDashboard ? dashLinks : siteLinks;

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-gold-light/40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href={isDashboard ? "/dashboard/calendar" : "/"} className="flex items-center gap-3 group">
          <Image
            src="/logo.jpeg"
            alt="Mad Dog Grooming"
            width={48}
            height={48}
            className="rounded-full shadow-md group-hover:shadow-lg transition-shadow"
          />
          <span className="font-[var(--font-playfair)] text-xl font-bold text-brown tracking-tight hidden sm:block">
            Mad Dog Grooming
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {isDashboard && (
            <Link
              href="/"
              className="text-brown-light/50 font-semibold text-sm uppercase tracking-wider hover:text-gold-dark transition-colors"
            >
              Home
            </Link>
          )}
          {links.map((link) => {
            const active = isDashboard && pathname.startsWith(link.href);
            return isDashboard ? (
              <Link
                key={link.href}
                href={link.href}
                className={`font-semibold text-sm uppercase tracking-wider transition-colors ${
                  active ? "text-gold-dark" : "text-brown-light hover:text-gold-dark"
                }`}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-brown-light font-semibold text-sm uppercase tracking-wider hover:text-gold-dark transition-colors"
              >
                {link.label}
              </a>
            );
          })}
          {isDashboard ? (
            <>
              <Link
                href={`/dashboard/appointments/new?date=${new Date().toISOString().slice(0, 10)}`}
                className="rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-gold-dark transition-colors"
              >
                + New Appointment
              </Link>
              <button
                onClick={logout}
                className="text-brown-light/40 font-semibold text-sm uppercase tracking-wider hover:text-red transition-colors"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/dashboard/calendar"
                className="text-brown-light font-semibold text-sm uppercase tracking-wider hover:text-gold-dark transition-colors"
              >
                Schedule
              </Link>
              <a
                href="#contact"
                className="rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-gold-dark transition-colors"
              >
                Book Now
              </a>
            </>
          )}
        </nav>

        <button
          className="md:hidden p-2 text-brown"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gold-light/40 bg-cream px-6 pb-4">
          {isDashboard && (
            <Link
              href="/"
              className="block py-3 text-brown-light/50 font-semibold text-sm uppercase tracking-wider hover:text-gold-dark"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          )}
          {links.map((link) => {
            const active = isDashboard && pathname.startsWith(link.href);
            return isDashboard ? (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-3 font-semibold text-sm uppercase tracking-wider ${
                  active ? "text-gold-dark" : "text-brown-light hover:text-gold-dark"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="block py-3 text-brown-light font-semibold text-sm uppercase tracking-wider hover:text-gold-dark"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            );
          })}
          {isDashboard ? (
            <>
              <Link
                href={`/dashboard/appointments/new?date=${new Date().toISOString().slice(0, 10)}`}
                className="mt-2 block rounded-full bg-gold px-5 py-2.5 text-center text-sm font-bold text-white shadow-md hover:bg-gold-dark"
                onClick={() => setMenuOpen(false)}
              >
                + New Appointment
              </Link>
              <button
                onClick={() => { setMenuOpen(false); logout(); }}
                className="mt-2 block w-full py-3 text-left text-brown-light/40 font-semibold text-sm uppercase tracking-wider hover:text-red"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/dashboard/calendar"
                className="block py-3 text-brown-light font-semibold text-sm uppercase tracking-wider hover:text-gold-dark"
                onClick={() => setMenuOpen(false)}
              >
                Schedule
              </Link>
              <a
                href="#contact"
                className="mt-2 block rounded-full bg-gold px-5 py-2.5 text-center text-sm font-bold text-white shadow-md hover:bg-gold-dark"
                onClick={() => setMenuOpen(false)}
              >
                Book Now
              </a>
            </>
          )}
        </div>
      )}
    </header>
  );
}
