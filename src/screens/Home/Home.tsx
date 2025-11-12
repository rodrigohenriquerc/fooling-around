import { useState } from "react";
import { View } from "react-native";

import DeviceLocationWatcher from "@/device/location";

import { TrackingButton } from "@/components/Tracking";

import styles from "./Home.styles";

export default function Home() {
  const [state, setState] = useState<"on" | "off">("off");

  const onPressTrackingButtonHandler = async () => {
    try {
      if (state === "off") {
        await DeviceLocationWatcher.startWatching();
        setState("on");
      } else {
        await DeviceLocationWatcher.stopWatching();
        setState("off");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TrackingButton state={state} onPress={onPressTrackingButtonHandler} />
    </View>
  );
}
