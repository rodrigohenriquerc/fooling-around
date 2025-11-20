import { IconProps } from "@expo/vector-icons/build/createIconSet";
import Entypo from "@expo/vector-icons/Entypo";
import { TouchableOpacity } from "react-native";

import { colors } from "@/styles";
import { TrackingState } from "@/types/tracking.types";

import { TrackingButtonStyles } from "./TrackingButton.styles";
import { TrackingButtonProps } from "./TrackingButton.types";

export function TrackingButton({ state, onPress, style }: TrackingButtonProps) {
  const onPressHandler = () => {
    onPress(state === "off" ? "on" : "off");
  };

  const icon = defineIconByState(state);

  return (
    <TouchableOpacity
      onPress={onPressHandler}
      style={[TrackingButtonStyles.btn, style]}
    >
      <Entypo
        size={48}
        name={icon.name}
        style={icon.style}
        color={colors.white}
      />
    </TouchableOpacity>
  );
}

const defineIconByState = (
  state: TrackingState,
): Pick<IconProps<"controller-stop" | "controller-play">, "name" | "style"> =>
  (
    ({
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
    }) as const
  )[state];
