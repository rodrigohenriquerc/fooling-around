import { Q } from "@nozbe/watermelondb";
import { LocationObject } from "expo-location";

import database from "@/infra/database";
import { LocationEventModel } from "@/infra/database/models";

export const LocationEventsRepository = {
  createLocationLog,
  getEventsByTrackingId,
};

async function createLocationLog(
  trackingId: string,
  locations: LocationObject[],
  executionInfo: Pick<LocationEventModel, "appState" | "eventId" | "taskName">,
) {
  try {
    await database.write(async () => {
      const newLogs = locations.map((location) => {
        return database
          .get<LocationEventModel>("location_events")
          .prepareCreate((log) => {
            log.trackingId = trackingId;
            log.latitude = location.coords.latitude;
            log.longitude = location.coords.longitude;
            log.timestamp = location.timestamp;
            log.accuracy = location.coords.accuracy;
            log.speed = location.coords.speed;
            log.heading = location.coords.heading;
            log.altitude = location.coords.altitude;
            log.altitudeAccuracy = location.coords.altitudeAccuracy;
            log.mocked = location.mocked;
            log.appState = executionInfo.appState;
            log.eventId = executionInfo.eventId;
            log.taskName = executionInfo.taskName;
          });
      });

      await database.batch(...newLogs);
    });
  } catch (error) {
    console.error(`Location log creation failed:`, error);
    throw new Error(
      `[LocationEventsRepository] 'createLocationLog' failed: ${error}`,
    );
  }
}

async function getEventsByTrackingId(trackingId: string) {
  try {
    return await database.read(async () => {
      return await database
        .get<LocationEventModel>("location_events")
        .query(Q.where("tracking_id", Q.eq(trackingId)))
        .fetch();
    });
  } catch (error) {
    throw new Error(
      `[LocationEventsRepository] 'getEventsByTrackingId' failed: ${error}`,
    );
  }
}
