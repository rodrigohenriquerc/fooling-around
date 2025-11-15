import { useEffect, useState } from "react";

import { LocationEventRepository } from "@/infra/database/repositories";
import {
  LocationTracking,
  LocationTrackingEvent,
  LocationTrackingEventEmitter,
} from "@/infra/location/tracking";
import { TrackingState } from "@/types/tracking.types";
import { TrackingStorage } from "@/infra/storage/tracking";
import { useEventListener } from "expo";

export const useLocationTracking = () => {
  const [trackingState, setTrackingState] = useState<
    "on" | "off" | undefined
  >();

  const locationTrackingEventListener = async (
    event: LocationTrackingEvent,
  ) => {
    try {
      await LocationEventRepository.createLocationLog(
        event.data,
        event.executionInfo,
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEventListener(
    LocationTrackingEventEmitter,
    "location_update",
    locationTrackingEventListener,
  );

  const updateTrackingState = async (state: TrackingState) => {
    try {
      if (state === "on") {
        await LocationTracking.startTracking();
        setTrackingState("on");
      } else {
        await LocationTracking.stopTracking();
        setTrackingState("off");
      }

      await TrackingStorage.setState(state);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const initializeTrackingState = async () => {
      const storedTrackingState = await TrackingStorage.getState();
      setTrackingState(storedTrackingState ?? "off");
    };

    initializeTrackingState();
  }, []);

  return { trackingState, updateTrackingState };
};
