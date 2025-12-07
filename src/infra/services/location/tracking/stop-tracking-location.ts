import { stopLocationUpdatesAsync } from "expo-location";

import { isTrackingLocation } from "./is-tracking-location";
import { LOCATION_UPDATE_TASK_NAME } from "./task/location-update-task-config";

export async function stopTrackingLocation() {
  try {
    if (!(await isTrackingLocation())) return;
    await stopLocationUpdatesAsync(LOCATION_UPDATE_TASK_NAME);
  } catch (error) {
    throw new Error("Failed to stop tracking location", { cause: error });
  }
}
