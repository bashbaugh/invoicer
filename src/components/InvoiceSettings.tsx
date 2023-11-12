"use client";

import { Tab } from "@headlessui/react";
import clsx from "clsx";
import ItemsPanel from "./ItemsPanel";
import { useSettings } from "@/hooks/useSettings";
import InvoicePanel from "./InvoicePanel";
import TemplatesPanel from "./TemplatesPanel";
import InvoiceDownloadButton from "./InvoiceDownloadButton";

function SettingsTab({ children }: { children: React.ReactNode }) {
  return (
    <Tab
      className={({ selected }) =>
        clsx(
          "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-primary",
          "ring-white/60 ring-offset-2 ring-offset-primary-200 outline-none focus:ring-2",
          selected
            ? "bg-white shadow-sm"
            : "text-blue-100 hover:bg-white/10 hover:text-primary-600"
        )
      }
    >
      {children}
    </Tab>
  );
}

function SettingsPanel({ children }: { children: React.ReactNode }) {
  return <Tab.Panel>{children}</Tab.Panel>;
}

export default function InvoiceSettings() {
  const [openTab, setTab] = useSettings((s) => [s.openTab, s.setTab]);

  return (
    <div className="flex flex-1 overflow-clip h-full flex-col gap-2">
      <Tab.Group onChange={setTab} defaultIndex={openTab}>
        <Tab.List className="flex space-x-1 rounded-xl bg-primary-card/50 p-1">
          <SettingsTab>Template</SettingsTab>
          <SettingsTab>Invoice</SettingsTab>
          <SettingsTab>Line Items</SettingsTab>
        </Tab.List>
        <Tab.Panels className="h-full overflow-y-auto mt-3 pb-8 pr-1">
          <SettingsPanel>
            <TemplatesPanel />
          </SettingsPanel>
          <SettingsPanel>
            <InvoicePanel />
          </SettingsPanel>
          <SettingsPanel>
            <ItemsPanel />
          </SettingsPanel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
