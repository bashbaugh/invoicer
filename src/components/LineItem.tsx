import { TogglTimeEntry } from "@/app/api/toggl/route";
import { useInvoice } from "@/hooks/useInvoice";
import { useSettings } from "@/hooks/useSettings";
import { useTogglData } from "@/hooks/useTogglData";
import { useEffect, useMemo } from "react";
import ProjectSelector from "./ProjectSelector";
import Input from "./Input";
import { FiTrash } from "react-icons/fi";
import { numFromStr, secToString } from "@/lib/util";

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
  const { projects, entries, loadData } = useTogglData();

  const [lineItems, _updateLine, _removeLine] = useSettings((s) => [
    s.lineItems,
    s.updateLineItem,
    s.removeLineItem,
  ]);

  const item = lineItems[idx];
  const update = (newItem: Partial<typeof item>) => _updateLine(idx, newItem);
  const removeSelf = () => _removeLine(idx);

  const aggregatedEntries = useMemo(() => {
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

  return (
    <div className="rounded-xl p-3 bg-primary-card">
      <div className="flex gap-3 items-center mb-3">
        <Input
          defaultValue={item.description}
          onBlur={(e) => update({ description: e.target.value })}
          placeholder="Item name"
        />
        <Input
          defaultValue={item.unitPrice}
          onBlur={(e) => update({ unitPrice: e.target.value })}
          placeholder="Rate/unit price"
        />
        <button className="mr-2" onClick={removeSelf}>
          <FiTrash className="w-4 h-4 opacity-60 hover:opacity-80" />
        </button>
      </div>
      <ProjectSelector
        projects={projects}
        selectedProjects={item.togglProjects || []}
        changeSelected={(pids) => update({ togglProjects: pids })}
      />
      {aggregatedEntries?.length ? (
        <div className="mt-4">
          <EntriesTable entries={aggregatedEntries} />
        </div>
      ) : null}
    </div>
  );
}
