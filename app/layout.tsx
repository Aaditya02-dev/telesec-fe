import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TeleRoot Dashboard",
  description: "Cyber-security and network monitoring dashboard"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
