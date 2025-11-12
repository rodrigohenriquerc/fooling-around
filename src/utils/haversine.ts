import { Coordinates } from "@/types/coordinates.types";

/**
 * The Haversine formula calculates the distance between two points on a sphere, using their latitude and longitude coordinates.
 * @param p1 Coordinates of point 1
 * @param p2 Coordinates of point 2
 * @returns Calculated distance in meters
 */
export function haversineDistance(p1: Coordinates, p2: Coordinates) {
  const toRad = (value: number) => (value * Math.PI) / 180;

  const R = 6371e3; // Earth's radius (m)
  const φ1 = toRad(p1.latitude);
  const φ2 = toRad(p2.latitude);
  const Δφ = toRad(p2.latitude - p1.latitude);
  const Δλ = toRad(p2.longitude - p1.longitude);

  const a =
    Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}
