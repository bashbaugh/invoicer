import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface InvoiceData {
  lineItems: Array<{
    description: string;
    subitems: string[];
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  subtotal: number;
}

export const useInvoice = create(
  persist<{
    invoice: InvoiceData;
    version: number;
    setInvoiceData: (data: Partial<InvoiceData>) => void;
  }>(
    (set) => ({
      invoice: {
        lineItems: [],
        subtotal: 0,
      },

      version: 0,

      setInvoiceData: (data) => {
        set((state) => ({
          invoice: {
            ...state.invoice,
            ...data,
          },
          version: state.version + 1,
        }));
      },
    }),
    {
      name: "invoice-data",
      version: 1,
    }
  )
);
