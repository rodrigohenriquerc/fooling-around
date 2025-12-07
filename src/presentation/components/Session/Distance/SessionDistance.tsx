import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { Subscription } from "rxjs";

import { useSession } from "@/presentation/components/Session/Session.context";

import { SessionDistanceStyles } from "./SessionDistance.styles";
import { SessionDistanceProps } from "./SessionDistance.types";

export function SessionDistance({ style }: SessionDistanceProps) {
  const session = useSession();

  const [distance, setDistance] = useState(0);

  const { value, measure } = formatDistance(distance);

  const subscription = useRef<Subscription | undefined>(null);

  useEffect(() => {
    subscription.current = session.distance?.subscribe(setDistance);
    return () => subscription.current?.unsubscribe();
  }, [session?.distance]);

  useEffect(() => {
    if (session.state === "idle") {
      subscription.current?.unsubscribe();
      setDistance(0);
    }
  }, [session.state]);

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
