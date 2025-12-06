import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";

import {
  LocationEventsRepository,
  TrackingsRepository,
} from "@/infra/database/repositories";
import { Logger } from "@/tools/monitoring";

export const LOCATION_TRACKING_TASK_NAME = "LOCATION_TRACKING_TASK";
export const LOCATION_TRACKING_TASK_OPTIONS: Location.LocationTaskOptions = {
  accuracy: Location.Accuracy.BestForNavigation,
  distanceInterval: 5,
  foregroundService: {
    notificationTitle: "The foolness started!",
    notificationBody: "Fooling around is doing what it does best!",
  },
};

TaskManager.defineTask<{
  locations: Location.LocationObject[];
}>(LOCATION_TRACKING_TASK_NAME, async ({ data, error }) => {
  if (error) {
    return Logger.logError(`${LOCATION_TRACKING_TASK_NAME} failed`, error);
  }

  if (!data?.locations?.length) {
    return Logger.logWarning(`${LOCATION_TRACKING_TASK_NAME} data: ${data}.`);
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

    await LocationEventsRepository.createLocationEvents(
      tracking.id,
      locationEvents,
    );
  } catch (error) {
    Logger.logError(`${LOCATION_TRACKING_TASK_NAME} executor failed`, error);
  }
});
