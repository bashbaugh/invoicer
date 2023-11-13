import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "@/fonts";
import TokenLoader from "@/components/TokenLoader";

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
      <TokenLoader />
      <body className={fontVariables}>{children}</body>
    </html>
  );
}
