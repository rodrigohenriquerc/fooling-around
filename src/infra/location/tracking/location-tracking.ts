import * as Location from "expo-location";

import { LocationTrackingTask } from "./location-tracking-task";

export const LocationTracking = (() => {
  async function startTracking() {
    try {
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
      await Location.stopLocationUpdatesAsync(LocationTrackingTask.Name);
    } catch (error) {
      throw new Error(`Tracking location failed to stop: ${error}.`);
    }
  }

  return { startTracking, stopTracking };
})();
