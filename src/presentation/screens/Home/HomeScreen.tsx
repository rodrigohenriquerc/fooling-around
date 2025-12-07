import { View } from "react-native";

import {
  Session,
  SessionController,
  SessionDistance,
} from "@/presentation/components/Session";

import { HomeScreenStyles } from "./HomeScreen.styles";

export function HomeScreen() {
  return (
    <View style={HomeScreenStyles.container}>
      <Session>
        <SessionDistance
          distance={1000000}
          style={HomeScreenStyles.sessionDistance}
        />
        <SessionController style={HomeScreenStyles.sessionButton} />
      </Session>
    </View>
  );
}
