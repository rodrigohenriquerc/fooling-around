import { StyleProp, ViewStyle } from "react-native";

import { TrackingModel } from "@/infra/database/models";

export interface TrackingDistanceProps {
  style?: StyleProp<ViewStyle>;
  tracking: TrackingModel;
}

export interface EnhancedProps extends TrackingDistanceProps {
  distance: number;
}
