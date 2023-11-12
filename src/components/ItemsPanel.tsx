import { useTogglData } from "@/hooks/useTogglData";
import Button from "./Button";
import { useEffect } from "react";
import { useSettings } from "@/hooks/useSettings";
import { useInvoice } from "@/hooks/useInvoice";
import { HiPlus, HiRefresh } from "react-icons/hi";
import LineItem from "./LineItem";
import { commaNumber, numFromStr, secToString } from "@/lib/util";

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
      commaNumber(
        Math.floor(
          invoiceLineItems?.reduce(
            (acc, item) => acc + numFromStr(item.total),
            0
          )
        )
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
        {!lineItems?.length && (
          <p className="my-2 opacity-60 text-sm text-center">No items yet</p>
        )}
      </div>
    </div>
  );
}
