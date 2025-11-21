import { Q } from "@nozbe/watermelondb";
import { withObservables } from "@nozbe/watermelondb/react";
import { Text, View } from "react-native";
import { map, scan } from "rxjs/operators";

import { TrackingModel } from "@/infra/database/models";
import { calculateCoordinatesPathLength } from "@/utils/geo.utils";

import { TrackingDistanceStyles } from "./TrackingDistance.styles";
import { EnhancedProps } from "./TrackingDistance.types";

function TrackingDistanceComponent({ style, distance }: EnhancedProps) {
  const { value, measure } = formatDistance(distance);

  return (
    <View style={[TrackingDistanceStyles.container, style]}>
      <Text style={TrackingDistanceStyles.value}>{value}</Text>
      <Text style={TrackingDistanceStyles.measure}>{measure}</Text>
    </View>
  );
}

const formatDistance = (distance: number) => {
  if (distance < 1000) {
    return { value: `${Math.round(distance)}`, measure: "m" };
  }

  return { value: `${(distance / 1000).toFixed(2)}`, measure: "km" };
};

const enhance = withObservables(
  ["tracking"],
  ({ tracking }: { tracking: TrackingModel }) => ({
    distance: tracking.location_events
      .extend(Q.sortBy("datetime", "asc"))
      .observe()
      .pipe(
        scan(
          (acc, locations) => {
            if (locations.length < acc.count) {
              return {
                distance: calculateCoordinatesPathLength(locations),
                count: locations.length,
              };
            }

            const newLocations = locations.slice(acc.count);

            if (newLocations.length === 0) {
              return acc;
            }

            const previousLastLocation = locations[acc.count - 1];
            const segment = previousLastLocation
              ? [previousLastLocation, ...newLocations]
              : newLocations;

            const addedDistance = calculateCoordinatesPathLength(segment);

            return {
              distance: acc.distance + addedDistance,
              count: locations.length,
            };
          },
          { distance: 0, count: 0 },
        ),
        map((acc) => acc.distance),
      ),
  }),
);

export const TrackingDistance = enhance(TrackingDistanceComponent);
