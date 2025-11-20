import { Text, View } from "react-native";

import { TrackingDistanceStyles } from "./TrackingDistance.styles";
import { TrackingDistanceProps } from "./TrackingDistance.types";

export function TrackingDistance({
  children: distance,
}: TrackingDistanceProps) {
  const { value, measure } = formatDistance(distance);

  return (
    <View style={TrackingDistanceStyles.container}>
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
