import { TogglProject, TogglTimeEntry } from "@/app/api/toggl/route";
import { create } from "zustand";
import Cookie from "js-cookie";

interface TogglData {
  entries: TogglTimeEntry[];
  projects: TogglProject[];

  togglToken?: string;

  loadToken: () => void;
  setToken: (token: string) => void;
  loadData: () => void;
}

const TOGGL_COOKIE = "t_key";

export const useTogglData = create<TogglData>((set, get) => ({
  entries: [],
  projects: [],

  loadToken: () => {
    const token = Cookie.get(TOGGL_COOKIE);
    if (token) {
      set({ togglToken: token });
    }
  },
  setToken: (token: string) => {
    Cookie.set(TOGGL_COOKIE, token);
    set({ togglToken: token });
  },

  loadData: async () => {
    const response = await fetch("/api/toggl");
    const data = await response.json();
    set({
      entries: data.timeEntries,
      projects: data.projects,
    });
  },
}));
