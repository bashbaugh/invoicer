"use client";

import { Tab } from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi";
import clsx from "clsx";

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
  return (
    <div className="flex h-full flex-col gap-2">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-primary-card/50 p-1">
          <SettingsTab>Template</SettingsTab>
          <SettingsTab>Invoice</SettingsTab>
          <SettingsTab>Line Items</SettingsTab>
        </Tab.List>
        <Tab.Panels className="mt-3">
          <SettingsPanel>Template</SettingsPanel>
          <SettingsPanel>Invoice</SettingsPanel>
          <SettingsPanel>Line Items</SettingsPanel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
