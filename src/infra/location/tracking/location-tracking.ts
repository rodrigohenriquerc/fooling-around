import * as Expo from "expo";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";

import { Logger } from "@/infra/logs/logger";
import { LocationEvent } from "@/types/location.types";

const LOCATION_TRACKING_TASK_NAME = "LOCATION_TRACKING_TASK";
const LOCATION_TRACKING_TASK_OPTIONS: Location.LocationTaskOptions = {
  accuracy: Location.Accuracy.BestForNavigation,
  foregroundService: {
    notificationTitle: "The foolness started!",
    notificationBody: "Fooling around is doing what it does best!",
  },
};

export const LocationTracking = (() => {
  async function startTracking() {
    try {
      if (await isLocationTracking()) return;

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

  const locationEvents = data.locations.map(
    ({ coords: { accuracy, latitude, longitude }, timestamp }) => ({
      accuracy,
      latitude,
      longitude,
      timestamp,
    }),
  );

  LocationTrackingEventEmitter.emit("location_update", locationEvents);
});

export const LocationTrackingEventEmitter = new Expo.EventEmitter<{
  location_update: (location: LocationEvent[]) => void;
}>();
