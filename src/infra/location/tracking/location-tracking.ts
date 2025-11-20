import * as Location from "expo-location";

import { LocationTrackingTask } from "./location-tracking-task";

export const LocationTracking = (() => {
  async function startTracking() {
    try {
      if (await isLocationTracking()) return;

      await Location.startLocationUpdatesAsync(
        LocationTrackingTask.Name,
        LocationTrackingTask.Options,
      );
    } catch (error) {
      throw new Error(`Tracking location failed to start: ${error}.`);
    }
  }

  async function stopTracking() {
    try {
      if (!(await isLocationTracking())) return;

      await Location.stopLocationUpdatesAsync(LocationTrackingTask.Name);
    } catch (error) {
      throw new Error(`Tracking location failed to stop: ${error}.`);
    }
  }

  async function isLocationTracking() {
    return await Location.hasStartedLocationUpdatesAsync(
      LocationTrackingTask.Name,
    );
  }

  return { startTracking, stopTracking };
})();
