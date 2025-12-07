import { View } from "react-native";

import { SessionButton } from "@/presentation/components/Session/Button/SessionButton";

import { useSession } from "../Session.context";
import { SessionControllerStyles } from "./SessionController.styles";
import { SessionControllerProps } from "./SessionController.types";

export function SessionController({ style }: SessionControllerProps) {
  const session = useSession();

  if (session.state === "idle") {
    return (
      <SessionButton
        icon="play"
        variant="primary"
        onPress={session.start}
        style={style}
      />
    );
  }

  if (session.state === "ongoing") {
    return (
      <SessionButton
        icon="pause"
        variant="secondary"
        onPress={session.pause}
        style={style}
      />
    );
  }

  if (session.state === "paused") {
    return (
      <View style={[SessionControllerStyles.row, style]}>
        <SessionButton
          icon="play"
          label="Resume"
          variant="secondary"
          onPress={session.resume}
          style={SessionControllerStyles.rowButton}
        />

        <SessionButton
          icon="stop"
          label="Finish"
          variant="secondary"
          onPress={session.finish}
          style={SessionControllerStyles.rowButton}
        />
      </View>
    );
  }
}
