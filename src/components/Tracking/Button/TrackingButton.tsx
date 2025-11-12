import { Pressable, Text } from "react-native";
import styles from "./TrackingButton.styles";
import { TrackingButtonProps } from "./TrackingButton.types";

export function TrackingButton({ state, onPress }: TrackingButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, styles[`button_${state}`]]}
    >
      <Text style={styles.label}>{{ off: "START", on: "STOP" }[state]}</Text>
    </Pressable>
  );
}
