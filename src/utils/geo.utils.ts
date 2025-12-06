import { length, lineString } from "@turf/turf";

import { Coordinates } from "@/types/location.types";

export const calculateCoordinatesPathLength = (path: Coordinates[]) => {
  if (path.length < 2) return 0;

  const line = lineString(
    path.map(({ latitude, longitude }) => [longitude, latitude]),
  );

  return length(line, { units: "meters" });
};
