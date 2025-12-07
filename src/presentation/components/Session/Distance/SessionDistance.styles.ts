import { StyleSheet } from "react-native";

import { colors } from "@/presentation/styles/theme";

export const SessionDistanceStyles = StyleSheet.create({
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
