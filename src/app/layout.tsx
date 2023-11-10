import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "@/fonts";

export const metadata: Metadata = {
  title: "Invoicer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={fontVariables}>{children}</body>
    </html>
  );
}
