import { View } from "react-native";
import styles from "./Home.styles";
import TrackingButton from "@/components/Tracking/Button/TrackingButton";
import { useState } from "react";

export default function Home() {
  const [trackingState, setTrackingState] = useState<"on" | "off">("off");

  const toggleTracking = () => {
    setTrackingState((prev) => (prev === "off" ? "on" : "off"));
  };

  return (
    <View style={styles.container}>
      <TrackingButton state={trackingState} onPress={toggleTracking} />
    </View>
  );
}
