"use client";

import { useInvoice } from "@/hooks/useInvoice";
import { useCurrentTemplate } from "@/hooks/useSettings";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import Button from "./Button";
import { HiDownload } from "react-icons/hi";

// TODO pdf error boundary

export default function InvoiceDownloadButton() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const invoice = useInvoice((s) => s.invoice);
  const Template = useCurrentTemplate()?.component;
  const doc = Template && <Template invoice={invoice} />;

  return (
    loaded &&
    doc && (
      <PDFDownloadLink
        document={doc}
        fileName={`INVOICE_${invoice.invoiceNumber}.pdf`}
      >
        <Button icon={<HiDownload />}>PDF</Button>
      </PDFDownloadLink>
    )
  );
}
