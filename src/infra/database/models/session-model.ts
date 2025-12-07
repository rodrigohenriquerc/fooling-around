import { Model, Query } from "@nozbe/watermelondb";
import {
  children,
  date,
  readonly,
  writer,
} from "@nozbe/watermelondb/decorators";

import type { LocationLogModel } from "./location-log-model";

export class SessionModel extends Model {
  static table = "sessions";
  static associations = {
    location_logs: { type: "has_many", foreignKey: "session_id" },
  } as const;

  @readonly
  @date("created_at")
  createdAt!: Date;

  @date("finished_at")
  finishedAt!: Date;

  @children("location_logs")
  locationLogs!: Query<LocationLogModel>;

  @writer async finish() {
    try {
      await this.update((session) => {
        session.finishedAt = new Date();
      });
    } catch (error) {
      throw new Error("SessionModel failed to finish the session", {
        cause: error,
      });
    }
  }

  @writer async remove() {
    try {
      await this.locationLogs.destroyAllPermanently();
      await this.destroyPermanently();
    } catch (error) {
      throw new Error("SessionModel failed to remove the session", {
        cause: error,
      });
    }
  }
}
