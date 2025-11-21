import { TrackingModel } from "@/infra/database/models";
import { TrackingsRepository } from "@/infra/database/repositories";
import { LocationTracking } from "@/infra/location/tracking";
import { Logger } from "@/infra/logs/logger";

export const TrackingService = (() => {
  let tracking: TrackingModel | null = null;

  async function start() {
    try {
      const currentTracking = await TrackingsRepository.getCurrentTracking();

      if (currentTracking) {
        tracking = currentTracking;
      } else {
        tracking = await TrackingsRepository.createTracking();
      }

      await LocationTracking.startTracking();

      return tracking;
    } catch (error) {
      Logger.error("[TrackingService] 'start' failed:", error);
      throw error;
    }
  }

  async function finish() {
    try {
      await LocationTracking.stopTracking();
      await TrackingsRepository.finishTracking();
      tracking = null;
    } catch (error) {
      Logger.error("[TrackingService] 'finish' failed:", error);
      throw error;
    }
  }

  return { start, finish };
})();
