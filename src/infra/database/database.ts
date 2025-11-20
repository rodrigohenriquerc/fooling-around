import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import migrations from "./migrations";
import { LocationEventModel } from "./models";
import schema from "./schema";

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  dbName: "fool-db",
  onSetUpError: (error) => {
    console.error("Database setup failed:", error);
  },
});

export default new Database({
  adapter,
  modelClasses: [LocationEventModel],
});
