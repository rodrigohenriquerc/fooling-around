import { startLocationUpdatesAsync } from "expo-location";

import { isTrackingLocation } from "./is-tracking-location";
import {
  LOCATION_UPDATE_TASK_NAME,
  LOCATION_UPDATE_TASK_OPTIONS,
} from "./task/location-update-task-config";

export async function startTrackingLocation() {
  try {
    if (await isTrackingLocation()) return;

    await startLocationUpdatesAsync(
      LOCATION_UPDATE_TASK_NAME,
      LOCATION_UPDATE_TASK_OPTIONS,
    );
  } catch (error) {
    throw new Error("Failed to start tracking location", { cause: error });
  }
}
