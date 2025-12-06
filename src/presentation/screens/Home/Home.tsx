import { useState } from "react";
import { View } from "react-native";

import {
  TrackingController,
  TrackingDistance,
} from "@/presentation/components/Tracking";
import { TrackingAction, TrackingState } from "@/types/tracking.types";

import { HomeStyles } from "./Home.styles";

export default function Home() {
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
    <View style={HomeStyles.container}>
      <TrackingDistance
        distance={1000000}
        style={HomeStyles.trackingDistance}
      />
      <TrackingController
        state={trackingState}
        onPress={onPressTrackingControllerBtn}
        style={HomeStyles.trackingButton}
      />
    </View>
  );
}
