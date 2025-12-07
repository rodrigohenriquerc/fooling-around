import { Text, View } from "react-native";

import { SessionDistanceStyles } from "./SessionDistance.styles";
import { SessionDistanceProps } from "./SessionDistance.types";

export function SessionDistance({ distance, style }: SessionDistanceProps) {
  const { value, measure } = formatDistance(distance);

  return (
    <View style={[SessionDistanceStyles.container, style]}>
      <Text style={SessionDistanceStyles.value}>{value}</Text>
      <Text style={SessionDistanceStyles.measure}>{measure}</Text>
    </View>
  );
}

const formatDistance = (distance: number) => {
  if (distance < 1000) {
    return { value: `${Math.round(distance)}`, measure: "m" };
  }

  return { value: `${(distance / 1000).toFixed(1)}`, measure: "km" };
};
