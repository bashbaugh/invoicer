import Template1 from "./template1";

const templates = [
  {
    name: "Template 1",
    component: Template1,
  },
];

export default templates;

export type TemplateProps = Partial<{
  fromName: string;
  toName: string;
  fromAddress: string;
  toAddress: string;
}>;
