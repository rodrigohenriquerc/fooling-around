import { ActivityIndicator, View } from "react-native";

import { TrackingButton } from "@/components/Tracking";
import { useLocationTracking } from "@/hooks/useLocationTracking";
import { colors } from "@/styles";

import { HomeStyles } from "./Home.styles";

export default function Home() {
  const locationTracking = useLocationTracking();

  return (
    <View style={HomeStyles.container}>
      {locationTracking.trackingState ? (
        <>
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
