import * as Location from "expo-location";

import { Logger } from "@/tools/monitoring";

import { LOCATION_TRACKING_TASK_NAME } from "./location-tracking-task";

export class LocationTracking {
  constructor(private readonly config: Location.LocationTaskOptions) {}

  async start() {
    try {
      if (await this._isTracking()) {
        Logger.logWarning(
          "Tried to start LocationTracking but it was already started",
        );
        return;
      }

      await Location.startLocationUpdatesAsync(
        LOCATION_TRACKING_TASK_NAME,
        this.config,
      );
    } catch (error) {
      throw new Error("LocationTracking failed to start", { cause: error });
    }
  }

  async stop() {
    try {
      if (!(await this._isTracking())) {
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

  private async _isTracking() {
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
