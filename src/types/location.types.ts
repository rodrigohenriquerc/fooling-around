export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface LocationEvent extends Coordinates {
  accuracy: number | null;
  timestamp: number;
}
