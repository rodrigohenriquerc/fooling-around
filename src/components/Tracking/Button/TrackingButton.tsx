import { IconProps } from "@expo/vector-icons/build/createIconSet";
import Entypo from "@expo/vector-icons/Entypo";
import { Text, TouchableOpacity } from "react-native";

import { TrackingButtonStyles } from "./TrackingButton.styles";
import { TrackingButtonProps } from "./TrackingButton.types";

export function TrackingButton({
  icon,
  variant,
  label,
  onPress,
  style,
}: TrackingButtonProps) {
  const iconProps: Pick<
    IconProps<"controller-play" | "controller-stop" | "controller-paus">,
    "name" | "style"
  > = (() =>
    (
      ({
        play: {
          name: "controller-play",
          style: { left: 3 },
        },
        stop: {
          name: "controller-stop",
        },
        pause: {
          name: "controller-paus",
        },
      }) as const
    )[icon])();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        TrackingButtonStyles.btn,
        TrackingButtonStyles[`btn_${variant}`],
        label && TrackingButtonStyles.btnWithLabel,
        style,
      ]}
    >
      <Entypo
        size={label ? 40 : 48}
        color={TrackingButtonStyles[`btn_${variant}_icon`].color}
        {...iconProps}
        style={iconProps.style}
      />

      {!!label && <Text style={TrackingButtonStyles.label}>{label}</Text>}
    </TouchableOpacity>
  );
}
