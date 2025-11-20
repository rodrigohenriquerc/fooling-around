import { ActivityIndicator, View } from "react-native";

import { TrackingButton, TrackingDistance } from "@/components/Tracking";
import { useLocationTracking } from "@/hooks/useLocationTracking";
import { colors } from "@/styles/theme";

import { HomeStyles } from "./Home.styles";

export default function Home() {
  const locationTracking = useLocationTracking();

  return (
    <View style={HomeStyles.container}>
      {locationTracking.trackingState ? (
        <>
          {locationTracking.trackingState === "on" && (
            <TrackingDistance>
              {locationTracking.distanceTraveled}
            </TrackingDistance>
          )}

          <TrackingButton
            state={locationTracking.trackingState}
            onPress={locationTracking.updateTrackingState}
          />
        </>
      ) : (
        <ActivityIndicator color={colors.primary} size="large" />
      )}
    </View>
  );
}
