import { withObservables } from "@nozbe/watermelondb/react";
import { Text, View } from "react-native";

import { TrackingModel } from "@/infra/database/models";
import { calculateCoordinatesPathLength } from "@/utils/geo.utils";

import { TrackingDistanceStyles } from "./TrackingDistance.styles";
import { EnhancedProps } from "./TrackingDistance.types";

function TrackingDistanceComponent({ style, locations }: EnhancedProps) {
  const distance = calculateCoordinatesPathLength(locations);
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
    locations: tracking.location_events.observe(),
  }),
);

export const TrackingDistance = enhance(TrackingDistanceComponent);
