// BARIS INI PALING PENTING! Harus ada di paling atas.
import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Olaa's Birthday",
  description: "A special gift",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={cn("font-sans", inter.variable)}>
      {/* className antialiased bikin font jadi lebih halus */}
      <body className="antialiased bg-pink-50">{children}</body>
    </html>
  );
}
