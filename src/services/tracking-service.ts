import * as Location from "expo-location";

import { TrackingModel } from "@/infra/database/models";
import { TrackingsRepository } from "@/infra/database/repositories";
import { LocationTracking } from "@/infra/location/tracking";

export class TrackingService {
  private _trackingModel: TrackingModel | null = null;
  private _locationTracking: LocationTracking | null = null;

  async start() {
    try {
      this._trackingModel = await TrackingsRepository.createTracking();
      this._locationTracking = new LocationTracking({
        accuracy: Location.Accuracy.BestForNavigation,
        distanceInterval: 5,
        foregroundService: {
          notificationTitle: "The foolness started!",
          notificationBody: "Fooling around is doing what it does best!",
        },
      });

      await this._locationTracking.start();
    } catch (error) {
      await this._trackingModel?.remove();
      throw new Error("TrackingService failed to start", { cause: error });
    }
  }

  async finish() {
    try {
      await this._locationTracking?.stop();
      await this._trackingModel?.finish();
    } catch (error) {
      throw new Error("TrackingService failed to finish", { cause: error });
    }
  }
}
