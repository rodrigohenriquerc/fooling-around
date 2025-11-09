import { Pressable, Text } from "react-native";
import TrackingButtonStyles from "./TrackingButton.styles";
import type { TrackingButtonProps } from "./TrackingButton.types";

export default function TrackingButton({
  onPress,
  state,
}: TrackingButtonProps) {
  return (
    <Pressable onPress={onPress} style={TrackingButtonStyles.container}>
      <Text style={TrackingButtonStyles.label}>
        {{ off: "START", on: "STOP" }[state]}
      </Text>
    </Pressable>
  );
}
