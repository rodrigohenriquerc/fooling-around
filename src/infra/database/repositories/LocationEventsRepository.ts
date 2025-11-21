import { Q } from "@nozbe/watermelondb";

import database from "@/infra/database";
import { LocationEventModel } from "@/infra/database/models";
import { LocationEvent } from "@/types/location.types";

export const LocationEventsRepository = {
  createLocationLogs,
  getEventsByTrackingId,
};

async function createLocationLogs(
  trackingId: string,
  locations: LocationEvent[],
) {
  try {
    await database.write(async () => {
      const newLogs = locations.map(
        ({ latitude, longitude, accuracy, timestamp }) => {
          return database
            .get<LocationEventModel>("location_events")
            .prepareCreate((log) => {
              log.latitude = latitude;
              log.longitude = longitude;
              log.datetime = new Date(timestamp).toISOString();
              log.accuracy = accuracy;
              log.trackingId = trackingId;
            });
        },
      );

      await database.batch(...newLogs);
    });
  } catch (error) {
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
