import * as Location from "expo-location";

import { TrackingModel } from "@/infra/database/models";
import { TrackingsRepository } from "@/infra/database/repositories";
import { LocationTracking } from "@/infra/location/tracking";
import { Logger } from "@/infra/logs/logger";

export const TrackingService = (() => {
  const locationTracking = new LocationTracking({
    accuracy: Location.Accuracy.BestForNavigation,
    distanceInterval: 5,
    foregroundService: {
      notificationTitle: "The foolness started!",
      notificationBody: "Fooling around is doing what it does best!",
    },
  });

  async function start() {
    let tracking: TrackingModel | null = null;

    try {
      tracking = await TrackingsRepository.createTracking();
      await locationTracking.start();
      return tracking;
    } catch (error) {
      if (tracking) await rollback(tracking);
      throw new Error("TrackingService failed to start", { cause: error });
    }
  }

  async function finish() {
    try {
      await locationTracking.stop();
      await TrackingsRepository.finishTracking();
    } catch (error) {
      throw new Error("TrackingService failed to finish", { cause: error });
    }
  }

  async function rollback(model: TrackingModel) {
    try {
      await TrackingsRepository.deleteTracking(model);
    } catch (error) {
      Logger.error("[TrackingService] Failed to rollback tracking:", error);
    }
  }

  return { start, finish };
})();
