import type { Metadata } from "next";
import "../globals.css";
import { fontVariables } from "@/fonts";

export const metadata: Metadata = {
  title: "Invoicer",
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={fontVariables}>
        <main className="p-12">{children}</main>
      </body>
    </html>
  );
}
