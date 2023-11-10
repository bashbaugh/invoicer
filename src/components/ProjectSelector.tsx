import { TogglProject } from "@/app/api/toggl/route";
import { Combobox, Transition } from "@headlessui/react";
import { useMemo, useState } from "react";
import { HiChevronDown, HiCheck } from "react-icons/hi";

interface ProjectSelectorProps {
  projects: TogglProject[];
  selectedProjects: number[];
  changeSelected: (ids: number[]) => void;
}

export default function ProjectSelector({
  projects,
  selectedProjects: selectedProjectIds,
  changeSelected,
}: ProjectSelectorProps) {
  const [query, setQuery] = useState("");

  const sortedProjects = useMemo(
    () =>
      projects
        .sort((a, b) => {
          return new Date(b.at).getTime() - new Date(a.at).getTime();
        })
        .sort((a, b) => {
          return b.client_id - a.client_id;
        }),
    [projects]
  );

  const filteredProjects =
    query === ""
      ? sortedProjects
      : sortedProjects.filter((p) =>
          p.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(
              query
                .split(", ")
                [query.split(", ").length - 1].toLowerCase()
                .replace(/\s+/g, "")
            )
        );

  return (
    <Combobox value={selectedProjectIds} onChange={changeSelected} multiple>
      <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 sm:text-sm">
          {/* <Combobox.Label>Select Projects</Combobox.Label> */}
          <Combobox.Input
            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 outline-none"
            displayValue={(selected: any) =>
              // TODO names
              ""
            }
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <HiChevronDown
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Combobox.Options className="absolute mt-1 max-h-96 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
          {filteredProjects.length === 0 ? (
            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
              No projects found.
            </div>
          ) : (
            filteredProjects.map((p) => (
              <Combobox.Option
                key={p.id}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-primary-500 text-white" : "text-gray-900"
                  }`
                }
                value={p.id}
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {p.name}
                    </span>
                    {selected ? (
                      <span
                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                          active ? "text-white" : "text-primary-600"
                        }`}
                      >
                        <HiCheck className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </div>
    </Combobox>
  );
}
