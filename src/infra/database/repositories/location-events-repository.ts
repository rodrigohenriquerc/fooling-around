import { Q } from "@nozbe/watermelondb";

import database from "@/infra/database";
import { LocationEventModel } from "@/infra/database/models";
import { LocationEvent } from "@/types/location.types";

export class LocationEventsRepository {
  private static get _collection() {
    return database.get<LocationEventModel>("location_events");
  }

  static async createLocationEvents(
    trackingId: string,
    locations: LocationEvent[],
  ) {
    try {
      await database.write(async () => {
        const newEvents = locations.map(
          ({ latitude, longitude, accuracy, timestamp }) => {
            return LocationEventsRepository._collection.prepareCreate((log) => {
              log.latitude = latitude;
              log.longitude = longitude;
              log.datetime = new Date(timestamp).toISOString();
              log.accuracy = accuracy;
              log.trackingId = trackingId;
            });
          },
        );

        await database.batch(...newEvents);
      });
    } catch (error) {
      throw new Error(
        "LocationEventsRepository failed to create location events",
        { cause: error },
      );
    }
  }

  static async getLocationEventsByTrackingId(trackingId: string) {
    try {
      return await database.read(async () => {
        return await LocationEventsRepository._collection
          .query(Q.where("tracking_id", Q.eq(trackingId)))
          .fetch();
      });
    } catch (error) {
      throw new Error(
        `LocationEventsRepository failed to get location events by tracking id (tracking id: ${trackingId})`,
        { cause: error },
      );
    }
  }
}
