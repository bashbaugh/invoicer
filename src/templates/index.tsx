import { InvoiceData } from "@/hooks/useInvoice";
import Template1 from "./template1";

// TODO figure out how to make dynamic imports work with react-pdf
// const Template1 = dynamic(() => import(`./template1`));

export const templates = [
  {
    id: "template1",
    name: "Template 1",
    component: Template1,
  },
  // {
  //   id: "template2",
  //   name: "Template 2",
  //   component: Template1,
  // },
] as const;

export type TemplateData = (typeof templates)[number];
export type TemplateID = (typeof templates)[number]["id"];

export type TemplateProps = {
  invoice: InvoiceData;
};
