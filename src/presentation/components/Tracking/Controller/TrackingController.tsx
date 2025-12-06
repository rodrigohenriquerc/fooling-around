import { View } from "react-native";

import { TrackingButton } from "@/presentation/components/Tracking";

import { TrackingControllerStyles } from "./TrackingController.styles";
import { TrackingControllerProps } from "./TrackingController.types";

export function TrackingController({
  state,
  onPress,
  style,
}: TrackingControllerProps) {
  if (state === "idle") {
    return (
      <TrackingButton
        icon="play"
        variant="primary"
        onPress={() => onPress("start")}
        style={style}
      />
    );
  }

  if (state === "ongoing") {
    return (
      <TrackingButton
        icon="pause"
        variant="secondary"
        onPress={() => onPress("pause")}
        style={style}
      />
    );
  }

  if (state === "paused") {
    return (
      <View style={[TrackingControllerStyles.row, style]}>
        <TrackingButton
          icon="play"
          label="Resume"
          variant="secondary"
          onPress={() => onPress("resume")}
          style={TrackingControllerStyles.rowButton}
        />

        <TrackingButton
          icon="stop"
          label="Finish"
          variant="secondary"
          onPress={() => onPress("finish")}
          style={TrackingControllerStyles.rowButton}
        />
      </View>
    );
  }
}
