import { StyleSheet } from "react-native";

import { colors } from "@/styles/theme";

export const TrackingDistanceStyles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  value: {
    fontSize: 100,
    fontWeight: "bold",
    color: colors.white,
  },
  measure: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.gray,
  },
});
