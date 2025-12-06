import { StyleSheet } from "react-native";

import { colors } from "@/presentation/styles/theme";

export const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondary,
  },
  trackingDistance: {
    transform: [{ translateY: "-50%" }],
  },
  trackingButton: {
    position: "absolute",
    bottom: 80,
  },
});
