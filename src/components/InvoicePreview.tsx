"use client";

import templates from "@/templates";
import { PDFViewer } from "@react-pdf/renderer";

export default function InvoicePreview() {
  const template = templates[0].component;

  const InvoiceDocument = template;

  return (
    <div className="w-full h-full">
      <div className="rounded-t-3xl bg-primary-card h-full p-6">
        <PDFViewer className="w-full h-full" showToolbar={false}>
          <InvoiceDocument />
        </PDFViewer>
      </div>
    </div>
  );
}
