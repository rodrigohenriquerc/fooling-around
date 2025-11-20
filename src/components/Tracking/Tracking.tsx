import { ActivityIndicator, View } from "react-native";

import { TrackingButton } from "@/components/Tracking/Button/TrackingButton";
import { TrackingDistance } from "@/components/Tracking/Distance/TrackingDistance";
import { useLocationTracking } from "@/hooks/useLocationTracking";
import { colors } from "@/styles";

import { TrackingStyles } from "./Tracking.styles";

export function Tracking() {
  const locationTracking = useLocationTracking();

  const trackingDistance = null;

  if (!locationTracking.trackingState) {
    return (
      <View style={TrackingStyles.container}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View style={TrackingStyles.container}>
      {trackingDistance && (
        <TrackingDistance style={TrackingStyles.trackingDistance}>
          {trackingDistance}
        </TrackingDistance>
      )}
      <TrackingButton
        state={locationTracking.trackingState}
        onPress={locationTracking.updateTrackingState}
        style={TrackingStyles.trackingButton}
      />
    </View>
  );
}
