import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ashwin Girish — UX Designer",
  description:
    "Ashwin Girish is a UX designer crafting humane digital products — HRMS platforms, healthcare flows, and community systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${inter.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <body className="fig-cursor">{children}</body>
    </html>
  );
}
