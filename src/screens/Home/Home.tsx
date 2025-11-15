import { ActivityIndicator, View } from "react-native";

import { TrackingButton } from "@/components/Tracking";
import { useLocationTracking } from "@/hooks/useLocationTracking";
import { colors } from "@/styles/theme";

import styles from "./Home.styles";
import { TrackingDistance } from "@/components/Tracking/Distance/TrackingDistance";

export default function Home() {
  const locationTracking = useLocationTracking();

  return (
    <View style={styles.container}>
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
