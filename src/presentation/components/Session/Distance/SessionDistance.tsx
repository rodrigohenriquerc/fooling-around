import { useEffect, useState } from "react";
import { Text, View } from "react-native";

import { useSession } from "@/presentation/components/Session/Session.context";

import { SessionDistanceStyles } from "./SessionDistance.styles";
import { SessionDistanceProps } from "./SessionDistance.types";

export function SessionDistance({ style }: SessionDistanceProps) {
  const session = useSession();

  const [distance, setDistance] = useState(0);

  const { value, measure } = formatDistance(distance);

  useEffect(() => {
    if (!session.model) return setDistance(0);

    const sub = session.model.observeDistance().subscribe(setDistance);

    return () => sub.unsubscribe();
  }, [session.model]);

  return (
    <View style={[SessionDistanceStyles.container, style]}>
      <Text style={SessionDistanceStyles.value}>{value}</Text>
      <Text style={SessionDistanceStyles.measure}>{measure}</Text>
    </View>
  );
}

const formatDistance = (distance: number) => {
  if (distance < 1000) {
    return { value: `${Math.round(distance)}`, measure: "m" };
  }

  return { value: `${(distance / 1000).toFixed(1)}`, measure: "km" };
};
