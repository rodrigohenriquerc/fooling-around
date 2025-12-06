import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";

export interface TrackingButtonProps {
  icon: "play" | "pause" | "stop";
  variant: "primary" | "secondary";
  onPress: (event: GestureResponderEvent) => void;
  label?: string;
  style?: StyleProp<ViewStyle>;
}
