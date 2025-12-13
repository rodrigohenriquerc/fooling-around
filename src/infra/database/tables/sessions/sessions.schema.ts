import { tableSchema } from "@nozbe/watermelondb";

export const SessionsSchema = tableSchema({
  name: "sessions",
  columns: [
    {
      name: "state",
      type: "string",
    },
    {
      name: "created_at",
      type: "number",
    },
  ],
});
