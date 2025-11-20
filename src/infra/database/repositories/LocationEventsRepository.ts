import { LocationObject } from "expo-location";

import database from "@/infra/database";
import { LocationEventModel } from "@/infra/database/models";

export const LocationEventsRepository = { createLocationLog };

async function createLocationLog(
  locations: LocationObject[],
  executionInfo: Pick<LocationEventModel, "appState" | "eventId" | "taskName">,
) {
  try {
    await database.write(async () => {
      const newLogs = locations.map((location) => {
        return database
          .get<LocationEventModel>("location_events")
          .prepareCreate((log) => {
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
  }
}
