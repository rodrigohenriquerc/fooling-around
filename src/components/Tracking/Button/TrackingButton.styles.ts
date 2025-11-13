import { StyleSheet } from "react-native";

const BTN_SIZE = 100;

export default StyleSheet.create({
  btn: {
    width: BTN_SIZE,
    height: BTN_SIZE,
    borderRadius: BTN_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  label: {
    fontWeight: "bold",
    fontSize: 48,
    color: "#FFFFFF",
  },
});
