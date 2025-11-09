export interface Tracking {
  state: TrackingState;
  toggle: () => void;
}

export type TrackingState = "on" | "off";
