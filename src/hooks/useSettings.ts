import { TogglTimeEntry } from "@/app/api/toggl/route";
import { templates, type TemplateID } from "@/templates";
import { useMemo } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface InvoicerSettings {
  openTab: number;
  setTab: (tab: number) => void;

  templateId?: TemplateID;
  setTemplateId: (templateId: TemplateID) => void;

  lineItems: Array<{
    description: string;
    quantity?: string;
    unitPrice?: string;
    total?: string;
    togglProjects?: number[];
    togglAggregatedEntries?: TogglTimeEntry[];
  }>;

  addLineItem: () => void;
  removeLineItem: (index: number) => void;
  updateLineItem: (index: number, lineItem: Partial<any>) => void;
}

export const useSettings = create(
  persist(
    immer<InvoicerSettings>((set) => ({
      openTab: 0,
      setTab: (tab) => set({ openTab: tab }),

      templateId: "template1",
      setTemplateId: (templateId) => set({ templateId }),

      lineItems: [],
      addLineItem: () =>
        set((s) => {
          s.lineItems.push({
            description: "",
          });
        }),
      removeLineItem: (index) =>
        set((state) => {
          state.lineItems.splice(index, 1);
        }),
      updateLineItem: (index, lineItem) => {
        set((state) => {
          state.lineItems[index] = { ...state.lineItems[index], ...lineItem };
        });
      },
    })),
    {
      name: "invoicer-settings",
      version: 0,
    }
  )
);

export const useCurrentTemplate = () => {
  const templateId = useSettings((s) => s.templateId);

  return useMemo(() => {
    return templates.find((t) => t.id === templateId);
  }, [templateId]);
};
