import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { Database } from "@nozbe/watermelondb";

import schema from "./schema";
import migrations from "./migrations";
import LocationLog from "./models/LocationLog";

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
  modelClasses: [LocationLog],
});
