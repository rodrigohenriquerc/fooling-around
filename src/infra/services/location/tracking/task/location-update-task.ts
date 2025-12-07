import { LocationObject } from "expo-location";
import { defineTask } from "expo-task-manager";

import { LOCATION_UPDATE_TASK_NAME } from "./location-update-task-config";
import { locationUpdateTaskExecutor } from "./location-update-task-executor";

defineTask<{
  locations: LocationObject[];
}>(LOCATION_UPDATE_TASK_NAME, locationUpdateTaskExecutor);
