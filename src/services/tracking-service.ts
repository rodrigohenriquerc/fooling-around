import { TrackingModel } from "@/infra/database/models";
import { TrackingsRepository } from "@/infra/database/repositories";
import { LocationTracking } from "@/infra/location/tracking";
import { Logger } from "@/tools/monitoring";
import { TrackingState } from "@/types/tracking.types";

export class TrackingService {
  private _trackingModel: TrackingModel | null = null;

  async init(): Promise<TrackingState> {
    try {
      const currentTracking = await TrackingsRepository.getCurrentTracking();

      if (!currentTracking) {
        this._trackingModel = null;
        return "idle";
      }

      this._trackingModel = currentTracking;

      if (await LocationTracking.isTracking()) return "ongoing";

      return "paused";
    } catch (error) {
      throw new Error("TrackingService failed to load state", { cause: error });
    } finally {
      console.log("Current tracking model id:", this._trackingModel?.id);
    }
  }

  async start() {
    try {
      const currentTracking = await TrackingsRepository.getCurrentTracking();

      if (!currentTracking) {
        this._trackingModel = await TrackingsRepository.createTracking();
      } else {
        this._trackingModel = currentTracking;

        Logger.logWarning(
          "Tried to create new tracking while another is unfinished",
        );
      }
      await LocationTracking.start();
    } catch (error) {
      await this._rollback();
      throw new Error("TrackingService failed to start", { cause: error });
    }
  }

  async pause() {
    try {
      await LocationTracking.stop();
    } catch (error) {
      throw new Error("TrackingService failed to pause", { cause: error });
    }
  }

  async resume() {
    try {
      await LocationTracking.start();
    } catch (error) {
      throw new Error("TrackingService failed to resume", { cause: error });
    }
  }

  async finish() {
    try {
      await this._trackingModel?.finish();
      console.log("Finished tracking with id:", this._trackingModel?.id);
      this._trackingModel = null;
    } catch (error) {
      throw new Error("TrackingService failed to finish", { cause: error });
    }
  }

  private async _rollback() {
    try {
      await LocationTracking.stop();
      await this._trackingModel?.remove();
      this._trackingModel = null;
    } catch (error) {
      throw new Error("TrackingService failed to roll back", { cause: error });
    }
  }
}
