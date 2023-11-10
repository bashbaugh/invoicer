import { create } from "zustand";
import { persist } from "zustand/middleware";

interface InvoicerSettings {
  openTab: number;
  setTab: (tab: number) => void;
  togglSelectedProjects: number[];
  setTogglSelectedProjects: (projects: number[]) => void;
}

export const useSettings = create(
  persist<InvoicerSettings>(
    (set) => ({
      openTab: 0,
      setTab: (tab) => set({ openTab: tab }),
      togglSelectedProjects: [],
      setTogglSelectedProjects: (projects) =>
        set({ togglSelectedProjects: projects }),
    }),
    {
      name: "invoicer-settings",
    }
  )
);
