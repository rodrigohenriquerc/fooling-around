import { StyleProp, ViewStyle } from "react-native";

import { LocationEventModel, TrackingModel } from "@/infra/database/models";

export interface TrackingDistanceProps {
  style?: StyleProp<ViewStyle>;
  tracking: TrackingModel;
}

export interface EnhancedProps extends TrackingDistanceProps {
  locations: LocationEventModel[];
}
