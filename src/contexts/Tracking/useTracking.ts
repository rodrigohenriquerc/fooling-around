import { TrackingContext } from "./TrackingContext";
import { useContext } from "react";

export function useTracking() {
  const context = useContext(TrackingContext);

  if (!context) {
    throw new Error("TrackingContext must be used within TrackingProvider");
  }

  return context;
}
