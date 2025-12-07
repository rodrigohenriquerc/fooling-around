import { StyleProp, ViewStyle } from "react-native";

import { SessionAction, SessionState } from "@/types/session.types";

export interface SessionControllerProps {
  state: SessionState;
  onPress: (action: SessionAction) => void;
  style?: StyleProp<ViewStyle>;
}
