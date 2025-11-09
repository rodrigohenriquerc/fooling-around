import { Pressable, Text } from "react-native";
import styles from "./TrackingButton.styles";
import type { TrackingButtonProps } from "./TrackingButton.types";

export default function TrackingButton({
  onPress,
  state,
}: TrackingButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.label}>{{ off: "START", on: "STOP" }[state]}</Text>
    </Pressable>
  );
}
