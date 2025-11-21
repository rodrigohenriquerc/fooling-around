import * as Expo from "expo";

import { LocationEvent } from "@/types/location.types";

export const LocationTrackingEventEmitter = new Expo.EventEmitter<{
  location_update: (location: LocationEvent[]) => void;
}>();
