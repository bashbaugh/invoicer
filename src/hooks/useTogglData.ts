import { TogglProject, TogglTimeEntry } from "@/app/api/toggl/route";
import { create } from "zustand";

interface TogglData {
  entries: TogglTimeEntry[];
  projects: TogglProject[];
  loadData: () => void;
}

export const useTogglData = create<TogglData>((set, get) => ({
  entries: [],
  projects: [],
  loadData: async () => {
    const response = await fetch("/api/toggl");
    const data = await response.json();
    set({
      entries: data.timeEntries.map((e: TogglTimeEntry) =>
        Object.assign({}, e, {
          // WTF - render, check items tab
          duration: 9,
          durationB: new Date(e.stop).getTime() - new Date(e.start).getTime(),
        })
      ),
      projects: data.projects,
    });

    console.log(get().entries);
  },
}));