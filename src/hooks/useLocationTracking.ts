import { useEventListener } from "expo";
import { useEffect, useState } from "react";

import {
  LocationEventsRepository,
  TrackingsRepository,
} from "@/infra/database/repositories";
import {
  LocationTracking,
  LocationTrackingEvent,
  LocationTrackingEventEmitter,
} from "@/infra/location/tracking";
import { TrackingState } from "@/types/tracking.types";

export const useLocationTracking = () => {
  const [trackingId, setTrackingId] = useState<string | undefined>();

  const [trackingState, setTrackingState] = useState<
    TrackingState | undefined
  >();

  useEventListener(
    LocationTrackingEventEmitter,
    "location_update",
    locationTrackingEventListener,
  );

  const updateTrackingState = async (newState: TrackingState) => {
    console.log(newState);

    try {
      if (newState === "on") {
        const tracking = await TrackingsRepository.createTracking();
        await LocationTracking.startTracking();
        setTrackingId(tracking.id);
        setTrackingState("on");
      } else {
        await LocationTracking.stopTracking();
        await TrackingsRepository.finishTracking();
        setTrackingId(undefined);
        setTrackingState("off");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      const tracking = await TrackingsRepository.getCurrentTracking();

      if (tracking) {
        setTrackingId(tracking.id);
        setTrackingState("on");
      } else {
        setTrackingState("off");
      }
    };

    initialize();
  }, []);

  return { trackingId, trackingState, updateTrackingState };
};

async function locationTrackingEventListener(event: LocationTrackingEvent) {
  try {
    const tracking = await TrackingsRepository.getCurrentTracking();

    if (!tracking) {
      throw new Error("The listener was called, but no tracking is on.");
    }

    await LocationEventsRepository.createLocationLog(
      tracking.id,
      event.data,
      event.executionInfo,
    );
  } catch (error) {
    console.error(
      `[useLocationTracking] 'locationTrackingEventListener' failed: ${error}`,
    );
  }
}
