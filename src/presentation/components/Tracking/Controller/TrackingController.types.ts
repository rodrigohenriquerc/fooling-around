import { StyleProp, ViewStyle } from "react-native";

import { TrackingAction, TrackingState } from "@/types/tracking.types";

export interface TrackingControllerProps {
  state: TrackingState;
  onPress: (action: TrackingAction) => void;
  style?: StyleProp<ViewStyle>;
}
