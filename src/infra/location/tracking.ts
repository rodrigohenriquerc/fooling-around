import * as Location from "expo-location";
import { LOCATION_TRACKING_UPDATE_TASK } from "./tasks";

const LOCATION_TRACKING_CONFIG: Location.LocationTaskOptions = {
  accuracy: Location.Accuracy.Highest,
  foregroundService: {
    notificationTitle: "The foolness started!",
    notificationBody: "Fooling around is doing what it does best!",
  },
};

export const LocationTracking = (() => {
  async function startTracking() {
    try {
      await Location.startLocationUpdatesAsync(
        LOCATION_TRACKING_UPDATE_TASK,
        LOCATION_TRACKING_CONFIG,
      );
    } catch (error) {
      throw new Error(`Tracking location failed to start: ${error}.`);
    }
  }

  async function stopTracking() {
    try {
      await Location.stopLocationUpdatesAsync(LOCATION_TRACKING_UPDATE_TASK);
    } catch (error) {
      throw new Error(`Tracking location failed to stop: ${error}.`);
    }
  }

  return { startTracking, stopTracking };
})();
