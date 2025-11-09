import { TrackingContext } from "@/providers/TrackingProvider";
import { useContext } from "react";

export function useTracking() {
  const context = useContext(TrackingContext);

  if (!context) throw "TrackingContext must be used within TrackingProvider";

  return context;
}
