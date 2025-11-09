import { createContext, PropsWithChildren, useState } from "react";

import { Tracking } from "@/types/Tracking.types";

export default function TrackingProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<Tracking["state"]>("off");

  const toggle = () => {
    setState((prev) => (prev === "off" ? "on" : "off"));
  };

  return (
    <TrackingContext.Provider value={{ state, toggle }}>
      {children}
    </TrackingContext.Provider>
  );
}

export const TrackingContext = createContext<Tracking | null>(null);
