import * as Location from "expo-location";

import { LOCATION_TRACKING_TASK_NAME } from "./location-tracking-task";

export class LocationTracking {
  constructor(private readonly config: Location.LocationTaskOptions) {}

  async start() {
    try {
      if (await this._isTracking()) throw "Already started";

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
      if (!(await this._isTracking())) throw "Not running";

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
