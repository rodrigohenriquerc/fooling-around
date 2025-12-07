import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "sessions",
      columns: [
        {
          name: "created_at",
          type: "number",
        },
        {
          name: "finished_at",
          type: "number",
          isOptional: true,
          isIndexed: true,
        },
      ],
    }),
    tableSchema({
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
    }),
  ],
});
