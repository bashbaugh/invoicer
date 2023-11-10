import { useTogglData } from "@/hooks/useTogglData";
import Button from "./Button";
import ProjectSelector from "./ProjectSelector";
import { useEffect, useMemo } from "react";
import { TogglTimeEntry } from "@/app/api/toggl/route";
import { useSettings } from "@/hooks/useSettings";
import { secToString } from "@/util/time";
import { useInvoice } from "@/hooks/useInvoice";

function EntriesTable({ entries }: { entries: TogglTimeEntry[] }) {
  return (
    <table className="table-auto w-full text-left">
      <thead>
        <tr className="">
          <th className="pb-3">Description</th>
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

export default function ItemsPanel() {
  const { projects, entries, loadData } = useTogglData();
  const [selectedProjects, setSelectedProjects] = useSettings((s) => [
    s.togglSelectedProjects,
    s.setTogglSelectedProjects,
  ]);

  const { invoice, setInvoiceData } = useInvoice();

  useEffect(() => {
    if (projects?.length === 0) {
      loadData();
    }
  }, []);

  const projectEntries = useMemo(
    () => entries?.filter((e) => selectedProjects.includes(e.project_id)),
    [entries, selectedProjects]
  );

  const aggregatedEntries = useMemo(() => {
    // Combine all entries with the same description/project into a single entry
    const aggregatedEntries = projectEntries?.reduce((acc, entry) => {
      const existingEntry = acc.find(
        (e) =>
          e.description === entry.description &&
          e.project_id === entry.project_id
      );

      if (existingEntry) {
        existingEntry.duration += entry.duration;
      } else {
        acc.push({ ...entry });
      }
      return acc;
    }, [] as TogglTimeEntry[]);

    return aggregatedEntries;
  }, [projectEntries]);

  useEffect(() => {
    // TODO hashmaps?

    const lineItems = selectedProjects?.map((pid) => {
      const p = projects?.find((p) => p.id === pid);
      const timeEntries = aggregatedEntries?.filter(
        (e) => e.project_id === pid
      );

      const totalTime =
        timeEntries?.reduce((acc, e) => acc + e.duration, 0) / 60 / 60;

      return {
        description: p?.name || "",
        subitems: timeEntries?.map(
          (e) => `${e.description} (${secToString(e.duration)})`
        ),
        quantity: totalTime,
        unitPrice: 50,
        total: totalTime * 50,
      };
    });

    setInvoiceData({
      lineItems,
      subtotal: lineItems?.reduce((acc, i) => acc + i.total, 0) || 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aggregatedEntries]);

  return (
    <div className="flex flex-col gap-3">
      <Button onClick={loadData}>Refresh Toggl Data</Button>
      <div>
        <ProjectSelector
          projects={projects}
          selectedProjects={selectedProjects}
          changeSelected={setSelectedProjects}
        />
      </div>
      <div>
        {projectEntries?.length !== 0 && (
          <EntriesTable entries={aggregatedEntries} />
        )}
      </div>
    </div>
  );
}
