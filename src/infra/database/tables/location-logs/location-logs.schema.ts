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
      isOptional: true,
    },
    {
      name: "session_id",
      type: "string",
      isIndexed: true,
    },
    {
      name: "created_at",
      type: "number",
    },
  ],
});
