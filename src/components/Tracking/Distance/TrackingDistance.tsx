import { Text } from "react-native";
import { TrackingDistanceProps } from "./TrackingDistance.types";
import { TrackingDistanceStyles } from "./TrackingDistance.styles";

export function TrackingDistance({ children }: TrackingDistanceProps) {
  const distance = () => {
    if (children < 1000) {
      return `${Math.round(children)} m`;
    }

    return `${(children / 1000).toFixed(2)} km`;
  };

  return <Text style={TrackingDistanceStyles.distance}>{distance()}</Text>;
}
