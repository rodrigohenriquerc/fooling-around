import { Accuracy, LocationTaskOptions } from "expo-location";

export const LOCATION_UPDATE_TASK_NAME = "LOCATION_UPDATE_TASK";
export const LOCATION_UPDATE_TASK_OPTIONS: LocationTaskOptions = {
  accuracy: Accuracy.BestForNavigation,
  distanceInterval: 5,
  foregroundService: {
    notificationTitle: "Tracking location",
    notificationBody: `The location data emitted by this device is being tracked`,
  },
};
