import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import { Logger } from "@/tools/monitoring";

import migrations from "./migrations";
import { LocationLogModel, SessionModel } from "./models";
import schema from "./schema";

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  dbName: "fool-db",
  onSetUpError: (error) => {
    Logger.logError("Database setup failed:", error);
  },
});

export default new Database({
  adapter,
  modelClasses: [LocationLogModel, SessionModel],
});
