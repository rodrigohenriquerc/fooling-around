import { View } from "react-native";

import { Tracking } from "@/components/Tracking";

import { HomeStyles } from "./Home.styles";

export default function Home() {
  return (
    <View style={HomeStyles.container}>
      <Tracking />
    </View>
  );
}
