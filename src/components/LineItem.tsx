import { TogglTimeEntry } from "@/app/api/toggl/route";
import { useSettings } from "@/hooks/useSettings";
import { useTogglData } from "@/hooks/useTogglData";
import { useEffect, useMemo } from "react";
import ProjectSelector from "./ProjectSelector";
import Input from "./Input";
import { FiTrash } from "react-icons/fi";
import { numFromStr, secToString } from "@/lib/util";
import InputGroup from "./InputGroup";

function EntriesTable({ entries }: { entries: TogglTimeEntry[] }) {
  return (
    <table className="table-auto w-full text-left">
      <thead>
        <tr className="">
          <th className="pb-2">Description</th>
          <th className="">Duration</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((e) => (
          <tr key={e.id}>
            <td>{e.description}</td>
            <td>{secToString(e.duration)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

interface ItemCardProps {
  idx: number;
}

export default function LineItem({ idx }: ItemCardProps) {
  const { projects, entries, loadData, togglToken } = useTogglData();

  const [lineItems, _updateLine, _removeLine] = useSettings((s) => [
    s.lineItems,
    s.updateLineItem,
    s.removeLineItem,
  ]);

  const item = lineItems[idx];
  const update = (newItem: Partial<typeof item>) => _updateLine(idx, newItem);
  const removeSelf = () => _removeLine(idx);

  const aggregatedEntries = useMemo(() => {
    if (!item.togglProjects?.length) return null;

    // Combine all entries with the same description/project into a single entry

    const itemTimeEntries = entries?.filter((e) =>
      item.togglProjects?.includes(e.project_id)
    );

    if (!itemTimeEntries) return null;
    const aggregatedEntries = itemTimeEntries?.reduce((acc, entry) => {
      const existingEntry = acc.find(
        (e) =>
          e.description === entry.description &&
          e.project_id === entry.project_id
      );

      if (existingEntry) {
        existingEntry.duration += entry.duration;
        existingEntry.tags = [
          ...new Set(existingEntry.tags.concat(entry.tags)),
        ];
      } else {
        acc.push({ ...entry });
      }
      return acc;
    }, [] as TogglTimeEntry[]);

    // Compute the quantity/cost from the entries and update line item
    const totalDuration = aggregatedEntries.reduce(
      (acc, e) => acc + e.duration,
      0
    );
    const totalHours = totalDuration / 3600;
    // Extract first numerical match from rate string
    const rate = numFromStr(item.unitPrice || "0");
    const totalCost = totalHours * rate;
    update({
      togglAggregatedEntries: aggregatedEntries,
      quantity: totalHours.toFixed(2),
      total: "$" + totalCost.toFixed(2),
    });

    return aggregatedEntries;
  }, [item.togglProjects, item.unitPrice, entries]);

  const changeQuantityPrice = (quantity?: string, unitPrice?: string) => {
    const rate = numFromStr(unitPrice || "0");
    const total = Number(quantity || 1) * rate;
    update({ quantity, unitPrice, total: "$" + total.toFixed(2) });
  };

  return (
    <div className="rounded-xl p-3 py-5 bg-primary-card">
      <div className="flex gap-3 items-center">
        <Input
          className="basis-1/2 flex-shrink-0"
          defaultValue={item.description}
          onBlur={(e) => update({ description: e.target.value })}
          placeholder="Item name"
        />
        <Input
          defaultValue={item.unitPrice}
          onBlur={(e) => changeQuantityPrice(item.quantity, e.target.value)}
          placeholder={item.togglProjects?.length ? "Rate" : "Unit price"}
        />

        {!item.togglProjects?.length && (
          <Input
            type="number"
            defaultValue={item.quantity}
            onBlur={(e) => changeQuantityPrice(e.target.value, item.unitPrice)}
            placeholder="Quantity"
          />
        )}

        <button className="mr-2" onClick={removeSelf}>
          <FiTrash className="w-4 h-4 opacity-60 hover:opacity-80" />
        </button>
      </div>

      {togglToken && (
        <>
          <div className="relative my-4 h-[1px] bg-slate-400 text-slate-400">
            <span className="inline-block absolute whitespace-nowrap top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-card px-2 text-sm">
              or, compute time automatically
            </span>
          </div>

          <ProjectSelector
            projects={projects}
            selectedProjects={item.togglProjects || []}
            changeSelected={(pids) => update({ togglProjects: pids })}
          />
        </>
      )}

      {aggregatedEntries?.length ? (
        <div className="mt-4">
          <EntriesTable entries={aggregatedEntries} />
        </div>
      ) : null}
    </div>
  );
}
