import { ActivityIndicator, View } from "react-native";

import { useTracking } from "@/hooks/useTracking";
import { colors } from "@/styles/theme";

import { TrackingButton } from "./Button/TrackingButton";
import { TrackingDistance } from "./Distance/TrackingDistance";
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
