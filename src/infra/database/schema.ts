import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "trackings",
      columns: [
        { name: "created_at", type: "number" },
        { name: "finished_at", type: "string", isOptional: true },
      ],
    }),
    tableSchema({
      name: "location_events",
      columns: [
        { name: "tracking_id", type: "string", isIndexed: true },
        { name: "latitude", type: "number" },
        { name: "longitude", type: "number" },
        { name: "timestamp", type: "number" },
        { name: "accuracy", type: "number", isOptional: true },
        { name: "speed", type: "number", isOptional: true },
        { name: "heading", type: "number", isOptional: true },
        { name: "altitude", type: "number", isOptional: true },
        { name: "altitude_accuracy", type: "number", isOptional: true },
        { name: "mocked", type: "boolean", isOptional: true },
        { name: "app_state", type: "string", isOptional: true },
        { name: "event_id", type: "string" },
        { name: "task_name", type: "string" },
        { name: "created_at", type: "number" },
      ],
    }),
  ],
});
