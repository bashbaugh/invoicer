import { InvoiceData } from "@/hooks/useInvoice";
import dynamic from "next/dynamic";
import Template1 from "./template1";

// const Template1 = dynamic(() => import(`./template1`));

export const templates = [
  {
    name: "Template 1",
    component: Template1,
  },
] as const;

export type TemplateProps = {
  invoice: InvoiceData;
};

interface InvoiceGeneratorProps {
  template: number;
  invoice: InvoiceData;
}

export default function InvoiceGenerator({
  template,
  invoice,
}: InvoiceGeneratorProps) {
  const InvoiceTemplate = templates[template].component;
  return <InvoiceTemplate invoice={invoice} />;
}
