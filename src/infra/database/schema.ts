import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "trackings",
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
      name: "location_events",
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
          name: "emitted_at",
          type: "number",
        },
        {
          name: "accuracy",
          type: "number",
          isOptional: true,
        },
        {
          name: "tracking_id",
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
