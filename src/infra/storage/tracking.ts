import { TrackingState } from "@/types/tracking.types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const TrackingStorage = (() => {
  const STATE_KEY = "@tracking/STATE";
  const DISTANCE_KEY = "@tracking/DISTANCE";

  async function setState(state: TrackingState) {
    try {
      await AsyncStorage.setItem(STATE_KEY, state);
    } catch (error) {
      throw new Error(`TrackingStorage failed to set state ${state}: ${error}`);
    }
  }

  async function getState() {
    try {
      return (await AsyncStorage.getItem(STATE_KEY)) as TrackingState | null;
    } catch (error) {
      throw new Error(`TrackingStorage failed to get state: ${error}`);
    }
  }

  async function setDistance(distance: number) {
    try {
      await AsyncStorage.setItem(DISTANCE_KEY, JSON.stringify(distance));
    } catch (error) {
      throw new Error(
        `TrackingStorage failed to set distance ${distance}: ${error}`,
      );
    }
  }

  async function getDistance() {
    try {
      return Number((await AsyncStorage.getItem(DISTANCE_KEY)) ?? 0);
    } catch (error) {
      throw new Error(`TrackingStorage failed to get distance: ${error}`);
    }
  }

  return { setState, getState, setDistance, getDistance };
})();
