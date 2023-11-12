import InvoiceDownloadButton from "@/components/InvoiceDownloadButton";
import InvoicePreview from "@/components/InvoicePreview";
import InvoiceSettings from "@/components/InvoiceSettings";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen max-h-screen">
      <div className="flex h-full">
        <div className="flex-1 p-12 pb-0 flex flex-col gap-8">
          <div className="flex gap-5 items-center">
            <h1 className="font-heading font-semibold text-4xl">Invoicer</h1>
            <Link
              href="/about"
              className="bg-button-bg rounded-full py-1 px-2 text-sm"
            >{`what's this?`}</Link>

            <div className="flex-1" />

            <InvoiceDownloadButton />
          </div>
          <InvoiceSettings />
        </div>
        <div className="flex-1 p-12 pb-0">
          <InvoicePreview />
        </div>
      </div>
    </main>
  );
}
