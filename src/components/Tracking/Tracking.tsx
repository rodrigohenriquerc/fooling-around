import { ActivityIndicator, View } from "react-native";

import { TrackingButton } from "@/components/Tracking/Button/TrackingButton";
import { TrackingDistance } from "@/components/Tracking/Distance/TrackingDistance";
import { useTracking } from "@/hooks/useTracking";
import { colors } from "@/styles";

import { TrackingStyles } from "./Tracking.styles";

export function Tracking() {
  const tracking = useTracking();

  if (!tracking.state) {
    return (
      <View style={TrackingStyles.container}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View style={TrackingStyles.container}>
      {tracking.state === "on" && tracking.tracking && (
        <TrackingDistance
          tracking={tracking.tracking}
          style={TrackingStyles.trackingDistance}
        />
      )}
      <TrackingButton
        state={tracking.state}
        onPress={tracking.updateState}
        style={TrackingStyles.trackingButton}
      />
    </View>
  );
}
