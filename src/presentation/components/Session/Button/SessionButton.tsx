import { IconProps } from "@expo/vector-icons/build/createIconSet";
import Entypo from "@expo/vector-icons/Entypo";
import { Text, TouchableOpacity } from "react-native";

import { SessionButtonStyles } from "./SessionButton.styles";
import { SessionButtonProps } from "./SessionButton.types";

export function SessionButton({
  icon,
  variant,
  label,
  onPress,
  style,
}: SessionButtonProps) {
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
        SessionButtonStyles.btn,
        SessionButtonStyles[`btn_${variant}`],
        label && SessionButtonStyles.btnWithLabel,
        style,
      ]}
    >
      <Entypo
        size={label ? 40 : 48}
        color={SessionButtonStyles[`btn_${variant}_icon`].color}
        {...iconProps}
        style={iconProps.style}
      />

      {!!label && <Text style={SessionButtonStyles.label}>{label}</Text>}
    </TouchableOpacity>
  );
}
