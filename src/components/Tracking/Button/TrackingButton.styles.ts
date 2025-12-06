import { StyleSheet } from "react-native";

import { colors } from "@/styles/theme";

const BTN_SIZE = 100;

export const TrackingButtonStyles = StyleSheet.create({
  btn: {
    width: BTN_SIZE,
    height: BTN_SIZE,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BTN_SIZE / 2,
  },
  btn_primary: {
    backgroundColor: colors.primary,
  },
  btn_primary_icon: {
    color: colors.white,
  },
  btn_secondary: {
    backgroundColor: colors.white,
  },
  btn_secondary_icon: {
    color: colors.secondary,
  },
  btnWithLabel: {
    width: "auto",
    height: 50,
    borderRadius: 25,
    flexDirection: "row",
    gap: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: "500",
  },
});
