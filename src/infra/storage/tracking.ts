import { TrackingState } from "@/types/tracking.types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const TrackingStorage = (() => {
  const TRACKING_STATE_KEY = "@tracking/STATE_KEY";

  async function setState(state: TrackingState) {
    try {
      await AsyncStorage.setItem(TRACKING_STATE_KEY, state);
    } catch (error) {
      throw new Error(`TrackingStorage failed to set state ${state}: ${error}`);
    }
  }

  async function getState() {
    try {
      return (await AsyncStorage.getItem(
        TRACKING_STATE_KEY,
      )) as TrackingState | null;
    } catch (error) {
      throw new Error(`TrackingStorage failed to get state: ${error}`);
    }
  }

  return { setState, getState };
})();
