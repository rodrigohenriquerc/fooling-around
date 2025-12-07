import { StyleSheet } from "react-native";

import { colors } from "@/presentation/styles/theme";

export const HomeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondary,
  },
  sessionDistance: {
    transform: [{ translateY: "-50%" }],
  },
  sessionButton: {
    position: "absolute",
    bottom: 80,
  },
});
