import { appSchema, Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import { Logger } from "@/tools/monitoring";

import migrations from "./migrations";
import { LocationLogModel, LocationLogsSchema } from "./tables/location-logs";
import { SessionModel, SessionSchema } from "./tables/sessions";

export default new Database({
  adapter: new SQLiteAdapter({
    dbName: "fool-db",
    schema: appSchema({
      version: 1,
      tables: [LocationLogsSchema, SessionSchema],
    }),
    migrations,
    onSetUpError: (error) => {
      Logger.logError("Database setup failed:", error);
    },
  }),
  modelClasses: [LocationLogModel, SessionModel],
});
