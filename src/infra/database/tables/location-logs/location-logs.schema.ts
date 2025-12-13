import { tableSchema } from "@nozbe/watermelondb";

export const LocationLogsSchema = tableSchema({
  name: "location_logs",
  columns: [
    {
      name: "latitude",
      type: "number",
    },
    {
      name: "longitude",
      type: "number",
    },
    {
      name: "timestamp",
      type: "number",
    },
    {
      name: "accuracy",
      type: "number",
    },
    {
      name: "session_id",
      type: "string",
    },
    {
      name: "created_at",
      type: "number",
    },
  ],
});
