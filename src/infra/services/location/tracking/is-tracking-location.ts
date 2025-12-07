import { hasStartedLocationUpdatesAsync } from "expo-location";

import { LOCATION_UPDATE_TASK_NAME } from "./task/location-update-task-config";

export async function isTrackingLocation() {
  try {
    return await hasStartedLocationUpdatesAsync(LOCATION_UPDATE_TASK_NAME);
  } catch (error) {
    throw new Error("Failed to check if location is being tracked", {
      cause: error,
    });
  }
}
