import type { Metadata } from "next";
import { Nunito, Playfair_Display } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mad Dog Grooming | Professional Dog Grooming in Portland, OR",
  description:
    "Mad Dog Grooming offers professional, personalized dog grooming services in Portland, Oregon. Every pup gets one-on-one attention, detailed grooming notes, and a stress-free experience. Book your appointment today.",
  keywords: [
    "dog grooming Portland",
    "dog grooming Portland OR",
    "pet grooming near me",
    "professional dog groomer",
    "Mad Dog Grooming",
    "dog bath Portland",
    "dog haircut Portland",
    "goldendoodle grooming",
    "poodle grooming Portland",
    "mobile dog grooming Portland",
  ],
  authors: [{ name: "Mad Dog Grooming" }],
  openGraph: {
    title: "Mad Dog Grooming | Professional Dog Grooming in Portland, OR",
    description:
      "Professional, personalized dog grooming in Portland. Every pup gets one-on-one attention and a stress-free experience.",
    url: "https://mad-dog-grooming.com",
    siteName: "Mad Dog Grooming",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://mad-dog-grooming.com/logo.jpeg",
        width: 800,
        height: 800,
        alt: "Mad Dog Grooming logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mad Dog Grooming | Professional Dog Grooming in Portland, OR",
    description:
      "Professional, personalized dog grooming in Portland. Every pup gets one-on-one attention.",
    images: ["https://mad-dog-grooming.com/logo.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://mad-dog-grooming.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/logo.jpeg" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
