import { Tracking } from "@/types/Tracking.types";
import { createContext } from "react";

export const TrackingContext = createContext<Tracking | null>(null);
