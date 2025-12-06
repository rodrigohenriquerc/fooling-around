import { TrackingModel } from "@/infra/database/models";
import { TrackingsRepository } from "@/infra/database/repositories";
import { LocationTracking } from "@/infra/location/tracking";
import { TrackingState } from "@/types/tracking.types";

export class TrackingService {
  private _trackingModel: TrackingModel | null = null;

  async start() {
    try {
      this._trackingModel = await TrackingsRepository.createTracking();
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
      await LocationTracking.stop();

      await this._trackingModel?.finish();
      this._trackingModel = null;
    } catch (error) {
      throw new Error("TrackingService failed to finish", { cause: error });
    }
  }

  async getState(): Promise<TrackingState> {
    try {
      const currentTracking = await TrackingsRepository.getCurrentTracking();

      if (!currentTracking) {
        this._trackingModel = null;
        return "idle";
      }

      if (await LocationTracking.isTracking()) {
        return "ongoing";
      }

      return "paused";
    } catch (error) {
      throw new Error("TrackingService failed to load state", { cause: error });
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
