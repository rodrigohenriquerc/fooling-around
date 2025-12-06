import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";

import {
  LocationEventsRepository,
  TrackingsRepository,
} from "@/infra/database/repositories";
import { Logger } from "@/tools/monitoring";

export const LOCATION_TRACKING_TASK_NAME = "LOCATION_TRACKING_TASK";

TaskManager.defineTask<{
  locations: Location.LocationObject[];
}>(LOCATION_TRACKING_TASK_NAME, async ({ data, error }) => {
  if (error) {
    return Logger.logError(`${LOCATION_TRACKING_TASK_NAME} error: ${error}.`);
  }

  if (!data?.locations?.length) {
    return console.warn(`${LOCATION_TRACKING_TASK_NAME} data: ${data}.`);
  }

  try {
    const tracking = await TrackingsRepository.getCurrentTracking();
    if (!tracking) return;

    const locationEvents = data.locations.map(
      ({ coords: { accuracy, latitude, longitude }, timestamp }) => ({
        accuracy,
        latitude,
        longitude,
        timestamp,
      }),
    );

    await LocationEventsRepository.createLocationLogs(
      tracking.id,
      locationEvents,
    );
  } catch (error) {
    Logger.logError(`${LOCATION_TRACKING_TASK_NAME} execution error: ${error}`);
  }
});
