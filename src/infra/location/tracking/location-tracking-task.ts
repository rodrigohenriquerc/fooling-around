import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";

import { LocationTrackingEventEmitter } from "./location-tracking-event-emitter";

export const LocationTrackingTask = (() => {
  const TASK_NAME = "LOCATION_TRACKING_TASK";
  const TASK_OPTIONS: Location.LocationTaskOptions = {
    accuracy: Location.Accuracy.Highest,
    foregroundService: {
      notificationTitle: "The foolness started!",
      notificationBody: "Fooling around is doing what it does best!",
    },
  };

  TaskManager.defineTask<{
    locations: Location.LocationObject[];
  }>(TASK_NAME, async ({ data, error, executionInfo }) => {
    if (error) {
      return console.error(`${TASK_NAME} error: ${error}.`);
    }

    if (!data?.locations?.length) {
      return console.warn(`${TASK_NAME} data: ${data}.`);
    }

    LocationTrackingEventEmitter.emit("location_update", {
      data: data.locations,
      executionInfo,
    });
  });

  return { Name: TASK_NAME, Options: TASK_OPTIONS };
})();
