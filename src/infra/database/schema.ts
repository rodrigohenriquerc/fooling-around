import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "location_logs",
      columns: [
        { name: "latitude", type: "number" },
        { name: "longitude", type: "number" },
        { name: "timestamp", type: "number" },
        { name: "accuracy", type: "number" },
        { name: "speed", type: "number" },
        { name: "heading", type: "number" },
        { name: "altitude", type: "number" },
        { name: "altitude_accuracy", type: "number" },
        { name: "mocked", type: "boolean", isOptional: true },
        { name: "created_at", type: "number" },
      ],
    }),
  ],
});
