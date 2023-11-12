import { create } from "zustand";
import { persist } from "zustand/middleware";
import deepmerge from "deepmerge";

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export interface InvoiceData {
  lineItems: Array<{
    description: string;
    subitems: {
      text: string;
      tags?: string[];
    }[];
    quantity: string;
    unitPrice: string;
    total: string;
  }>;
  subtotal: string;
  total: string;

  recipient: {
    name: string;
    contactDetails: string;
  };

  from: {
    name: string;
    contactDetails: string;
  };

  issueDate: string;
  dueDate: string;

  invoiceNumber: string;
  invoiceSubtitle: string;

  paymentDetails: string;
  note: string;
}

export const useInvoice = create(
  persist<{
    invoice: InvoiceData;
    updateInvoiceData: (data: DeepPartial<InvoiceData>) => void;
  }>(
    (set) => ({
      invoice: {
        lineItems: [],
        subtotal: "$0",
        total: "$0",
        recipient: {
          name: "Some Company",
          contactDetails: "123 Blueberry Drive\nCity, ST 12345",
        },
        from: {
          name: "Jane Smith",
          contactDetails: "134 Raspberry Circle\nCity, ST 12345",
        },
        issueDate: "11/01/2023",
        dueDate: "11/31/2023",
        invoiceNumber: "INV-002",
        invoiceSubtitle: "October 2023",
        paymentDetails: "Lorem Ipsum",
        note: "Thank you",
      },

      updateInvoiceData: (data) => {
        set((state) => {
          return {
            invoice: deepmerge(state.invoice, data, {
              // Overwrite arrays
              arrayMerge: (_, sourceArray) => sourceArray,
            }),
          };
        });
      },
    }),
    {
      name: "invoice-data",
      version: 2,
    }
  )
);
