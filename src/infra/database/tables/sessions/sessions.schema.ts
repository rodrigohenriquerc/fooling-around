import { tableSchema } from "@nozbe/watermelondb";

export const SessionsSchema = tableSchema({
  name: "sessions",
  columns: [
    {
      name: "status",
      type: "string",
      isIndexed: true,
      isOptional: false,
    },
    {
      name: "created_at",
      type: "number",
      isIndexed: true,
      isOptional: false,
    },
    {
      name: "updated_at",
      type: "number",
      isIndexed: true,
      isOptional: true,
    },
  ],
});
