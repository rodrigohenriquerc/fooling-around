import { View } from "react-native";

import {
  SessionController,
  SessionDistance,
  SessionProvider,
} from "@/presentation/components/Session";

import { HomeScreenStyles } from "./HomeScreen.styles";

export function HomeScreen() {
  return (
    <View style={HomeScreenStyles.container}>
      <SessionProvider>
        <SessionDistance style={HomeScreenStyles.sessionDistance} />
        <SessionController style={HomeScreenStyles.sessionButton} />
      </SessionProvider>
    </View>
  );
}
