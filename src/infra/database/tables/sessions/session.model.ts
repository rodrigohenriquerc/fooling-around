import { Model, Q, Query } from "@nozbe/watermelondb";
import {
  children,
  date,
  lazy,
  readonly,
  writer,
} from "@nozbe/watermelondb/decorators";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

import type { LocationLogModel } from "@/infra/database/tables/location-logs/location-log.model";
import type { LocationLog } from "@/types/location.types";
import { calculateCoordinatesPathLength } from "@/utils/geo.utils";

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

  @lazy path = this.locationLogs.extend(Q.sortBy("timestamp", Q.asc));

  @lazy distance = this.path
    .observe()
    .pipe(map(calculateCoordinatesPathLength));

  newLocationLogs = new Subject<LocationLog[]>();

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

  @writer async addLocationLogs(locationLogs: LocationLog[]) {
    try {
      const newLogs = locationLogs.map(
        ({ latitude, longitude, accuracy, timestamp }) => {
          return this.collections
            .get<LocationLogModel>("location_logs")
            .prepareCreate((log) => {
              log.latitude = latitude;
              log.longitude = longitude;
              log.timestamp = timestamp;
              log.accuracy = accuracy;
              log.session.set(this);
            });
        },
      );

      await this.batch(...newLogs);

      this.newLocationLogs.next(newLogs);
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
