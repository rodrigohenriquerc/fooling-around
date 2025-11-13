import { useState } from "react";
import { View } from "react-native";

import { TrackingButton } from "@/components/Tracking";

import styles from "./Home.styles";

export default function Home() {
  const [trackingState, setTrackingState] = useState<"on" | "off">("off");

  const onPressTrackingButtonHandler = async () => {
    setTrackingState((prev) => (prev === "off" ? "on" : "off"));
  };

  return (
    <View style={styles.container}>
      <TrackingButton
        state={trackingState}
        onPress={onPressTrackingButtonHandler}
      />
    </View>
  );
}
