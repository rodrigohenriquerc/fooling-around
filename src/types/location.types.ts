export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface LocationLog extends Coordinates {
  accuracy: number | null;
  timestamp: number;
}
