import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { LocationEventRepository } from "@/infra/database/repositories";

export const LOCATION_TRACKING_UPDATE_TASK = "LOCATION_TRACKING_UPDATE_TASK";

TaskManager.defineTask<FoolingAroundTaskData>(
  LOCATION_TRACKING_UPDATE_TASK,
  async ({ data, error, executionInfo }) => {
    if (error) {
      return console.error(`${LOCATION_TRACKING_UPDATE_TASK} error: ${error}.`);
    }

    if (!data?.locations?.length) {
      return console.warn(`${LOCATION_TRACKING_UPDATE_TASK} data: ${data}.`);
    }

    await LocationEventRepository.createLocationLog(
      data.locations,
      executionInfo,
    );
  },
);

interface FoolingAroundTaskData {
  locations: Location.LocationObject[];
}
