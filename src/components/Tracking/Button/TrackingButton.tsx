import { Pressable, Text } from "react-native";
import styles from "./TrackingButton.styles";
import { useTracking } from "@/contexts/Tracking";

export default function TrackingButton() {
  const tracking = useTracking();

  return (
    <Pressable onPress={tracking.toggle} style={styles.container}>
      <Text style={styles.label}>
        {{ off: "START", on: "STOP" }[tracking.state]}
      </Text>
    </Pressable>
  );
}
