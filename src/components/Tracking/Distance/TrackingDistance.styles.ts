import { StyleSheet } from "react-native";

import { colors } from "@/styles/theme";

export const TrackingDistanceStyles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  value: {
    fontSize: 140,
    fontWeight: "bold",
    color: colors.white,
  },
  measure: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.gray,
  },
});
