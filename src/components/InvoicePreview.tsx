"use client";

import { useInvoice } from "@/hooks/useInvoice";
import InvoiceGenerator from "@/templates";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import Button from "./Button";

// TODO pdf error boundary

export default function InvoicePreview() {
  const invoice = useInvoice((s) => s.invoice);
  const doc = <InvoiceGenerator template={0} invoice={invoice} />;

  return (
    <div className="w-full h-full">
      <div className="rounded-t-3xl bg-primary-card h-full p-6">
        <div>
          {/* <PDFDownloadLink document={doc} fileName="invoice">
            <Button className="w-full bg-transparent">PDF</Button>
          </PDFDownloadLink> */}
        </div>

        <PDFViewer className="w-full h-full" showToolbar={false}>
          {doc}
        </PDFViewer>
      </div>
    </div>
  );
}
