import { useTogglData } from "@/hooks/useTogglData";
import Button from "./Button";
import ProjectSelector from "./ProjectSelector";
import { useEffect, useMemo, useState } from "react";
import { TogglProject, TogglTimeEntry } from "@/app/api/toggl/route";
import { useSettings } from "@/hooks/useSettings";
import { secToString } from "@/util/time";

function EntriesTable({ entries }: { entries: TogglTimeEntry[] }) {
  return (
    <table className="table-auto w-full text-left">
      <thead>
        <tr className="">
          <th className="pb-3">Description</th>
          <th className="">Duration</th>
          <th className="">Start</th>
          <th className="">Stop</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((e) => (
          <tr key={e.id}>
            <td>{e.description}</td>
            <td>
              {secToString(e.duration)} {e.duration}
            </td>
            <td>
              {secToString(e.durationB)} {e.durationB}
            </td>
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

  useEffect(() => {
    if (projects?.length === 0) {
      loadData();
    }
  }, []);

  const projectEntries = entries?.filter((e) =>
    selectedProjects.includes(e.project_id)
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
        acc.push(entry);
      }
      return acc;
    }, [] as TogglTimeEntry[]);

    return aggregatedEntries;
  }, [projectEntries]);

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
          <EntriesTable entries={projectEntries} />
        )}
      </div>
    </div>
  );
}
