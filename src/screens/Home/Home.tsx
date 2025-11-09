import { View } from "react-native";

import TrackingButton from "@/components/Tracking/Button/TrackingButton";
import TrackingProvider from "@/providers/TrackingProvider";

import styles from "./Home.styles";

export default function Home() {
  return (
    <View style={styles.container}>
      <TrackingProvider>
        <TrackingButton />
      </TrackingProvider>
    </View>
  );
}
