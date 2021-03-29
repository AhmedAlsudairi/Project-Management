import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "id", headerName: "Task ID", width: 100 },
  { field: "taskName", headerName: "Task name", width: 160 },
  {
    field: "duration",
    headerName: "Duration",
    type: "number",
    width: 110,
  },
  {
    field: "startDate",
    headerName: "Start (Date)",
    width: 160,
  },
  {
    field: "finishDate",
    headerName: "Finish (Date)",
    width: 160,
  },
];

const rows = [
  { id: 1, taskName: "Snow", duration: 35 },
  { id: 2, taskName: "Lannister", duration: 42 },
  { id: 3, taskName: "Lannister", duration: 45 },
  { id: 4, taskName: "Stark", duration: 16 },
  { id: 5, taskName: "Targaryen", duration: null },
  { id: 6, taskName: "Melisandre", duration: 150 },
  { id: 7, taskName: "Clifford", duration: 44 },
  { id: 8, taskName: "Frances", duration: 36 },
  { id: 9, taskName: "Roxie", duration: 65 },
];

export default function TasksTable() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
}
