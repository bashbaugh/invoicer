import InvoicePreview from "@/components/InvoicePreview";
import InvoiceSettings from "@/components/InvoiceSettings";

export default function Home() {
  return (
    <main className="h-screen">
      <div className="flex h-full">
        <div className="flex-1 p-12 flex flex-col gap-8">
          <h1 className="font-heading font-semibold text-4xl">Invoicer</h1>
          <InvoiceSettings />
        </div>
        <div className="flex-1 p-12 pb-0">
          <InvoicePreview />
        </div>
      </div>
    </main>
  );
}
