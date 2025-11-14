import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

import { TrackingStorage } from "@/infra/storage/tracking";
import { LocationTracking } from "@/infra/location/tracking";

import { TrackingState } from "@/types/tracking.types";

import { TrackingButton } from "@/components/Tracking";

import { colors } from "@/styles/theme";

import styles from "./Home.styles";

export default function Home() {
  const [trackingState, setTrackingState] = useState<
    "on" | "off" | undefined
  >();

  const onPressTrackingButtonHandler = async (state: TrackingState) => {
    try {
      if (state === "on") {
        await LocationTracking.startTracking();
      } else {
        await LocationTracking.stopTracking();
      }

      await TrackingStorage.setState(state);
      setTrackingState(state);
    } catch (error) {
      console.error("Error handling tracking button press:", error);
    }
  };

  useEffect(() => {
    const initializeTrackingState = async () => {
      const storedTrackingState = await TrackingStorage.getState();
      setTrackingState(storedTrackingState ?? "off");
    };

    if (!trackingState) initializeTrackingState();
  }, [trackingState]);

  return (
    <View style={styles.container}>
      {trackingState ? (
        <TrackingButton
          state={trackingState}
          onPress={onPressTrackingButtonHandler}
        />
      ) : (
        <ActivityIndicator color={colors.primary} size="large" />
      )}
    </View>
  );
}
