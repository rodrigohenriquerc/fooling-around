import { tableSchema } from "@nozbe/watermelondb";

export const SessionSchema = tableSchema({
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
});
