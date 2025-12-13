import { Model, Q, Query } from "@nozbe/watermelondb";
import {
  children,
  date,
  field,
  lazy,
  readonly,
  writer,
} from "@nozbe/watermelondb/decorators";
import { Observable, Subject } from "rxjs";

import type { LocationLogModel } from "@/infra/database/tables/location-logs/location-log.model";
import type { LocationLog } from "@/types/location.types";
import { calculateCoordinatesPathLength } from "@/utils/geo.utils";

export type SessionStatus = "active" | "paused" | "finished";

export class SessionModel extends Model {
  static table = "sessions";
  static associations = {
    location_logs: { type: "has_many", foreignKey: "session_id" },
  } as const;

  @field("state")
  state!: SessionStatus;

  @readonly
  @date("created_at")
  createdAt!: Date;

  @children("location_logs")
  locationLogs!: Query<LocationLogModel>;

  @lazy path = this.locationLogs.extend(Q.sortBy("timestamp", Q.asc));

  newLocationLogs = new Subject<LocationLog[]>();

  observeDistance() {
    return new Observable<number>((subscriber) => {
      let totalDistance = 0;
      let lastLocation: LocationLog | undefined;
      let isInitialized = false;
      const pendingUpdates: LocationLog[][] = [];

      const processUpdate = (newLogs: LocationLog[]) => {
        if (newLogs.length === 0) return;

        let logsToProcess = newLogs;
        if (lastLocation) {
          logsToProcess = newLogs.filter(
            (l) => l.timestamp > lastLocation!.timestamp,
          );
        }

        if (logsToProcess.length === 0) return;

        const newSegmentDistance =
          calculateCoordinatesPathLength(logsToProcess);
        let connectionDistance = 0;

        if (lastLocation) {
          connectionDistance = calculateCoordinatesPathLength([
            lastLocation,
            logsToProcess[0],
          ]);
        }

        totalDistance += connectionDistance + newSegmentDistance;
        lastLocation = logsToProcess[logsToProcess.length - 1];
      };

      const subscription = this.newLocationLogs.subscribe((newLogs) => {
        if (isInitialized) {
          processUpdate(newLogs);
          subscriber.next(totalDistance);
        } else {
          pendingUpdates.push(newLogs);
        }
      });

      this.path.fetch().then((initialLogs) => {
        totalDistance = calculateCoordinatesPathLength(initialLogs);
        lastLocation = initialLogs[initialLogs.length - 1];

        pendingUpdates.forEach(processUpdate);

        isInitialized = true;
        subscriber.next(totalDistance);
      });

      return () => subscription.unsubscribe();
    });
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

      this.newLocationLogs.next(locationLogs);
    } catch (error) {
      throw new Error("SessionModel failed to finish the session", {
        cause: error,
      });
    }
  }

  @writer async pause() {
    try {
      await this.update((session) => {
        session.state = "paused";
      });
    } catch (error) {
      throw new Error("SessionModel failed to pause the session", {
        cause: error,
      });
    }
  }

  @writer async resume() {
    try {
      await this.update((session) => {
        session.state = "active";
      });
    } catch (error) {
      throw new Error("SessionModel failed to resume the session", {
        cause: error,
      });
    }
  }

  @writer async finish() {
    try {
      await this.update((session) => {
        session.state = "finished";
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

  get isActive() {
    return this.state === "active";
  }

  get isPaused() {
    return this.state === "paused";
  }

  get isFinished() {
    return this.state === "finished";
  }
}
