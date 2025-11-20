import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import { Logger } from "@/infra/logs/logger";

import migrations from "./migrations";
import { LocationEventModel, TrackingModel } from "./models";
import schema from "./schema";

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  dbName: "fool-db",
  onSetUpError: (error) => {
    Logger.error("Database setup failed:", error);
  },
});

export default new Database({
  adapter,
  modelClasses: [LocationEventModel, TrackingModel],
});
