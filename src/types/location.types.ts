export interface Location {
  latitude: number;
  longitude: number;
}

export interface LocationEvent extends Location {
  accuracy: number | null;
  timestamp: number;
}
