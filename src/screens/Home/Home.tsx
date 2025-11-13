import { useState } from "react";
import { View } from "react-native";

import { TrackingButton } from "@/components/Tracking";

import styles from "./Home.styles";

export default function Home() {
  const [state, setState] = useState<"on" | "off">("off");

  const onPressTrackingButtonHandler = async () => {
    setState((prev) => (prev === "off" ? "on" : "off"));
  };

  return (
    <View style={styles.container}>
      <TrackingButton state={state} onPress={onPressTrackingButtonHandler} />
    </View>
  );
}
