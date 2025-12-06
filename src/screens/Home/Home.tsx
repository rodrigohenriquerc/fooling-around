import { View } from "react-native";

import { TrackingButton } from "@/components/Tracking/Button/TrackingButton";
import { TrackingDistance } from "@/components/Tracking/Distance/TrackingDistance";

import { HomeStyles } from "./Home.styles";

export default function Home() {
  return (
    <View style={HomeStyles.container}>
      <TrackingDistance
        distance={1000000}
        style={HomeStyles.trackingDistance}
      />
      <TrackingButton
        state="off"
        onPress={() => {}}
        style={HomeStyles.trackingButton}
      />
    </View>
  );
}
