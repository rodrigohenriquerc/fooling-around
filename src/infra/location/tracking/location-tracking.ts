import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";

import {
  LocationEventsRepository,
  TrackingsRepository,
} from "@/infra/database/repositories";
import { Logger } from "@/infra/logs/logger";

const LOCATION_TRACKING_TASK_NAME = "LOCATION_TRACKING_TASK";
const LOCATION_TRACKING_TASK_OPTIONS: Location.LocationTaskOptions = {
  accuracy: Location.Accuracy.BestForNavigation,
  distanceInterval: 5,
  foregroundService: {
    notificationTitle: "The foolness started!",
    notificationBody: "Fooling around is doing what it does best!",
  },
};

export const LocationTracking = (() => {
  async function startTracking() {
    try {
      if (await isLocationTracking()) {
        await stopTracking();
      }

      await Location.startLocationUpdatesAsync(
        LOCATION_TRACKING_TASK_NAME,
        LOCATION_TRACKING_TASK_OPTIONS,
      );
    } catch (error) {
      throw new Error(`Tracking location failed to start: ${error}.`);
    }
  }

  async function stopTracking() {
    try {
      if (!(await isLocationTracking())) return;

      await Location.stopLocationUpdatesAsync(LOCATION_TRACKING_TASK_NAME);
    } catch (error) {
      throw new Error(`Tracking location failed to stop: ${error}.`);
    }
  }

  async function isLocationTracking() {
    return await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TRACKING_TASK_NAME,
    );
  }

  return { startTracking, stopTracking };
})();

TaskManager.defineTask<{
  locations: Location.LocationObject[];
}>(LOCATION_TRACKING_TASK_NAME, async ({ data, error }) => {
  if (error) {
    return Logger.error(`${LOCATION_TRACKING_TASK_NAME} error: ${error}.`);
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
    Logger.error(`${LOCATION_TRACKING_TASK_NAME} execution error: ${error}`);
  }
});
