import { useTogglData } from "@/hooks/useTogglData";
import Button from "./Button";
import ProjectSelector from "./ProjectSelector";
import { useEffect, useMemo } from "react";
import { TogglTimeEntry } from "@/app/api/toggl/route";
import { useSettings } from "@/hooks/useSettings";
import { useInvoice } from "@/hooks/useInvoice";
import { HiPlus, HiRefresh } from "react-icons/hi";
import LineItem from "./LineItem";
import { numFromStr, secToString } from "@/lib/util";

export default function ItemsPanel() {
  const { projects, loadData } = useTogglData();
  const { updateInvoiceData: setInvoiceData } = useInvoice();
  const [lineItems, addLineItem] = useSettings((s) => [
    s.lineItems,
    s.addLineItem,
  ]);

  useEffect(() => {
    if (projects?.length === 0) {
      loadData();
    }
  }, []);

  useEffect(() => {
    const invoiceLineItems = lineItems?.map((i) => ({
      description: i.description || "",
      quantity: i.quantity || "1",
      unitPrice: i.unitPrice || "0",
      total: i.total || "$0",
      subitems:
        i.togglAggregatedEntries?.map((e) => ({
          text: `${e.description} (${secToString(e.duration)})`,
          tags: e.tags,
        })) || [],
    }));

    const total =
      "$" +
      Math.floor(
        invoiceLineItems?.reduce((acc, item) => acc + numFromStr(item.total), 0)
      );

    setInvoiceData({
      lineItems: invoiceLineItems,
      subtotal: total,
      total,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineItems]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <Button icon={<HiRefresh />} onClick={loadData}>
          Refresh Toggl Data
        </Button>
        <div className="flex-1" />
        <Button icon={<HiPlus />} onClick={addLineItem}>
          Add item
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        {lineItems?.map((i, idx) => (
          <LineItem key={idx + i.description} idx={idx} />
        ))}
      </div>
    </div>
  );
}
