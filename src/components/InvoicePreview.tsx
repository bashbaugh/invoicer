"use client";

import templates from "@/templates";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";

// TODO pdf error boundary

export default function InvoicePreview() {
  const template = templates[0].component;

  const InvoiceDocument = template;

  const doc = <InvoiceDocument />;

  return (
    <div className="w-full h-full">
      <div className="rounded-t-3xl bg-primary-card h-full p-6">
        <div>
          <PDFDownloadLink document={doc} fileName="invoice">
            <button>PDF</button>
          </PDFDownloadLink>
        </div>

        <PDFViewer className="w-full h-full" showToolbar={false}>
          {doc}
        </PDFViewer>
      </div>
    </div>
  );
}
