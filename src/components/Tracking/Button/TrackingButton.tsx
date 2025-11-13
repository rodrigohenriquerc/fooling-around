import { TouchableOpacity } from "react-native";

import Entypo from "@expo/vector-icons/Entypo";
import { IconProps } from "@expo/vector-icons/build/createIconSet";

import { colors } from "@/styles/theme";

import { TrackingButtonProps } from "./TrackingButton.types";

import styles from "./TrackingButton.styles";

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

  return (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
      <Entypo size={48} color={colors.primary} {...iconPropsByState[state]} />
    </TouchableOpacity>
  );
}
