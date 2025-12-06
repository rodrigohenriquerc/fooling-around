import * as Location from "expo-location";

import { Logger } from "@/tools/monitoring";

import {
  LOCATION_TRACKING_TASK_NAME,
  LOCATION_TRACKING_TASK_OPTIONS,
} from "./location-tracking-task";

export class LocationTracking {
  static async start() {
    try {
      if (await this.isTracking()) {
        Logger.logWarning(
          "Tried to start LocationTracking but it was already started",
        );
        return;
      }

      await Location.startLocationUpdatesAsync(
        LOCATION_TRACKING_TASK_NAME,
        LOCATION_TRACKING_TASK_OPTIONS,
      );
    } catch (error) {
      throw new Error("LocationTracking failed to start", { cause: error });
    }
  }

  static async stop() {
    try {
      if (!(await this.isTracking())) {
        Logger.logWarning(
          "Tried to stop LocationTracking but it was not running",
        );
        return;
      }

      await Location.stopLocationUpdatesAsync(LOCATION_TRACKING_TASK_NAME);
    } catch (error) {
      throw new Error("LocationTracking failed to stop", { cause: error });
    }
  }

  static async isTracking() {
    try {
      return await Location.hasStartedLocationUpdatesAsync(
        LOCATION_TRACKING_TASK_NAME,
      );
    } catch (error) {
      throw new Error("LocationTracking failed to check current state", {
        cause: error,
      });
    }
  }
}
