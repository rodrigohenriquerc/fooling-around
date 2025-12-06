import { useState } from "react";
import { View } from "react-native";

import {
  TrackingController,
  TrackingDistance,
} from "@/presentation/components/Tracking";
import { TrackingAction, TrackingState } from "@/types/tracking.types";

import { HomeScreenStyles } from "./HomeScreen.styles";

export function HomeScreen() {
  const [trackingState, setTrackingState] = useState<TrackingState>("idle");

  const onPressTrackingControllerBtn = (action: TrackingAction) => {
    if (action === "start") {
      return setTrackingState("ongoing");
    }

    if (action === "pause") {
      return setTrackingState("paused");
    }

    if (action === "resume") {
      return setTrackingState("ongoing");
    }

    if (action === "finish") {
      return setTrackingState("idle");
    }
  };

  return (
    <View style={HomeScreenStyles.container}>
      <TrackingDistance
        distance={1000000}
        style={HomeScreenStyles.trackingDistance}
      />
      <TrackingController
        state={trackingState}
        onPress={onPressTrackingControllerBtn}
        style={HomeScreenStyles.trackingButton}
      />
    </View>
  );
}
