import { Coordinates } from "./Coordinates.types";
import { Metadata } from "./Metadata.types";

export interface Position extends Coordinates, Metadata {
  accuracy: number;
  altitude: number;
  altitudeAccuracy: number;
  heading: number;
  speed: number;
}
