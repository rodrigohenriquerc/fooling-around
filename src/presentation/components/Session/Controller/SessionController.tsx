import { View } from "react-native";

import { SessionButton } from "@/presentation/components/Session/Button/SessionButton";

import { SessionControllerStyles } from "./SessionController.styles";
import { SessionControllerProps } from "./SessionController.types";

export function SessionController({
  state,
  onPress,
  style,
}: SessionControllerProps) {
  if (state === "idle") {
    return (
      <SessionButton
        icon="play"
        variant="primary"
        onPress={() => onPress("start")}
        style={style}
      />
    );
  }

  if (state === "ongoing") {
    return (
      <SessionButton
        icon="pause"
        variant="secondary"
        onPress={() => onPress("pause")}
        style={style}
      />
    );
  }

  if (state === "paused") {
    return (
      <View style={[SessionControllerStyles.row, style]}>
        <SessionButton
          icon="play"
          label="Resume"
          variant="secondary"
          onPress={() => onPress("resume")}
          style={SessionControllerStyles.rowButton}
        />

        <SessionButton
          icon="stop"
          label="Finish"
          variant="secondary"
          onPress={() => onPress("finish")}
          style={SessionControllerStyles.rowButton}
        />
      </View>
    );
  }
}
