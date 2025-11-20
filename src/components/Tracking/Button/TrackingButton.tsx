import { IconProps } from "@expo/vector-icons/build/createIconSet";
import Entypo from "@expo/vector-icons/Entypo";
import { TouchableOpacity } from "react-native";

import { colors } from "@/styles/theme";

import { TrackingButtonStyles } from "./TrackingButton.styles";
import { TrackingButtonProps } from "./TrackingButton.types";

export function TrackingButton({ state, onPress }: TrackingButtonProps) {
  const iconPropsByState: Record<
    typeof state,
    Partial<IconProps<"controller-stop" | "controller-play">>
  > = {
    on: {
      name: "controller-stop",
      style: {
        left: 0,
      },
    },
    off: {
      name: "controller-play",
      style: {
        left: 3,
      },
    },
  };

  const onPressHandler = () => {
    onPress(state === "off" ? "on" : "off");
  };

  return (
    <TouchableOpacity onPress={onPressHandler} style={TrackingButtonStyles.btn}>
      <Entypo size={48} color={colors.white} {...iconPropsByState[state]} />
    </TouchableOpacity>
  );
}
