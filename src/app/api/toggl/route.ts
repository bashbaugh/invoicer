import { NextResponse } from "next/server";
import { cookies } from "next/headers";

interface RTogglTimeEntry {
  /** When last updated */
  at: string;
  billable: boolean;
  description: string | null;
  duration: number;
  id: number;
  project_id: number;
  server_deleted_at: string | null;
  start: string;
  stop: string;
  // tag_ids: number[];
  tags: string[];
  // user_id: number;
  // workspace_id: number;
}

export type TogglTimeEntry = Omit<RTogglTimeEntry, "server_deleted_at">;

interface RTogglProject {
  id: number;
  name: string;
  active: boolean;
  server_deleted_at: string | null;
  client_id: number;
  at: string;
}

export type TogglProject = Omit<RTogglProject, "server_deleted_at">;

export async function GET() {
  const TOGGL_TOKEN = cookies().get("t_key")?.value;

  const togglFetch = <T extends any>(url: string): Promise<T> =>
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`${TOGGL_TOKEN}:api_token`)}`,
      },
    }).then((resp) => resp.json());

  const WORKSPACE_ID = 4921572;
  const projectData = await togglFetch<RTogglProject[]>(
    `https://api.track.toggl.com/api/v9/workspaces/${WORKSPACE_ID}/projects`
  );

  const timeEntriesData = await togglFetch<RTogglTimeEntry[]>(
    `https://api.track.toggl.com/api/v9/me/time_entries?start_date=2023-10-01&end_date=2023-11-30`
  );

  const projects = projectData
    .filter((p) => !p.server_deleted_at && p.active)
    .map((project: RTogglProject) => ({
      id: project.id,
      name: project.name,
      client_id: project.client_id,
      at: project.at,
    }));

  const timeEntries = timeEntriesData
    .filter((entry: RTogglTimeEntry) => !entry.server_deleted_at)
    .map((entry) => ({
      id: entry.id,
      project_id: entry.project_id,
      start: entry.start,
      stop: entry.stop,
      duration: entry.duration,
      description: entry.description,
      tags: entry.tags,
    }));

  return NextResponse.json({
    projects,
    timeEntries,
  });
}
