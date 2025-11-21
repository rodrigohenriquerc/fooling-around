import { TrackingModel } from "@/infra/database/models";
import { TrackingsRepository } from "@/infra/database/repositories";
import { LocationTracking } from "@/infra/location/tracking";
import { Logger } from "@/infra/logs/logger";

export const TrackingService = (() => {
  let tracking: TrackingModel | null = null;

  async function start() {
    try {
      tracking =
        (await TrackingsRepository.getCurrentTracking()) ??
        (await TrackingsRepository.createTracking());

      await LocationTracking.startTracking();

      return tracking;
    } catch (error) {
      Logger.error("[TrackingService] 'start' failed:", error);

      if (tracking) {
        await rollback(tracking);
        tracking = null;
      }

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

  async function rollback(model: TrackingModel) {
    try {
      await TrackingsRepository.deleteTracking(model);
    } catch (error) {
      Logger.error("[TrackingService] Failed to rollback tracking:", error);
    }
  }

  return { start, finish };
})();
