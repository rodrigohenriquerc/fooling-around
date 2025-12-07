import { Q } from "@nozbe/watermelondb";

import database from "@/infra/database";
import { LocationLogModel } from "@/infra/database/models";
import { LocationLog } from "@/types/location.types";

export class LocationLogsRepository {
  private static get _collection() {
    return database.get<LocationLogModel>("location_logs");
  }

  static async createLocationLogs(sessionId: string, locations: LocationLog[]) {
    try {
      await database.write(async () => {
        const newEvents = locations.map(
          ({ latitude, longitude, accuracy, timestamp }) => {
            return LocationLogsRepository._collection.prepareCreate((log) => {
              log.latitude = latitude;
              log.longitude = longitude;
              log.timestamp = timestamp;
              log.accuracy = accuracy;
              log.sessionId = sessionId;
            });
          },
        );

        await database.batch(...newEvents);
      });
    } catch (error) {
      throw new Error("LocationLogsRepository failed to create location logs", {
        cause: error,
      });
    }
  }

  static async getLocationLogsBySessionId(sessionId: string) {
    try {
      return await database.read(async () => {
        return await LocationLogsRepository._collection
          .query(Q.where("session_id", Q.eq(sessionId)))
          .fetch();
      });
    } catch (error) {
      throw new Error(
        `LocationLogsRepository failed to get location logs by session id (session id: ${sessionId})`,
        { cause: error },
      );
    }
  }
}
