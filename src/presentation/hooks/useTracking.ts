import { useState } from "react";

import { TrackingService } from "@/services/tracking-service";
import { Logger } from "@/tools/monitoring";
import { TrackingState } from "@/types/tracking.types";

const trackingService = new TrackingService();

export const useTracking = () => {
  const [trackingState, setTrackingState] = useState<TrackingState>("idle");

  const start = async () => {
    try {
      await trackingService.start();
      setTrackingState("ongoing");
    } catch (error) {
      Logger.logError("Failed to start tracking", error);
    }
  };

  const pause = async () => {
    try {
      await trackingService.pause();
      setTrackingState("paused");
    } catch (error) {
      Logger.logError("Failed to pause tracking", error);
    }
  };

  const resume = async () => {
    try {
      await trackingService.resume();
      setTrackingState("ongoing");
    } catch (error) {
      Logger.logError("Failed to resume tracking", error);
    }
  };

  const finish = async () => {
    try {
      await trackingService.finish();
      setTrackingState("idle");
    } catch (error) {
      Logger.logError("Failed to finish tracking", error);
    }
  };

  return { start, pause, resume, finish, state: trackingState };
};
