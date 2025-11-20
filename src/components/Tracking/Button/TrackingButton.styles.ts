import { StyleSheet } from "react-native";

import { colors } from "@/styles";

const BTN_SIZE = 100;

export const TrackingButtonStyles = StyleSheet.create({
  btn: {
    width: BTN_SIZE,
    height: BTN_SIZE,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BTN_SIZE / 2,
    backgroundColor: colors.primary,
  },
});
