import { View } from "react-native";

import {
  TrackingController,
  TrackingDistance,
} from "@/presentation/components/Tracking";
import { useTracking } from "@/presentation/hooks/useTracking";
import { TrackingAction } from "@/types/tracking.types";

import { HomeScreenStyles } from "./HomeScreen.styles";

export function HomeScreen() {
  const tracking = useTracking();

  const onPressTrackingControllerBtn = (action: TrackingAction) => {
    tracking[action]();
  };

  return (
    <View style={HomeScreenStyles.container}>
      <TrackingDistance
        distance={1000000}
        style={HomeScreenStyles.trackingDistance}
      />
      <TrackingController
        state={tracking.state}
        onPress={onPressTrackingControllerBtn}
        style={HomeScreenStyles.trackingButton}
      />
    </View>
  );
}
