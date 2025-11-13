import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { requestForegroundPermissions } from "./device-location-permissions";
import LocationEventRepository from "@/infra/database/repositories/LocationEventRepository";

const FOOLING_BG_TASK = "FOOLING_BG_TASK";

const DeviceLocationWatcher = (() => {
  return {
    async startWatching() {
      try {
        const { granted } = await requestForegroundPermissions();

        if (!granted) {
          throw new Error("Foregroiund permissions not granted");
        }

        await Location.startLocationUpdatesAsync(FOOLING_BG_TASK, {
          accuracy: Location.Accuracy.Highest,
          foregroundService: {
            notificationTitle: "The foolness started!",
            notificationBody: "Fooling around is doing what it does best!",
          },
        });
      } catch (error) {
        throw new Error(`Starting location watcher failed: ${error}.`);
      }
    },
    async stopWatching() {
      try {
        await Location.stopLocationUpdatesAsync(FOOLING_BG_TASK);
      } catch (error) {
        throw new Error(`Stopping location watcher failed: ${error}.`);
      }
    },
  };
})();

TaskManager.defineTask<FoolingAroundTaskData>(
  FOOLING_BG_TASK,
  async ({ data, error, executionInfo }) => {
    if (error) {
      throw new Error(
        `Error running background task ${FOOLING_BG_TASK}: ${error}.`,
      );
    }

    if (!data?.locations?.length) {
      throw new Error("Didn't receive any location.");
    }

    await LocationEventRepository.createLocationLog(
      data.locations,
      executionInfo,
    );
  },
);

export default DeviceLocationWatcher;

// ---

interface FoolingAroundTaskData {
  locations: Location.LocationObject[];
}
