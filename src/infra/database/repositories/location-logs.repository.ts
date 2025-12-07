import database from "@/infra/database";
import { LocationLogModel } from "@/infra/database/tables/location-logs";
import { LocationLog } from "@/types/location.types";

const LocationLogsCollection = database.get<LocationLogModel>("location_logs");

export async function createLocationLogs(
  sessionId: string,
  locations: LocationLog[],
) {
  try {
    await database.write(async () => {
      const newLogs = locations.map(
        ({ latitude, longitude, accuracy, timestamp }) => {
          return LocationLogsCollection.prepareCreate((log) => {
            log.latitude = latitude;
            log.longitude = longitude;
            log.timestamp = timestamp;
            log.accuracy = accuracy;
            log.sessionId = sessionId;
          });
        },
      );

      await database.batch(...newLogs);
    });
  } catch (error) {
    throw new Error("Failed to create location logs", { cause: error });
  }
}
