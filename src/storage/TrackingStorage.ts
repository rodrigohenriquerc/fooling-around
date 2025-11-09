import { Tracking } from "@/types/Tracking.types";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function toggle(state: Tracking["state"]) {
  await AsyncStorage.setItem("@tracking/state", state);
}

async function getState() {
  const state = await AsyncStorage.getItem("@tracking/state");

  if (state === "on" || state === "off") return state;

  return "off";
}

export default { toggle, getState };
