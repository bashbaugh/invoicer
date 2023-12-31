"use client";

import { useInvoice } from "@/hooks/useInvoice";
import { useCurrentTemplate } from "@/hooks/useSettings";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { useEffect, useState } from "react";

// TODO pdf error boundary

export default function InvoicePreview() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const invoice = useInvoice((s) => s.invoice);
  const Template = useCurrentTemplate()?.component;
  const doc = Template && <Template invoice={invoice} />;

  return (
    <div className="w-full h-full">
      <div className="rounded-t-3xl bg-primary-card h-full p-6">
        <div>
          {/* <PDFDownloadLink document={doc} fileName="invoice">
            <Button className="w-full bg-transparent">PDF</Button>
          </PDFDownloadLink> */}
        </div>

        {loaded && (
          <PDFViewer className="w-full h-full" showToolbar={false}>
            {doc}
          </PDFViewer>
        )}
      </div>
    </div>
  );
}
