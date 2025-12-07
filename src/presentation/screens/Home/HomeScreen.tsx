import { View } from "react-native";

import {
  SessionController,
  SessionDistance,
} from "@/presentation/components/Session";
import { useTracking } from "@/presentation/hooks/useTracking";
import { SessionAction } from "@/types/session.types";

import { HomeScreenStyles } from "./HomeScreen.styles";

export function HomeScreen() {
  const tracking = useTracking();

  const onPressTrackingControllerBtn = (action: SessionAction) => {
    tracking[action]();
  };

  return (
    <View style={HomeScreenStyles.container}>
      <SessionDistance
        distance={1000000}
        style={HomeScreenStyles.sessionDistance}
      />
      <SessionController
        state={tracking.state}
        onPress={onPressTrackingControllerBtn}
        style={HomeScreenStyles.sessionButton}
      />
    </View>
  );
}
