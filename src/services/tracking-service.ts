import {
  createSession,
  selectCurrentSession,
  SessionModel,
} from "@/infra/database/tables/sessions";
import {
  isTrackingLocation,
  startTrackingLocation,
  stopTrackingLocation,
} from "@/infra/services/location";
import { Logger } from "@/tools/monitoring";
import { SessionState } from "@/types/session.types";

export class TrackingService {
  private _trackingModel: SessionModel | null = null;

  async init(): Promise<SessionState> {
    try {
      const currentSession = await selectCurrentSession();

      if (!currentSession) {
        this._trackingModel = null;
        return "idle";
      }

      this._trackingModel = currentSession;

      if (await isTrackingLocation()) return "ongoing";

      return "paused";
    } catch (error) {
      throw new Error("TrackingService failed to load state", { cause: error });
    }
  }

  async start() {
    try {
      const currentSession = await selectCurrentSession();

      if (!currentSession) {
        this._trackingModel = await createSession();
      } else {
        this._trackingModel = currentSession;

        Logger.logWarning(
          "Tried to create new tracking while another is unfinished",
        );
      }
      await startTrackingLocation();
    } catch (error) {
      await this._rollback();
      throw new Error("TrackingService failed to start", { cause: error });
    }
  }

  async pause() {
    try {
      await stopTrackingLocation();
    } catch (error) {
      throw new Error("TrackingService failed to pause", { cause: error });
    }
  }

  async resume() {
    try {
      await startTrackingLocation();
    } catch (error) {
      throw new Error("TrackingService failed to resume", { cause: error });
    }
  }

  async finish() {
    try {
      await this._trackingModel?.finish();
      this._trackingModel = null;
    } catch (error) {
      throw new Error("TrackingService failed to finish", { cause: error });
    }
  }

  private async _rollback() {
    try {
      await stopTrackingLocation();
      await this._trackingModel?.remove();
      this._trackingModel = null;
    } catch (error) {
      throw new Error("TrackingService failed to roll back", { cause: error });
    }
  }
}
