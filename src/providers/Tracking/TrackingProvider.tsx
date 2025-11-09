import { createContext, PropsWithChildren, useEffect, useState } from "react";

import { Tracking, TrackingState } from "@/types/Tracking.types";
import TrackingStorage from "@/storage/TrackingStorage";

export default function TrackingProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<TrackingState>();
  const [isInitialized, setIsInitialized] = useState(false);

  function toggle() {
    setState((prev) => (prev === "off" ? "on" : "off"));
  }

  useEffect(() => {
    async function init() {
      const storedState = await TrackingStorage.getState();
      setState(storedState);
      setIsInitialized(true);
    }

    init();
  }, []);

  useEffect(() => {
    async function storeToggleState() {
      if (!state) return;
      await TrackingStorage.toggle(state);
    }

    storeToggleState();
  }, [state]);

  return (
    <TrackingContext.Provider value={{ state: state ?? "off", toggle }}>
      {isInitialized ? children : null}
    </TrackingContext.Provider>
  );
}

export const TrackingContext = createContext<Tracking | null>(null);
