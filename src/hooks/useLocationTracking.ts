import { useEffect, useRef, useState } from "react";
import { useEventListener } from "expo";
import { LocationObjectCoords } from "expo-location";

import { LocationEventRepository } from "@/infra/database/repositories";
import {
  LocationTracking,
  LocationTrackingEvent,
  LocationTrackingEventEmitter,
} from "@/infra/location/tracking";
import { TrackingStorage } from "@/infra/storage/tracking";

import { TrackingState } from "@/types/tracking.types";

import * as turf from "@turf/turf";

export const useLocationTracking = () => {
  const [trackingState, setTrackingState] = useState<
    "on" | "off" | undefined
  >();

  const lastPositionRef = useRef<Pick<
    LocationObjectCoords,
    "latitude" | "longitude"
  > | null>(null);

  const [distanceTraveled, setDistanceTraveled] = useState(0);

  const locationTrackingEventListener = async (
    event: LocationTrackingEvent,
  ) => {
    try {
      await LocationEventRepository.createLocationLog(
        event.data,
        event.executionInfo,
      );

      if (lastPositionRef.current) {
        const lastPosition = [
          lastPositionRef.current?.longitude,
          lastPositionRef.current?.latitude,
        ];

        const lineString = turf.lineString([
          lastPosition,
          ...event.data.map(({ coords: { latitude, longitude } }) => [
            longitude,
            latitude,
          ]),
        ]);

        const lineStringLength = turf.length(lineString, { units: "meters" });

        const storedDistance = await TrackingStorage.getDistance();

        const newDistance = storedDistance + lineStringLength;

        await TrackingStorage.setDistance(newDistance);

        setDistanceTraveled(newDistance);
      }

      const {
        coords: { latitude, longitude },
      } = event.data.at(-1)!;

      lastPositionRef.current = { latitude, longitude };
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
        await TrackingStorage.setDistance(0);

        setTrackingState("off");
        setDistanceTraveled(0);

        lastPositionRef.current = null;
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

  return { trackingState, updateTrackingState, distanceTraveled };
};
