import { Coordinates } from "./coordinates.types";

export interface GeoJson {
  type: "FeatureCollection";
  features: GeoJsonFeature[];
}

export interface GeoJsonFeature {
  type: "Feature";
  geometry: GeoJsonFeatureGeometry;
  properties?: Record<string, string> | null;
}

export interface GeoJsonFeatureGeometry {
  type: "LineString";
  coordinates: [Coordinates["longitude"], Coordinates["latitude"]][];
}
