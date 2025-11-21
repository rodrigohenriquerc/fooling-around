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
import { Logger } from "@/infra/logs/logger";
import { TrackingState } from "@/types/tracking.types";
import { calculateCoordinatesPathLength } from "@/utils/geo.utils";

export const useLocationTracking = () => {
  const [trackingId, setTrackingId] = useState<string | undefined>();

  const [trackingState, setTrackingState] = useState<
    TrackingState | undefined
  >();

  const [trackingDistance, setTrackingDistance] = useState<number>(0);

  const updateDistance = async () => {
    if (!trackingId) return;

    try {
      const events =
        await LocationEventsRepository.getEventsByTrackingId(trackingId);
      const sortedEvents = events.sort((a, b) => a.timestamp - b.timestamp);

      const coordinates = sortedEvents.map((event) => ({
        latitude: event.latitude,
        longitude: event.longitude,
      }));

      const totalDistance = calculateCoordinatesPathLength(coordinates);
      setTrackingDistance(totalDistance);
    } catch (error) {
      Logger.error("Failed to calculate distance:", error);
    }
  };

  async function locationTrackingEventListener(event: LocationTrackingEvent) {
    try {
      const tracking = await TrackingsRepository.getCurrentTracking();

      if (!tracking) {
        throw new Error("The listener was called, but no tracking is on.");
      }

      await LocationEventsRepository.createLocationLogs(
        tracking.id,
        event.data,
      );

      await updateDistance();
    } catch (error) {
      Logger.error(
        `[useLocationTracking] 'locationTrackingEventListener' failed: ${error}`,
      );
    }
  }

  useEventListener(
    LocationTrackingEventEmitter,
    "location_update",
    locationTrackingEventListener,
  );

  const updateTrackingState = async (newState: TrackingState) => {
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
        setTrackingDistance(0);
      }
    } catch (error) {
      Logger.error(error);
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

  return { trackingId, trackingState, trackingDistance, updateTrackingState };
};
