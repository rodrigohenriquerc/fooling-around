import { StyleSheet } from "react-native";

export const TrackingStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  trackingDistance: {
    transform: [{ translateY: "-50%" }],
  },
  trackingButton: {
    position: "absolute",
    bottom: 80,
  },
});
