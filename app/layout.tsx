import type React from "react";
import type { Metadata } from "next";

import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

import {
  Geist,
  Geist_Mono,
  Playfair_Display as V0_Font_Playfair_Display,
} from "next/font/google";
import { SnackbarProvider } from "notistack";
import NotistackProvider from "@/components/snackbarprovider";

// Initialize fonts
const _geist = Geist({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const _geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const _playfairDisplay = V0_Font_Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Nexus ADMIN-ORG",
  description: "Enterprise Learning Management System Administration",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${_geistMono.className} antialiased`}>
        <NotistackProvider>
          {children}
          <Analytics />
        </NotistackProvider>
      </body>
    </html>
  );
}
