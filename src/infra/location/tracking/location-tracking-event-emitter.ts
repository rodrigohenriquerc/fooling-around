import * as Expo from "expo";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";

export const LocationTrackingEventEmitter = new Expo.EventEmitter<{
  location_update: (event: LocationTrackingEvent) => void;
}>();

export type LocationTrackingEvent = {
  data: Location.LocationObject[];
  executionInfo: TaskManager.TaskManagerTaskBodyExecutionInfo;
};
