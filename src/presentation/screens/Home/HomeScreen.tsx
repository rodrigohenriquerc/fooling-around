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
        <SessionDistance style={HomeScreenStyles.sessionDistance} />
        <SessionController style={HomeScreenStyles.sessionButton} />
      </Session>
    </View>
  );
}
