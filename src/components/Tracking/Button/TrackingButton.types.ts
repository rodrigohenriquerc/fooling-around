import { StyleProp, ViewStyle } from "react-native";

import { TrackingState } from "@/types/tracking.types";

export interface TrackingButtonProps {
  state: TrackingState;
  onPress: (state: TrackingState) => void;
  style?: StyleProp<ViewStyle>;
}
