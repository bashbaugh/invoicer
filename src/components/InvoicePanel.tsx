import { useInvoice } from "@/hooks/useInvoice";
import Input from "./Input";
import InputGroup from "./InputGroup";

export default function InvoicePanel() {
  const [invoice, updateInvoice] = useInvoice((s) => [
    s.invoice,
    s.updateInvoiceData,
  ]);

  const updateVal = (key: keyof typeof invoice) => (e: any) =>
    updateInvoice({ [key]: e.target.value });

  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <InputGroup label="Invoice Number">
            <Input
              placeholder="INV-001"
              defaultValue={invoice.invoiceNumber}
              onBlur={updateVal("invoiceNumber")}
            />
          </InputGroup>
          <InputGroup label="Invoice Title">
            <Input
              placeholder="October 2042"
              defaultValue={invoice.invoiceSubtitle}
              onBlur={updateVal("invoiceSubtitle")}
            />
          </InputGroup>
        </div>

        <div className="flex gap-2">
          <InputGroup label="Issuer name">
            <Input
              defaultValue={invoice.from.name}
              onBlur={(e) =>
                updateInvoice({
                  from: { name: e.target.value },
                })
              }
            />
          </InputGroup>
          <InputGroup label="Recipient name">
            <Input
              defaultValue={invoice.recipient.name}
              onBlur={(e) =>
                updateInvoice({
                  recipient: { name: e.target.value },
                })
              }
            />
          </InputGroup>
        </div>

        <div className="flex gap-2">
          <InputGroup label="Issuer contact">
            <Input
              textarea
              defaultValue={invoice.from.contactDetails}
              onBlur={(e) =>
                updateInvoice({
                  from: { contactDetails: e.target.value },
                })
              }
            />
          </InputGroup>
          <InputGroup label="Recipient contact">
            <Input
              textarea
              defaultValue={invoice.recipient.contactDetails}
              onBlur={(e) =>
                updateInvoice({
                  recipient: { contactDetails: e.target.value },
                })
              }
            />
          </InputGroup>
        </div>
      </div>
    </div>
  );
}
