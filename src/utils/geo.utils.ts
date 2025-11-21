import * as Turf from "@turf/turf";

import { Location } from "@/types/location.types";

export const calculateCoordinatesPathLength = (path: Location[]) => {
  if (path.length < 2) return 0;

  const lineString = Turf.lineString(
    path.map(({ latitude, longitude }) => [longitude, latitude]),
  );

  return Turf.length(lineString, { units: "meters" });
};
